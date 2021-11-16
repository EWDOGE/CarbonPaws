import React, { useContext } from 'react'

type ICountdownContext = {
  countdownEnded: boolean
  setCountdownEnded?: React.Dispatch<React.SetStateAction<boolean>>
}
export const CountdownContext = React.createContext<ICountdownContext>({ countdownEnded: true })

export type CountdownProps = {
  targetSec?: number
  startMessage?: string
  times?: number
  radix?: number
  roman?: boolean
  onFinish?: () => void
  onTick?: () => void
}

function convertToRoman(num: number) {
  const roman: { [key: string]: number } = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1
  }
  let str = ''

  for (const i of Object.keys(roman)) {
    const q = Math.floor(num / roman[i])
    num -= q * roman[i]
    str += i.repeat(q)
  }

  return str
}

export function Countdown({
  targetSec = 0,
  startMessage = 'Launch',
  times = 1,
  radix = 10,
  roman = false,
  onFinish = () => {},
  onTick = () => {}
}: CountdownProps) {
  let now = Math.round(new Date().getTime() / 1000)
  now = Math.round(now / times)
  const target = Math.round(targetSec / times)

  //console.log(now, target)

  const [counter, setCounter] = React.useState(target > now ? target - now : 0)

  React.useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000 * times)
  }, [counter])

  React.useEffect(() => {
    if (counter === 0) {
      onFinish()
    } else {
      onTick()
    }
  }, [counter, onFinish, onTick])

  let formattedValue: string
  if (roman) {
    formattedValue = convertToRoman(counter)
  } else {
    formattedValue = counter.toString(radix)
  }

  return (
    <span>
      {counter > 0 && <div>{formattedValue}</div>}
      {counter === 0 && <div>{startMessage}</div>}
    </span>
  )
}
