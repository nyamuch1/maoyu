import { useEffect } from 'react'

/**
 * 设置当前页面的 document.title。
 * 用法：在各个 Layout / Shell 里调用一次，标题会随路由切换自动更新。
 */
export function usePageTitle(title?: string) {
  useEffect(() => {
    // undefined 表示“这个层级不设置标题”，交给子页面自己决定（例如 404 页）
    if (!title) return
    document.title = `${title} · 月白ねむ`
  }, [title])
}
