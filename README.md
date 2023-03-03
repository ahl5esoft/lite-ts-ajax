# 远程过程调用

![Version](https://img.shields.io/badge/version-1.0.0-green.svg)

## 安装
```
npm install lite-ts-ajax
```

## 使用
```typescript
import { AjaxNetService } from 'lite-ts-ajax';

const baseUrl="https://xxxxx.com";
const rpc = new RpcService(baseUrl);
// 抛异常调用
await rpc.call({
    httpMethod: "POST || GET",
    route: "/:app/:api",
    body: { },
    header:{}
});
// 不抛异常调用
await rpc.callWithoutThrow({
    httpMethod: "POST || GET",
    route: "/:app/:api",
    body: { },
    header:{}
});
```
