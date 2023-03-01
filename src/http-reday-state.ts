/**
 * 请求状态
 */
export enum HttpReadyState {
    /**
     * 已获取响应头 send()方法已经被调用, 响应头和响应状态已经返回.
     */
    headersReceived = 2,
    /**
     * 正在下载响应体 响应体下载中,responseText中已经获取了部分数据.
     */
    loading = 3,
    /**
     * 未发送 open()方法被调用 
     */
    opened = 1,
    /**
     * 未打开 open()方法还未调用 
     */
    unsent = 0,
    /**
     * 请求完成  整个请求过程已经完毕
     */
    done = 4,
}