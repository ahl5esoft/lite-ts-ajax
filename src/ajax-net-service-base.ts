import { ErrorCode } from './error-code';
import { HttpReadyState } from './http-reday-state';
import { INetRequest, INetResponse, NetServiceBase } from './net-service-base';

export abstract class AjaxNetServiceBase extends NetServiceBase {
    public constructor(
        private m_Urls: string[],
    ) {
        super();
    }

    public async send<T>(req: INetRequest): Promise<INetResponse<T>> {
        return new Promise<INetResponse<T>>(async (s, f) => {


            const xhr = this.createXMLHttpRequest();
            xhr.timeout = this.getTimeout(req.header);

            this.onOpen(xhr, req);

            this.appendHeader(xhr, NetServiceBase.header);
            this.appendHeader(xhr, req.header);

            xhr.onreadystatechange = () => {
                if (xhr.readyState !== HttpReadyState.done)
                    return;

                if (xhr.status === 200) {
                    try {
                        s(
                            JSON.parse(xhr.responseText)
                        );
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

    protected getUrl(route: string) {
        const url = this.m_Urls.length > 1 ? this.m_Urls[Date.now() % this.m_Urls.length] : this.m_Urls[0];
        return url + this.getRoute(route);
    }

    private appendHeader(xhr: XMLHttpRequest, header: { [key: string]: string }) {
        Object.keys(header ?? {}).forEach(r => {
            xhr.setRequestHeader(r, header[r]);
        });
    }

    private createXMLHttpRequest = () => {
        try {
            return new XMLHttpRequest();
        } catch {
            const ctor = require('xmlhttprequest').XMLHttpRequest;
            return new ctor();
        }
    };

    protected abstract onOpen(xhr: XMLHttpRequest, req: INetRequest): void;
    protected abstract onSend(xhr: XMLHttpRequest, req: INetRequest): void;
}