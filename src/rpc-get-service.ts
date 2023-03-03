import { HttpMethodType } from './http-method-type';
import { IRpcCallOption } from './i-rpc-call-option';
import { RpcServiceBase } from './rpc-service-base';

export class RpcGetService extends RpcServiceBase {
    public onOpen(xhr: XMLHttpRequest, req: IRpcCallOption) {
        const bf = Object.entries({
            ...RpcGetService.body,
            ...req.body,
        }).reduce((memo, [k, v]) => {
            memo.push(k, '=', v, '&');
            return memo;
        }, [
            this.getUrl(req.route),
            '?'
        ]);
        bf.pop();
        xhr.open(
            HttpMethodType.post,
            bf.join(''),
            true,
        );
    }

    public onSend(xhr: XMLHttpRequest) {
        xhr.send();
    }

}