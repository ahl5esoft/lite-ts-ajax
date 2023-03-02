import { Header } from './header';

const routeReg = /^\/[a-z-]+/;

export interface INetRequest {
    route: string;
    header?: { [key: string]: any };
    body?: any;
}

export interface INetResponse<T> {
    err: number;
    data: T;
}

export abstract class NetServiceBase {
    public static ctor = 'NetServiceBase';
    public static body: { [key: string]: any } = {};
    public static header: { [key: string]: string } = {
        'Content-Type': 'application/json;charset=UTF-8',
    };
    public static timeout: number = 15000;

    public abstract send<T>(req: INetRequest): Promise<INetResponse<T>>;

    protected getRoute(route: string) {
        return route.includes('/mh/') ? route : route.replace(routeReg, m => {
            return m + '/mh';
        });
    }

    protected getTimeout(header: { [key: string]: string }) {
        return header?.[Header.timeout] ? parseInt(header[Header.timeout]) : NetServiceBase.timeout;
    }
}