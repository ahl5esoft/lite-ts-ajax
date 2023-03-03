import { HttpMethodType } from './http-method-type';

export interface IRpcCallOption {
    method: HttpMethodType,
    route: string;
    body?: { [key: string]: any; };
    header?: { [key: string]: string; };
}