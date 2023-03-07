declare enum HttpMethod {
    get = "GET",
    post = "POST"
}
type ApiResponse<T> = {
    data: T;
    err: number;
};
type RpcCallOption = {
    route: string;
    body?: {
        [key: string]: any;
    };
    header?: {
        [key: string]: string;
    };
};
declare abstract class RpcBase {
    static ctor: string;
    static buildErrorFunc: (errorCode: number, data: any) => Error;
    call<T>(v: RpcCallOption): Promise<T>;
    abstract callWithoutThrow<T>(v: RpcCallOption): Promise<ApiResponse<T>>;
}
type AjaxRpcCallOption = RpcCallOption & {
    method: HttpMethod;
};
interface IRequestStrategy {
    open(xhr: XMLHttpRequest, req: AjaxRpcCallOption): void;
    send(xhr: XMLHttpRequest, req: AjaxRpcCallOption): void;
}
declare class GetRequestStrategy implements IRequestStrategy {
    open(xhr: XMLHttpRequest, req: AjaxRpcCallOption): void;
    send(xhr: XMLHttpRequest): void;
}
declare class PostRequestStrategy implements IRequestStrategy {
    open(xhr: XMLHttpRequest, req: AjaxRpcCallOption): void;
    send(xhr: XMLHttpRequest, req: AjaxRpcCallOption): void;
}
declare enum Header {
    authToken = "H-A-T",
    env = "H-E",
    timeout = "H-T"
}
declare class AjaxRpc extends RpcBase {
    private m_BaseUrl;
    private m_Strategy;
    static body: {
        [key: string]: any;
    };
    static header: {
        [key: string]: string;
    };
    static timeout: number;
    constructor(m_BaseUrl: string, m_Strategy?: {
        GET: GetRequestStrategy;
        POST: PostRequestStrategy;
    });
    callWithoutThrow<T>(req: AjaxRpcCallOption): Promise<ApiResponse<T>>;
    private appendHeader;
    private createXMLHttpRequest;
}