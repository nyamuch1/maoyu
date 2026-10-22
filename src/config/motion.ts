/**
 * 主题切换动画的时长配置。
 * 想整体调快 / 调慢，只改这里；界面上「动画时长」三档就是从这份表取的。
 */
export type ThemeSpeed = 'fast' | 'normal' | 'slow'

export const SPEED_DURATION: Record<
  ThemeSpeed,
  { fade: number; circle: number; fallback: number }
> = {
  /** 快速：干净利落，适合频繁切换 */
  fast: { fade: 220, circle: 520, fallback: 200 },
  /** 标准（默认）：圆形扩散 0.9s，能看清完整扩散过程 */
  normal: { fade: 360, circle: 900, fallback: 300 },
  /** 慢速：1.5s，适合演示 / 录屏 */
  slow: { fade: 560, circle: 1500, fallback: 460 },
}

export const DEFAULT_SPEED: ThemeSpeed = 'normal'

/** 圆形扩散缓动：先快后慢，收尾更自然 */
export const CIRCLE_EASING = 'cubic-bezier(0.22, 1, 0.36, 1)'
/** 淡入淡出缓动 */
export const FADE_EASING = 'cubic-bezier(0.4, 0, 0.2, 1)'
