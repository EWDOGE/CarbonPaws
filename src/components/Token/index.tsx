import React, { useRef } from 'react'
import { useSpring } from 'react-spring'

import { useBoundingClientRect } from 'hooks/useBoundingClientRect'
import { TokenImage, TokenName, AnimatedTokenWrapper } from './styles'
import { TokenProps } from './types'

const Token = ({ description, img, name }: TokenProps) => {
  const [props, setAnimation] = useSpring(() => ({
    xys: [0, 0, 1],
    config: {
      mass: 10,
      tension: 350,
      friction: 80
    }
  }))
  const ref = useRef<HTMLDivElement>(null)
  const { height, left, top, width } = useBoundingClientRect(ref)

  const calc = (x: number, y: number, power: number): number[] => [
    -((top + height / 2 - y) / (height / 2)) * power,
    -((left + width / 2 - x) / (width / 2)) * power,
    1.05
  ]
  const trans = (x: number, y: number, s: number): string =>
    `perspective(1000px) rotateX(${x}deg) rotateY(${-y}deg) scale(${s})`

  return (
    <AnimatedTokenWrapper
      style={{
        transform: props.xys.interpolate(trans as any)
      }}
      ref={ref}
      onMouseMove={({ clientX: x, clientY: y }) => setAnimation({ xys: calc(x, y, 25) })}
      onMouseLeave={() => setAnimation({ xys: [0, 0, 1] })}
    >
      <TokenImage src={img} alt="" />
      <TokenName>{name}</TokenName>
      <TokenName>{description}</TokenName>
    </AnimatedTokenWrapper>
  )
}

export default Token
