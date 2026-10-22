import Badge from '../components/ui/Badge.tsx'
import Button from '../components/ui/Button.tsx'
import { PlusIcon, SearchIcon, SendIcon } from '../components/ui/icons.tsx'

const CONVERSATIONS = [
  {
    name: '林一舟',
    initial: '林',
    preview: '设计稿我放在 Figma 里了，token 已经对齐',
    time: '10:24',
    unread: 2,
    active: true,
    online: true,
  },
  {
    name: '产品讨论组',
    initial: '产',
    preview: '周雨桐：这版流程少了失败态',
    time: '09:58',
    unread: 5,
    group: true,
  },
  {
    name: '陈小满',
    initial: '陈',
    preview: '好的，下午三点评审见',
    time: '昨天',
    online: true,
  },
  { name: '何知远', initial: '何', preview: '数据看板的接口今天能联调', time: '昨天' },
  { name: '运营值班', initial: '运', preview: '本周活动页文案已确认', time: '周一' },
]

const MESSAGES = [
  { side: 'left', text: '早上好，设计稿里的按钮状态我补齐了，你看看还有没有漏的？', time: '10:02' },
  { side: 'right', text: '收到，我先对着 token 核一遍，主要看 hover 和禁用态。', time: '10:05' },
  { side: 'left', text: '对，另外深色下阴影我调淡了一档，之前发光感太重。', time: '10:06' },
  { side: 'right', text: '好，那我把 btn 的 shadow-clay 统一成 sm。', time: '10:08' },
  {
    side: 'left',
    text: '👍 对了，下午三点评审要过一遍首页，能提前把稿子发我吗？',
    time: '10:24',
  },
]

export default function ChatLayoutDemo() {
  return (
    <div className="flex h-full bg-surface">
      {/* 会话列表 */}
      <aside className="flex w-[208px] shrink-0 flex-col border-r border-line/70">
        <div className="flex items-center justify-between gap-2 px-3 py-2.5">
          <h3 className="text-sm font-semibold text-ink">消息</h3>
          <span className="grid size-6 place-items-center rounded-full bg-surface-2 text-ink-muted">
            <PlusIcon className="size-3.5" />
          </span>
        </div>

        <div className="px-3 pb-2">
          <span className="flex h-7 items-center gap-1.5 rounded-full bg-surface-2 px-2.5 text-[11px] text-ink-subtle shadow-clay-inset">
            <SearchIcon className="size-3" />
            搜索会话
          </span>
        </div>

        <div className="min-h-0 flex-1 overflow-auto">
          {CONVERSATIONS.map((chat) => (
            <div
              key={chat.name}
              className={[
                'flex items-start gap-2 px-3 py-2',
                chat.active ? 'bg-primary-soft/60' : '',
              ].join(' ')}
            >
              <span className="relative mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-linear-to-br from-primary to-primary-2 text-[10px] font-semibold text-on-primary">
                {chat.initial}
                {chat.online ? (
                  <span className="absolute -right-0.5 -bottom-0.5 size-2 rounded-full border border-surface bg-success" />
                ) : null}
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-1">
                  <span className="truncate text-[11px] font-medium text-ink">{chat.name}</span>
                  <span className="shrink-0 text-[9px] text-ink-subtle">{chat.time}</span>
                </div>
                <p className="mt-0.5 truncate text-[10px] text-ink-subtle">{chat.preview}</p>
              </div>

              {chat.unread ? (
                <span className="mt-1 grid size-4 shrink-0 place-items-center rounded-full bg-primary text-[9px] font-medium text-on-primary">
                  {chat.unread}
                </span>
              ) : null}
            </div>
          ))}
        </div>
      </aside>

      {/* 聊天窗口 */}
      <div className="flex min-h-0 flex-1 flex-col">
        <header className="flex items-center gap-2 border-b border-line/70 px-3 py-2.5">
          <span className="grid size-7 place-items-center rounded-full bg-linear-to-br from-primary to-primary-2 text-[10px] font-semibold text-on-primary">
            林
          </span>
          <div>
            <p className="text-xs font-medium text-ink">林一舟</p>
            <p className="flex items-center gap-1 text-[9px] text-success">
              <span className="size-1.5 rounded-full bg-success" />
              在线
            </p>
          </div>
          <Badge tone="neutral" className="ml-2">
            设计组
          </Badge>
          <span className="ml-auto text-[10px] text-ink-subtle">查看资料</span>
        </header>

        <div className="min-h-0 flex-1 space-y-2.5 overflow-auto p-3">
          <p className="text-center text-[9px] text-ink-subtle">今天</p>

          {MESSAGES.map((message, index) => (
            <div
              key={index}
              className={['flex', message.side === 'right' ? 'justify-end' : 'justify-start'].join(
                ' ',
              )}
            >
              <div className="max-w-[76%]">
                <div
                  className={[
                    'rounded-2xl px-2.5 py-2 text-[11px] leading-relaxed shadow-clay-sm',
                    message.side === 'right'
                      ? 'rounded-br-md bg-linear-to-br from-primary to-primary-2 text-on-primary'
                      : 'rounded-bl-md bg-surface-2 text-ink',
                  ].join(' ')}
                >
                  {message.text}
                </div>
                <p
                  className={[
                    'mt-0.5 text-[9px] text-ink-subtle',
                    message.side === 'right' ? 'text-right' : '',
                  ].join(' ')}
                >
                  {message.time}
                </p>
              </div>
            </div>
          ))}

          <p className="text-center text-[9px] text-ink-subtle">对方正在输入…</p>
        </div>

        {/* 输入框 */}
        <div className="border-t border-line/70 p-2.5">
          <div className="flex items-end gap-2 rounded-field bg-surface-2 p-2 shadow-clay-inset">
            <span className="flex-1 text-[11px] text-ink-subtle">输入消息，Enter 发送…</span>
            <Button size="sm" icon={<SendIcon className="size-3.5" />}>
              发送
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
