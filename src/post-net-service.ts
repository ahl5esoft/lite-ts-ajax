import { AjaxNetServiceBase } from './ajax-net-service-base';
import { HttpMethodType } from './http-method-type';
import { INetRequest, NetServiceBase } from './net-service-base';

export class AjaxPostNetService extends AjaxNetServiceBase {

    public constructor(
        urls: string[]
    ) {
        super(urls);
    }

    public onOpen(xhr: XMLHttpRequest, req: INetRequest) {
        xhr.open(
            HttpMethodType.post,
            this.getUrl(req.route),
            true,
        );
    }

    public onSend(xhr: XMLHttpRequest, req: INetRequest) {
        xhr.send(
            JSON.stringify({
                ...NetServiceBase.body,
                ...req.body,
            })
        );
    }
}

