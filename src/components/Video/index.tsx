import * as React from 'react'
import { useEffect } from 'react'
import { VideoProps } from './types'

export const VideoComponent = ({ src, type, muted, loop, autoPlay }: VideoProps) => {
  const finalType = type ?? 'video/mp4'
  let videoContainer: HTMLElement | null = document.createElement('div')

  useEffect(() => {
    const video = document.createElement('video')
    video.autoplay = autoPlay
    video.loop = loop
    video.muted = muted // fixes autoplay in chrome
    video.defaultMuted = muted // fixes autoplay in chrome
    video.setAttribute('playsinline', 'true') // fixes autoplay in webkit (ie. mobile safari)

    const source = document.createElement('source')
    source.src = src
    source.type = finalType
    video.appendChild(source)

    if (videoContainer) {
      videoContainer.appendChild(video)
    }
  }, [src, type, videoContainer])

  return (
    <div
      ref={ref => {
        videoContainer = ref
      }}
    />
  )
}
