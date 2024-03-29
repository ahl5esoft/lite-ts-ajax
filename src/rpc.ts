import { ErrorCode } from 'lite-ts-error';
import { HttpMethod, RpcBase, RpcHeader, RpcResponse } from 'lite-ts-rpc';

import { GetRequestStrategy } from './get-request-strategy';
import { PostRequestStrategy } from './post-request-strategy';
import { AjaxRpcCallOption } from './rpc-call-option';

enum HttpReadyState {
    /**
     * 已获取响应头 send()方法已经被调用, 响应头和响应状态已经返回.
     */
    headersReceived = 2,
    /**
     * 正在下载响应体 响应体下载中,responseText中已经获取了部分数据.
     */
    loading = 3,
    /**
     * 未发送 open()方法被调用 
     */
    opened = 1,
    /**
     * 未打开 open()方法还未调用 
     */
    unsent = 0,
    /**
     * 请求完成  整个请求过程已经完毕
     */
    done = 4,
}

const routeReg = /^\/[a-z-]+/;

RpcBase.header['Content-Type'] = 'application/json;charset=UTF-8';

export class AjaxRpc extends RpcBase {
    public static timeout: number = 15000;
    public static createXMLHttpRequest = () => new XMLHttpRequest();

    public constructor(
        private m_BaseUrl: string,
        private m_Strategy = {
            [HttpMethod.get]: new GetRequestStrategy(),
            [HttpMethod.post]: new PostRequestStrategy(),
        }
    ) {
        super();
    }

    protected async onCall<T>(req: AjaxRpcCallOption) {
        req.method ??= HttpMethod.post;

        if (!this.m_Strategy[req.method])
            throw new Error(`AjaxRpc不支持HttpMethod.${req.method}`);

        return new Promise<RpcResponse<T>>(async (s, f) => {
            const xhr = AjaxRpc.createXMLHttpRequest();
            xhr.timeout = req?.header?.[RpcHeader.timeout] ? parseInt(req.header[RpcHeader.timeout]) : AjaxRpc.timeout;

            req.route = req.route.includes('/mh/') ? req.route : req.route.replace(routeReg, m => {
                return m + '/mh';
            });
            req.route = this.m_BaseUrl + req.route;
            this.m_Strategy[req.method].open(xhr, req);

            this.appendHeader(xhr, AjaxRpc.header);
            this.appendHeader(xhr, req.header);

            xhr.onreadystatechange = () => {
                if (xhr.readyState !== HttpReadyState.done)
                    return;

                if (xhr.status === 200) {
                    try {
                        s(
                            JSON.parse(xhr.responseText),
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

            this.m_Strategy[req.method].send(xhr, req);
        });
    }

    private appendHeader(xhr: XMLHttpRequest, header: { [key: string]: string }) {
        Object.keys(header ?? {}).forEach(r => {
            xhr.setRequestHeader(r, header[r]);
        });
    }
}