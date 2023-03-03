import { HttpMethodType } from './http-method-type';
import { IRpcCallOption } from './i-rpc-call-option';
import { RpcServiceBase } from './rpc-service-base';

export class RpcPostService extends RpcServiceBase {
    public onOpen(xhr: XMLHttpRequest, req: IRpcCallOption) {
        xhr.open(
            HttpMethodType.post,
            this.getUrl(req.route),
            true,
        );
    }

    public onSend(xhr: XMLHttpRequest, req: IRpcCallOption) {
        xhr.send(JSON.stringify({
            ...RpcPostService.body,
            ...req.body,
        }));
    }
}