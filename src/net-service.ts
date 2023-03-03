import { AjaxGetNetService } from './get-net-service';
import { HttpMethodType } from './http-method-type';
import { INetRequest, NetServiceBase } from './net-service-base';
import { AjaxPostNetService } from './post-net-service';

export interface IAjaxNetRequest extends INetRequest {
    httpMethod: HttpMethodType;
}

export class AjaxNetService extends NetServiceBase {
    public constructor(
        private m_Urls: string[],
    ) {
        super();
    }

    public async send<T>(req: IAjaxNetRequest) {
        const ctor = req.httpMethod == HttpMethodType.get ? AjaxGetNetService : AjaxPostNetService;
        const netService = new ctor(this.m_Urls);
        return netService.send<T>(req);
    }
}