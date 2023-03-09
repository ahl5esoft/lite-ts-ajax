import { strictEqual } from 'assert';
import { HttpMethod } from 'lite-ts-rpc';

import { AjaxRpc as Self } from './rpc';

Self.createXMLHttpRequest = () => {
    const ctor = require('xmlhttprequest').XMLHttpRequest;
    return new ctor();
};

describe('src/rpc.ts', () => {
    describe('.callWithoutThrow<T>(req: AjaxRpcCallOption)', () => {
        it('get', async () => {
            const res = await new Self('http://127.0.0.1:30000').callWithoutThrow({
                method: HttpMethod.get,
                route: '/'
            });
            strictEqual(res.err, 0);
        });
        
        it('post', async () => {
            const res = await new Self('http://127.0.0.1:30000').callWithoutThrow({
                method: HttpMethod.post,
                route: '/aa'
            });
            strictEqual(res.err, 501);
        });
    });
});