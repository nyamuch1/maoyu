/** 状态页文案与状态码白名单（与组件分文件，避免 Fast Refresh 失效） */
export type StatusCode = 403 | 404 | 500 | 502 | 503

export const STATUS_CODES: StatusCode[] = [403, 404, 500, 502, 503]

export type StatusCopy = {
  title: string
  description: string
  tip: string
}

export const STATUS_COPY: Record<StatusCode, StatusCopy> = {
  403: {
    title: '没有访问权限',
    description: '当前账号无权查看这个页面。如果这是你的工作区，请联系管理员开通权限。',
    tip: '确认登录的账号是否正确',
  },
  404: {
    title: '页面不存在',
    description: '你访问的地址可能已被移动、改名，或者从来没有存在过。',
    tip: '检查地址拼写，或从首页重新进入',
  },
  500: {
    title: '服务器出了点问题',
    description: '服务在处理这次请求时发生异常，我们已经记录，会尽快修复。',
    tip: '稍后重试；持续出现请联系支持',
  },
  502: {
    title: '网关错误',
    description: '上游服务暂时没有响应，通常是发布或扩容过程中的短暂现象。',
    tip: '等待几秒后刷新，或先返回首页',
  },
  503: {
    title: '服务暂不可用',
    description: '服务正在维护或负载过高，请稍后再试。',
    tip: '维护进度会发布在状态页',
  },
}
