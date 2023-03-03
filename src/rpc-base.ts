import { Header } from './header';
import { IApiDyanmicResponse } from './i-api-dynamic-response';
import { IRpcCallOption } from './i-rpc-call-option';

const routeReg = /^\/[a-z-]+/;

export abstract class RpcBase {
    public static ctor = 'RpcBase';
    public static body: { [key: string]: any } = {};
    public static header: { [key: string]: string } = {
        'Content-Type': 'application/json;charset=UTF-8',
    };
    public static timeout: number = 15000;

    public static buildErrorFunc: (errorCode: number, data: any) => Error;

    /**
     * @example
     * ```typescript
     *  const rpc: RpcBase;
     *  const resp = await rpc.call<T>({
     *      route: '/服务名/端/api'，
     *      body:{},
     *      header:{}
     *  });
     *  // res is T, 如果resp.err!=0则会抛错
     * ```
     */
    public async call<T>(v: IRpcCallOption) {
        const resp = await this.callWithoutThrow<T>(v);
        if (resp.err)
            throw RpcBase.buildErrorFunc(resp.err, resp.data);

        return resp.data;
    }

    /**
     * @example
     * ```typescript
     *  const rpc: RpcBase;
     *  const resp = await rpc.callWithoutThrow<T>({
     *      route: '/服务名/端/api'，
     *      body:{},
     *      header:{}
     *  );
     *  // resp is IApiDyanmicResponse<T>
     * ```
     */
    public abstract callWithoutThrow<T>(v: IRpcCallOption): Promise<IApiDyanmicResponse<T>>;

    protected getRoute(route: string) {
        return route.includes('/mh/') ? route : route.replace(routeReg, m => {
            return m + '/mh';
        });
    }

    protected getTimeout(header: { [key: string]: string }) {
        return header?.[Header.timeout] ? parseInt(header[Header.timeout]) : RpcBase.timeout;
    }

}