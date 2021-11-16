import React from 'react'
import { BigintIsh, ChainId, Fraction, Token, TokenAmount } from '@uniswap/sdk'
import { useContext } from 'react'
import { Repeat } from 'react-feather'
import { Text } from 'rebass'
import { ThemeContext } from 'styled-components'
import { StyledBalanceMaxMini } from '../swap/styleds'
import { SUSU_ADDRESS } from '../../constants'

interface TradePriceProps {
  userBalance?: BigintIsh
  totalSupply?: BigintIsh
  stakeSusuBalance?: BigintIsh
  showInToken: boolean
  setShowInToken: (showInToken: boolean) => void
}

export default function StakeAmount({
  userBalance,
  totalSupply,
  stakeSusuBalance,
  showInToken,
  setShowInToken
}: TradePriceProps) {
  const theme = useContext(ThemeContext)

  const ushare = new Fraction(userBalance as BigintIsh, totalSupply)

  const show = Boolean(userBalance && totalSupply && stakeSusuBalance)
  const label = showInToken
    ? `${new TokenAmount(
        new Token(ChainId.EWC, SUSU_ADDRESS[ChainId.EWC] as string, 18, 'SUSU', 'Susu Token'),
        ushare?.multiply(stakeSusuBalance as BigintIsh).toFixed(0)
      ).toFixed(0, { groupSeparator: ',' })} SUSU`
    : `${ushare?.multiply('100').toFixed(4)}%`

  return (
    <Text
      fontWeight={500}
      fontSize={14}
      color={theme.text2}
      style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}
    >
      {show ? (
        <>
          {label}
          <StyledBalanceMaxMini onClick={() => setShowInToken(!showInToken)}>
            <Repeat size={14} />
          </StyledBalanceMaxMini>
        </>
      ) : (
        '-'
      )}
    </Text>
  )
}
