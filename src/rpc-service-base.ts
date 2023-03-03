import { ErrorCode } from './error-code';
import { HttpReadyState } from './http-reday-state';
import { IApiDyanmicResponse } from './i-api-dynamic-response';
import { IRpcCallOption } from './i-rpc-call-option';
import { RpcBase } from './rpc-base';

export abstract class RpcServiceBase extends RpcBase {
    public constructor(
        private m_BaseUrl: string
    ) {
        super();
    }

    public async callWithoutThrow<T>(req: IRpcCallOption) {
        return new Promise<IApiDyanmicResponse<T>>(async (s, f) => {
            const xhr = this.createXMLHttpRequest();
            xhr.timeout = this.getTimeout(req.header);

            this.onOpen(xhr, req);

            this.appendHeader(xhr, RpcServiceBase.header);
            this.appendHeader(xhr, req.header);

            xhr.onreadystatechange = () => {
                if (xhr.readyState !== HttpReadyState.done)
                    return;

                if (xhr.status === 200) {
                    try {
                        s(JSON.parse(xhr.responseText));
                    } catch {
                        f({
                            data: null,
                            err: ErrorCode.panic,
                        });
                    }
                } else {
                    f({
                        data: null,
                        err: ErrorCode.panic,
                    });
                }
            };

            xhr.ontimeout = () => {
                f({
                    data: null,
                    err: ErrorCode.timeout,
                });
            };

            this.onSend(xhr, req);
        });
    }

    private appendHeader(xhr: XMLHttpRequest, header: { [key: string]: string }) {
        Object.keys(header ?? {}).forEach(r => {
            xhr.setRequestHeader(r, header[r]);
        });
    }

    private createXMLHttpRequest() {
        try {
            return new XMLHttpRequest();
        } catch {
            const ctor = require('xmlhttprequest').XMLHttpRequest;
            return new ctor();
        }
    };

    protected getUrl(route: string) {
        return this.m_BaseUrl + this.getRoute(route);
    }
    protected abstract onOpen(xhr: XMLHttpRequest, req: IRpcCallOption): void;
    protected abstract onSend(xhr: XMLHttpRequest, req: IRpcCallOption): void;
}