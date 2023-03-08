# ![Version](https://img.shields.io/badge/version-1.0.1-green.svg)

## 安装
```
npm install lite-ts-ajax
```

## 使用
```typescript
import { AjaxRpc } from 'lite-ts-ajax';

const baseUrl='https://xxxxx.com';
const rpc = new AjaxRpc(baseUrl);
// 抛异常调用
await rpc.call({
    httpMethod: 'POST || GET',
    route: '/:app/:api',
    body: { },
    header:{}
});
// 不抛异常调用
const resp = await rpc.callWithoutThrow({
    httpMethod: 'POST || GET',
    route: '/:app/:api',
    body: { },
    header:{}
});

```
