import { IRequestStrategy } from './i-request-strategy';
import { AjaxRpc } from './rpc';
import { AjaxRpcCallOption } from './rpc-call-option';

export class PostRequestStrategy implements IRequestStrategy {
    public open(xhr: XMLHttpRequest, req: AjaxRpcCallOption) {
        xhr.open(req.method, req.route, true);
    }

    public send(xhr: XMLHttpRequest, req: AjaxRpcCallOption) {
        xhr.send(JSON.stringify({
            ...AjaxRpc.body,
            ...req.body,
        }));
    }
}