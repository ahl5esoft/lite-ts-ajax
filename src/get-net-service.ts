import { AjaxNetServiceBase } from './ajax-net-service-base';
import { HttpMethodType } from './http-method-type';
import { INetRequest, NetServiceBase } from './net-service-base';


export class AjaxGetNetService extends AjaxNetServiceBase {

    public constructor(
        urls: string[]
    ) {
        super(urls);
    }

    public onOpen(xhr: XMLHttpRequest, req: INetRequest) {
        const bf = Object.entries({
            ...NetServiceBase.body,
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

