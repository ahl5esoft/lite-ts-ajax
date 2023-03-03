import { HttpMethod } from './http-method';
import { RpcCallOption } from './rpc-base';

export type AjaxRpcCallOption = RpcCallOption & {
    method: HttpMethod;
}