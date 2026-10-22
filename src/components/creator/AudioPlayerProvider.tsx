import { useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { AudioPlayerContext } from '../../app/audio-context.ts'

const PREVIEW_SECONDS = 30
const TICK_MS = 250

/** 全站共享的「试听」状态：同一时间只播放一条音声 */
export default function AudioPlayerProvider({ children }: { children: ReactNode }) {
  const [currentId, setCurrentId] = useState<string | null>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const progressRef = useRef(0)

  useEffect(() => {
    if (!playing) return

    const step = (TICK_MS / 1000 / PREVIEW_SECONDS) * 100
    const timer = window.setInterval(() => {
      progressRef.current = Math.min(100, progressRef.current + step)
      setProgress(progressRef.current)
      if (progressRef.current >= 100) setPlaying(false)
    }, TICK_MS)

    return () => window.clearInterval(timer)
  }, [playing])

  const value = useMemo(
    () => ({
      currentId,
      playing,
      progress,
      toggle(id: string) {
        if (id !== currentId) {
          progressRef.current = 0
          setCurrentId(id)
          setProgress(0)
          setPlaying(true)
          return
        }
        if (playing) {
          setPlaying(false)
          return
        }
        if (progressRef.current >= 100) {
          progressRef.current = 0
          setProgress(0)
        }
        setPlaying(true)
      },
      stop() {
        progressRef.current = 0
        setPlaying(false)
        setProgress(0)
        setCurrentId(null)
      },
    }),
    [currentId, playing, progress],
  )

  return <AudioPlayerContext.Provider value={value}>{children}</AudioPlayerContext.Provider>
}
