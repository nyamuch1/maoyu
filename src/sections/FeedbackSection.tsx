import { useEffect, useState } from 'react'
import Demo from '../components/layout/Demo.tsx'
import Alert from '../components/ui/Alert.tsx'
import Badge from '../components/ui/Badge.tsx'
import Button from '../components/ui/Button.tsx'
import Progress from '../components/ui/Progress.tsx'
import { CheckCircleIcon, CloseIcon, InboxIcon } from '../components/ui/icons.tsx'

export default function FeedbackSection() {
  const [bannerOpen, setBannerOpen] = useState(true)
  const [toastOpen, setToastOpen] = useState(false)

  useEffect(() => {
    if (!toastOpen) return
    const timer = window.setTimeout(() => setToastOpen(false), 2800)
    return () => window.clearTimeout(timer)
  }, [toastOpen])

  return (
    <>
      <div className="space-y-8">
        <Demo label="徽标 Badge">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="primary">推荐</Badge>
            <Badge tone="success" dot>
              运行中
            </Badge>
            <Badge tone="warning" dot>
              即将到期
            </Badge>
            <Badge tone="danger" dot>
              已失败
            </Badge>
            <Badge tone="info">新功能</Badge>
            <Badge tone="neutral">草稿</Badge>
          </div>
        </Demo>

        <Demo label="提示条 Alert" hint="至少一种可关闭">
          <div className="grid gap-3">
            {bannerOpen ? (
              <Alert tone="brand" title="主题已就绪" onClose={() => setBannerOpen(false)}>
                明暗两套 token 已加载，右上角可随时切换。
              </Alert>
            ) : (
              <div className="rounded-card border border-dashed border-line px-4 py-3 text-xs text-ink-subtle">
                品牌提示条已关闭 ——{' '}
                <button
                  type="button"
                  className="text-primary underline underline-offset-2"
                  onClick={() => setBannerOpen(true)}
                >
                  恢复显示
                </button>
              </div>
            )}

            <Alert tone="success" title="发布成功">
              版本 v1.2.0 已发布到生产环境，CDN 预计 30 秒内生效。
            </Alert>

            <Alert tone="warning" title="额度将满">
              本月 API 调用已使用 92%，超出后将进入限流队列。
            </Alert>

            <Alert tone="danger" title="同步失败">
              3 条记录因字段类型不匹配未能写入，请修正后重试。
            </Alert>

            <Alert tone="info" title="计划维护">
              10 月 28 日 02:00–04:00 进行数据库升级，期间只读。
            </Alert>
          </div>
        </Demo>

        <div className="grid gap-8 border-t border-line/70 pt-8 lg:grid-cols-2">
          <Demo label="进度 Progress">
            <div className="space-y-4">
              <Progress label="上传素材" value={72} />
              <Progress label="构建任务" value={100} tone="success" />
              <Progress label="存储空间" value={46} tone="warning" />
              <Progress label="失败重试" value={18} tone="danger" />
            </div>
          </Demo>

          <Demo label="骨架屏 Skeleton">
            <div className="animate-pulse space-y-3 rounded-card border border-line bg-surface-2/60 p-4">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-surface-3" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-1/2 rounded-full bg-surface-3" />
                  <div className="h-3 w-1/3 rounded-full bg-surface-3" />
                </div>
              </div>
              <div className="h-3 w-full rounded-full bg-surface-3" />
              <div className="h-3 w-4/5 rounded-full bg-surface-3" />
              <div className="h-3 w-2/3 rounded-full bg-surface-3" />
            </div>
          </Demo>
        </div>

        <div className="grid gap-8 border-t border-line/70 pt-8 lg:grid-cols-2">
          <Demo label="空状态 Empty">
            <div className="flex flex-col items-center justify-center rounded-card border border-dashed border-line bg-surface-2/40 px-6 py-10 text-center">
              <span className="grid size-12 place-items-center rounded-full bg-surface-3 text-ink-subtle">
                <InboxIcon className="size-6" />
              </span>
              <p className="mt-3 text-sm font-medium text-ink">还没有任何项目</p>
              <p className="mt-1 max-w-xs text-xs text-ink-subtle">
                创建一个项目开始协作，或从模板库导入现成的结构。
              </p>
              <Button size="sm" className="mt-4">
                新建项目
              </Button>
            </div>
          </Demo>

          <Demo label="轻提示 Toast" hint="右下角浮出，2.8s 自动消失">
            <div className="flex h-full flex-col items-start gap-3">
              <Button variant="secondary" onClick={() => setToastOpen(true)}>
                显示 Toast
              </Button>
              <p className="max-w-xs text-xs leading-relaxed text-ink-subtle">
                轻提示固定在视口右下角，用 <code className="font-mono">shadow-clay-lg</code>{' '}
                浮起，不打断当前操作。
              </p>
            </div>
          </Demo>
        </div>
      </div>

      {toastOpen ? (
        <div className="fixed right-5 bottom-5 z-50 flex animate-toast-in items-center gap-3 rounded-card border border-line bg-surface px-4 py-3 shadow-clay-lg">
          <CheckCircleIcon className="size-5 shrink-0 text-success" />
          <div className="min-w-0">
            <p className="text-sm font-medium text-ink">已保存</p>
            <p className="text-xs text-ink-subtle">改动已同步到云端</p>
          </div>
          <button
            type="button"
            onClick={() => setToastOpen(false)}
            className="ml-2 rounded-full p-1 text-ink-subtle transition-colors hover:bg-surface-2 hover:text-ink"
            aria-label="关闭提示"
          >
            <CloseIcon className="size-4" />
          </button>
        </div>
      ) : null}
    </>
  )
}
