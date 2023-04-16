import { strictEqual } from 'assert';
import { HttpMethod } from 'lite-ts-rpc';

import { AjaxRpc as Self } from './rpc';
import { AjaxRpcCallOption } from './rpc-call-option';

Self.createXMLHttpRequest = () => {
    const ctor = require('xmlhttprequest').XMLHttpRequest;
    return new ctor();
};

describe('src/rpc.ts', () => {
    describe('.call<T>(req: RpcCallOption)', () => {
        it('get', async () => {
            const res = await new Self('http://127.0.0.1:30000').call({
                method: HttpMethod.get,
                route: '/'
            } as AjaxRpcCallOption);
            strictEqual(res.err, undefined);
        });

        it('post', async () => {
            const res = await new Self('http://127.0.0.1:30000').call({
                method: HttpMethod.post,
                route: '/aa/cc'
            } as AjaxRpcCallOption);
            strictEqual(res.err, 501);
        });
    });
});