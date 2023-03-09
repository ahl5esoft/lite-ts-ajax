import { HttpMethod, RpcCallOption } from 'lite-ts-rpc';

export type AjaxRpcCallOption = RpcCallOption & {
    method: HttpMethod;
}