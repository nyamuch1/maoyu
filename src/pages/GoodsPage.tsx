import { useState } from 'react'
import SectionHeading from '../components/creator/SectionHeading.tsx'
import Badge from '../components/ui/Badge.tsx'
import { buttonClass } from '../components/ui/buttonClasses.ts'
import { CartIcon, TruckIcon } from '../components/ui/icons.tsx'
import { GOODS } from '../data/creator.ts'

export default function GoodsPage() {
  const [cart, setCart] = useState<string[]>([])

  return (
    <div className="space-y-6 py-8">
      <SectionHeading
        eyebrow="Goods"
        title="周边"
        description="受注商品与现货混合，加入购物车只是演示，不会真的下单。"
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {GOODS.map((good) => {
          const added = cart.includes(good.id)
          return (
            <article
              key={good.id}
              className="group flex flex-col overflow-hidden rounded-card border border-line/70 bg-surface shadow-clay-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-clay"
            >
              <div
                className={[
                  'relative grid h-32 place-items-center bg-linear-to-br text-4xl',
                  good.gradient,
                ].join(' ')}
              >
                <span className="drop-shadow-sm">{good.glyph}</span>
                <span className="absolute top-2.5 left-2.5">
                  <Badge tone={good.tagTone} className="text-[10px]">
                    {good.tag}
                  </Badge>
                </span>
              </div>

              <div className="flex flex-1 flex-col p-4">
                <p className="text-sm font-medium text-ink">{good.name}</p>
                <p className="mt-1 font-display text-lg font-semibold text-ink">{good.price}</p>

                <button
                  type="button"
                  onClick={() =>
                    setCart((items) =>
                      items.includes(good.id)
                        ? items.filter((id) => id !== good.id)
                        : [...items, good.id],
                    )
                  }
                  className={buttonClass({
                    variant: added ? 'soft' : 'secondary',
                    size: 'sm',
                    className: 'mt-3 w-full',
                  })}
                  aria-pressed={added}
                >
                  {added ? '已加入' : '加入购物车'}
                </button>
              </div>
            </article>
          )
        })}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-card border border-line/70 bg-surface p-4 text-sm shadow-clay-sm">
        <p className="flex items-center gap-2 text-ink-muted">
          <CartIcon className="size-4 text-blush" />
          购物车：<span className="font-mono text-ink">{cart.length}</span> 件
          {cart.length > 0 ? (
            <button
              type="button"
              onClick={() => setCart([])}
              className="ml-1 text-[11px] text-ink-subtle underline-offset-2 hover:text-primary hover:underline"
            >
              清空
            </button>
          ) : null}
        </p>
        <span className="flex items-center gap-1.5 text-[11px] text-ink-subtle">
          <TruckIcon className="size-3.5" />满 ¥5,000 包邮（演示）
        </span>
      </div>
    </div>
  )
}
