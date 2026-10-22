import { useState } from 'react'
import Demo from '../components/layout/Demo.tsx'
import Alert from '../components/ui/Alert.tsx'
import Button from '../components/ui/Button.tsx'
import Checkbox from '../components/ui/Checkbox.tsx'
import { Field, Input, Select, Textarea } from '../components/ui/Field.tsx'
import Switch from '../components/ui/Switch.tsx'
import { SearchIcon } from '../components/ui/icons.tsx'

type FormValues = {
  name: string
  email: string
  role: string
  bio: string
  notify: boolean
  agree: boolean
}

const EMPTY: FormValues = {
  name: '',
  email: '',
  role: 'product',
  bio: '',
  notify: true,
  agree: false,
}

export default function FormSection() {
  const [values, setValues] = useState<FormValues>(EMPTY)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  const update = <K extends keyof FormValues>(key: K, value: FormValues[K]) => {
    setValues((current) => ({ ...current, [key]: value }))
    setErrors((current) => {
      if (!current[key]) return current
      const next = { ...current }
      delete next[key]
      return next
    })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors: Record<string, string> = {}
    if (!values.name.trim()) nextErrors.name = '请填写姓名'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) nextErrors.email = '请输入有效的邮箱地址'
    if (!values.agree) nextErrors.agree = '需要同意服务条款才能提交'

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      setSubmitted(false)
      return
    }

    setSubmitted(true)
  }

  const handleReset = () => {
    setValues(EMPTY)
    setErrors({})
    setSubmitted(false)
  }

  return (
    <div className="space-y-8">
      <Demo label="输入框状态 Input">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="默认" htmlFor="demo-default" hint="支持 placeholder 与禁用态">
            <Input id="demo-default" placeholder="输入内容…" />
          </Field>

          <Field label="带前置图标" htmlFor="demo-search">
            <Input
              id="demo-search"
              placeholder="搜索项目、成员…"
              leading={<SearchIcon className="size-4" />}
            />
          </Field>

          <Field label="错误态" htmlFor="demo-error" error="该域名已被占用">
            <Input id="demo-error" defaultValue="maoyusu" invalid />
          </Field>

          <Field label="禁用态" htmlFor="demo-disabled">
            <Input id="demo-disabled" defaultValue="由管理员统一配置" disabled />
          </Field>
        </div>
      </Demo>

      <Demo label="完整表单" hint="提交后校验，成功会给出一条提示">
        {submitted ? (
          <div className="mb-5">
            <Alert tone="success" title="提交成功" onClose={() => setSubmitted(false)}>
              已收到 {values.name} 的信息，我们会在 1 个工作日内通过 {values.email} 联系你。
            </Alert>
          </div>
        ) : null}

        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="姓名" htmlFor="field-name" required error={errors.name}>
              <Input
                id="field-name"
                value={values.name}
                invalid={Boolean(errors.name)}
                onChange={(event) => update('name', event.target.value)}
                placeholder="怎么称呼你"
              />
            </Field>

            <Field label="邮箱" htmlFor="field-email" required error={errors.email}>
              <Input
                id="field-email"
                type="email"
                value={values.email}
                invalid={Boolean(errors.email)}
                onChange={(event) => update('email', event.target.value)}
                placeholder="you@example.com"
              />
            </Field>

            <Field label="角色" htmlFor="field-role">
              <Select
                id="field-role"
                value={values.role}
                onChange={(event) => update('role', event.target.value)}
              >
                <option value="product">产品经理</option>
                <option value="design">设计师</option>
                <option value="engineer">工程师</option>
                <option value="other">其他</option>
              </Select>
            </Field>

            <Field
              label="简介"
              htmlFor="field-bio"
              hint={`${values.bio.length}/120 字，介绍你正在做的事`}
            >
              <Textarea
                id="field-bio"
                value={values.bio}
                maxLength={120}
                onChange={(event) => update('bio', event.target.value)}
                placeholder="用一两句话介绍你的团队或项目…"
              />
            </Field>
          </div>

          <div className="space-y-4 rounded-field bg-surface-2/60 p-4">
            <Switch
              label="订阅产品更新"
              description="有新的组件和模板时通知我"
              checked={values.notify}
              onChange={(checked) => update('notify', checked)}
            />

            <div className="space-y-1">
              <Checkbox
                label="我已阅读并同意《服务条款》与《隐私政策》"
                checked={values.agree}
                onChange={(checked) => update('agree', checked)}
              />
              {errors.agree ? <p className="pl-8 text-xs text-danger">{errors.agree}</p> : null}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button type="submit">提交表单</Button>
            <Button type="button" variant="ghost" onClick={handleReset}>
              重置
            </Button>
            <span className="text-xs text-ink-subtle">带 * 的为必填项</span>
          </div>
        </form>
      </Demo>
    </div>
  )
}
