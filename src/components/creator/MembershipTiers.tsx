import { TIERS } from '../../data/creator.ts'
import Badge from '../ui/Badge.tsx'
import { buttonClass } from '../ui/buttonClasses.ts'
import { CheckIcon } from '../ui/icons.tsx'

/** 会员方案：免费 / 标准 / 高级，中间档高亮 */
export default function MembershipTiers() {
  return (
    <div className="grid gap-3 lg:grid-cols-3">
      {TIERS.map((tier) => (
        <div
          key={tier.name}
          className={[
            'relative flex h-full flex-col rounded-card border p-5',
            tier.featured
              ? 'border-blush/40 bg-linear-to-b from-blush-soft/70 to-primary-soft/40 shadow-clay'
              : 'border-line/70 bg-surface shadow-clay-sm',
          ].join(' ')}
        >
          {tier.featured ? (
            <span className="absolute -top-2.5 right-4">
              <Badge tone="primary" dot>
                推荐
              </Badge>
            </span>
          ) : null}

          <p className="font-display text-lg font-medium text-ink">{tier.name}</p>
          <p className="mt-1 flex items-baseline gap-1">
            <span className="font-display text-3xl font-semibold tracking-tight text-ink">
              {tier.price}
            </span>
            <span className="text-xs text-ink-subtle">{tier.unit}</span>
          </p>
          <p className="mt-1 text-xs text-ink-muted">{tier.tagline}</p>

          <ul className="mt-4 flex-1 space-y-2">
            {tier.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-2 text-xs leading-relaxed text-ink-muted"
              >
                <CheckIcon className="mt-0.5 size-3.5 shrink-0 text-blush" />
                {feature}
              </li>
            ))}
          </ul>

          <a
            href="https://www.fanbox.cc/"
            target="_blank"
            rel="noreferrer"
            className={buttonClass({
              variant: tier.featured ? 'primary' : 'secondary',
              size: 'sm',
              className: 'mt-5 w-full',
            })}
          >
            {tier.featured ? '加入标准会员' : `选择 ${tier.name}`}
          </a>
        </div>
      ))}
    </div>
  )
}
