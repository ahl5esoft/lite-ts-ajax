# ![Version](https://img.shields.io/badge/version-1.1.1-green.svg)

## 安装
```
npm install lite-ts-ajax
```

## 使用
```typescript
import { AjaxRpc } from 'lite-ts-ajax';
import { HttpMethod } from 'lite-ts-rpc';

const baseUrl = 'http://xxx.com';
const rpc = new AjaxRpc(baseUrl);
// 抛异常调用
await rpc.call({
    httpMethod: HttpMethod.get,
    route: '/app/api',
    body: { },
    header:{}
});
// 不抛异常调用
const resp = await rpc.callWithoutThrow({
    httpMethod: HttpMethod.post,
    route: '/app/api',
    body: { },
    header:{}
});

```
