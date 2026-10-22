import { useState } from 'react'
import Button from '../components/ui/Button.tsx'
import Checkbox from '../components/ui/Checkbox.tsx'
import { Field, Input } from '../components/ui/Field.tsx'
import { LockIcon, MailIcon } from '../components/ui/icons.tsx'

export default function AuthLayoutDemo() {
  const [remember, setRemember] = useState(true)

  return (
    <div className="relative grid h-full place-items-center overflow-hidden bg-canvas px-6">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-16 size-64 rounded-full bg-primary/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -bottom-24 size-72 rounded-full bg-info/15 blur-3xl"
      />

      <div className="relative w-full max-w-[330px] rounded-card border border-line/70 bg-surface p-6 shadow-clay">
        <div className="flex items-center gap-2">
          <span className="grid size-9 place-items-center rounded-2xl bg-linear-to-br from-primary to-primary-2 text-sm font-bold text-on-primary shadow-clay-sm">
            m
          </span>
          <span className="text-sm font-semibold tracking-tight text-ink">maoyusu</span>
        </div>

        <h2 className="mt-5 text-xl font-semibold tracking-tight text-ink">欢迎回来</h2>
        <p className="mt-1 text-sm text-ink-muted">登录后继续管理你的工作区</p>

        <form className="mt-5 space-y-3.5" onSubmit={(event) => event.preventDefault()}>
          <Field label="邮箱" htmlFor="demo-auth-email">
            <Input
              id="demo-auth-email"
              defaultValue="xiaoman@orbit.dev"
              leading={<MailIcon className="size-4" />}
            />
          </Field>

          <Field label="密码" htmlFor="demo-auth-password" hint="至少 8 位字符">
            <Input
              id="demo-auth-password"
              type="password"
              defaultValue="orbit2026"
              leading={<LockIcon className="size-4" />}
            />
          </Field>

          <div className="flex items-center justify-between gap-2">
            <Checkbox label="记住我" checked={remember} onChange={setRemember} />
            <button type="button" className="text-xs text-primary hover:underline">
              忘记密码？
            </button>
          </div>

          <Button type="submit" className="w-full">
            登录
          </Button>
        </form>

        <div className="my-4 flex items-center gap-3">
          <span className="h-px flex-1 bg-line" />
          <span className="text-[10px] text-ink-subtle">或</span>
          <span className="h-px flex-1 bg-line" />
        </div>

        <div className="space-y-2">
          <Button variant="secondary" className="w-full">
            使用 Google 登录
          </Button>
          <Button variant="secondary" className="w-full">
            使用 GitHub 登录
          </Button>
        </div>

        <p className="mt-4 text-center text-xs text-ink-subtle">
          还没有账号？
          <button type="button" className="ml-1 text-primary hover:underline">
            免费注册
          </button>
        </p>
      </div>
    </div>
  )
}
