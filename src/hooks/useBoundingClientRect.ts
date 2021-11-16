import { useState, useEffect } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

interface Bounds {
  left: number
  top: number
  width: number
  height: number
}
const initialBounds: Bounds = { left: 0, top: 0, width: 0, height: 0 }
export function useBoundingClientRect(ref: React.RefObject<HTMLDivElement>): Bounds {
  const [bounds, set] = useState<Bounds>(initialBounds)
  const [ro] = useState(
    () => new ResizeObserver(([entry]: ResizeObserverEntry[]) => set(entry.target.getBoundingClientRect()))
  )
  useEffect(() => {
    if (ref.current) ro.observe(ref.current)
    return () => ro.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return bounds
}
