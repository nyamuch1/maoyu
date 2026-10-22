import { createContext, useContext } from 'react'

export type AudioPlayerState = {
  currentId: string | null
  playing: boolean
  /** 0 - 100，试听片段进度 */
  progress: number
  toggle: (id: string) => void
  stop: () => void
}

export const AudioPlayerContext = createContext<AudioPlayerState | null>(null)

export function useAudioPlayer() {
  const ctx = useContext(AudioPlayerContext)
  if (!ctx) throw new Error('useAudioPlayer 必须在 <AudioPlayerProvider> 内使用')
  return ctx
}
