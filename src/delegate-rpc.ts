import { ErrorCode } from './error-code';
import { HttpMethodType } from './http-method-type';
import { HttpReadyState } from './http-reday-state';
import { IApiDyanmicResponse } from './i-api-dynamic-response';
import { IRpcCallOption } from './i-rpc-call-option';
import { RpcBase } from './rpc-base';

export class DelegateRpc extends RpcBase {

    public static timeout: number = 15000;

    private m_Header: { [key: string]: string } = {
        'Content-Type': 'application/json;charset=UTF-8',
    };

    public constructor(
        private m_GetRequestFunc: (v: IRpcCallOption) => Promise<{
            api: string;
            baseUrl: string;
        }>,
    ) {
        super();
    }

    public async callWithoutThrow<T>(v: IRpcCallOption): Promise<IApiDyanmicResponse<T>> {
        return new Promise<IApiDyanmicResponse<T>>(async (s, f) => {
            const req = await this.m_GetRequestFunc(v);
            const xhr = new XMLHttpRequest();
            xhr.timeout = DelegateRpc.timeout;
            xhr.open(
                HttpMethodType.post,
                [req.baseUrl, req.api].join(''),
                true,
            );

            Object.keys({
                ...this.m_Header,
                ...v.header
            }).forEach(r => {
                xhr.setRequestHeader(r, this.m_Header[r]);
            });

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

            xhr.send(JSON.stringify(v.body));
        });
    }

}