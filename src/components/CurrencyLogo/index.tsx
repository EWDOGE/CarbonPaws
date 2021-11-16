import { ChainId, Currency, getNativeCurrency, Token } from '@uniswap/sdk'
import { NETWORK_CHAIN_ID } from 'connectors'
import React, { useMemo } from 'react'
import styled from 'styled-components'

import EthereumLogo from '../../assets/images/ethereum-logo.png'
import EWTLogo from '../../assets/images/ewt-logo.png'
import useHttpLocations from '../../hooks/useHttpLocations'
import { WrappedTokenInfo } from '../../state/lists/hooks'
import Logo from '../Logo'

export const getTokenLogoURL = (address: string) =>
  `https://raw.githubusercontent.com/carbonswap/assets/master/carbonswap/logo/${address}.png`

const StyledEthereumLogo = styled.img<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  border-radius: 24px;
`

const StyledLogo = styled(Logo)<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  background-color: ${({ theme }) => theme.white};
`

const logoSelector: { [key: number]: string } = {
  [ChainId.VOLTA]: EWTLogo,
  [ChainId.EWC]: EWTLogo,
  [ChainId.MAINNET]: EthereumLogo
}

export default function CurrencyLogo({
  currency,
  size = '24px',
  style
}: {
  currency?: Currency
  size?: string
  style?: React.CSSProperties
}) {
  const uriLocations = useHttpLocations(currency instanceof WrappedTokenInfo ? currency.logoURI : undefined)
  const nativeCurrency = getNativeCurrency(currency?.chainId ?? NETWORK_CHAIN_ID)
  const srcs: string[] = useMemo(() => {
    if (currency === nativeCurrency) return []

    if (currency instanceof Token) {
      if (currency instanceof WrappedTokenInfo) {
        return [...uriLocations, getTokenLogoURL(currency.address)]
      }
      return [getTokenLogoURL(currency.address)]
    }
    return []
  }, [currency, uriLocations, nativeCurrency])

  if (currency === nativeCurrency) {
    return (
      <StyledEthereumLogo
        src={logoSelector[currency.chainId ?? NETWORK_CHAIN_ID] ?? EthereumLogo}
        size={size}
        style={style}
      />
    )
  }

  return <StyledLogo size={size} srcs={srcs} alt={`${currency?.symbol ?? 'token'} logo`} style={style} />
}
