import { IRequestStrategy } from './i-request-strategy';
import { AjaxRpc } from './rpc';
import { AjaxRpcCallOption } from './rpc-call-option';

export class GetRequestStrategy implements IRequestStrategy {
    public open(xhr: XMLHttpRequest, req: AjaxRpcCallOption) {
        const bf = Object.entries({
            ...AjaxRpc.body,
            ...req.body,
        }).reduce((memo, [k, v]) => {
            memo.push(k, '=', v, '&');
            return memo;
        }, [req.route, '?']);
        bf.pop();
        xhr.open(
            req.method,
            bf.join(''),
            true,
        );
    }

    public send(xhr: XMLHttpRequest) {
        xhr.send();
    }
}