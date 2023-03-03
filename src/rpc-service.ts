import { HttpMethodType } from './http-method-type';
import { IRpcCallOption } from './i-rpc-call-option';
import { RpcBase } from './rpc-base';
import { RpcGetService } from './rpc-get-service';
import { RpcPostService } from './rpc-post-service';

export class RpcService extends RpcBase {
    public constructor(
        private m_BaseUrl: string
    ) {
        super();
    }
    public async callWithoutThrow<T>(req: IRpcCallOption) {
        const ctor = req.method == HttpMethodType.get ? RpcGetService : RpcPostService;
        const rpcService = new ctor(this.m_BaseUrl);
        return rpcService.callWithoutThrow<T>(req);
    }

}