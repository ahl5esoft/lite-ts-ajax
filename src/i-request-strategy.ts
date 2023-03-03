import { AjaxRpcCallOption } from './rpc-call-option';

export interface IRequestStrategy {
    open(xhr: XMLHttpRequest, req: AjaxRpcCallOption): void;
    send(xhr: XMLHttpRequest, req: AjaxRpcCallOption): void;
}