import { ChainId, Currency, WNATIVE } from '../../sdk'
import React, { FunctionComponent, useMemo } from 'react'
import Logo from '../Logo'
import { WrappedTokenInfo } from '../../state/lists/wrappedTokenInfo'
import useHttpLocations from '../../hooks/useHttpLocations'

export const getTokenLogoURL = (address: string, chainId: ChainId) => {
  return `https://raw.githubusercontent.com/EWDOGE/assets/master/CarbonPaws/logo/${address}.png`
}

const BLOCKCHAIN = {
  [ChainId.MAINNET]: 'ethereum',
  [ChainId.BSC]: 'smartchain',
  [ChainId.CELO]: 'celo',
  [ChainId.FANTOM]: 'fantom',
  [ChainId.HARMONY]: 'harmony',
  [ChainId.MATIC]: 'polygon',
  [ChainId.XDAI]: 'xdai',
  [ChainId.EWC]: 'ewc',
  // [ChainId.OKEX]: 'okex',
}

function getCurrencySymbol(currency) {
  if (currency.symbol === 'WBTC') {
    return 'btc'
  }
  if (currency.symbol === 'WETH') {
    return 'eth'
  }
  return currency.symbol.toLowerCase()
}

function getCurrencyLogoUrls(currency) {
  const urls = []
  if (currency.chainId in BLOCKCHAIN) {
    urls.push(`https://raw.githubusercontent.com/EWDOGE/assets/master/CarbonPaws/logo/${currency.address}.png`)
  }

  return urls
}

const EnergyWebLogo =
  'https://raw.githubusercontent.com/EWDOGE/assets/master/CarbonPaws/logo/0x4fC53aEA7A4C6e898a8fA2545d725a0B48c614A4.png'

const logo: { readonly [chainId in ChainId]?: string } = {
  [ChainId.EWC]: EnergyWebLogo,
}

interface CurrencyLogoProps {
  currency?: Currency
  size?: string | number
  style?: React.CSSProperties
  className?: string
  squared?: boolean
}

const unknown = 'https://raw.githubusercontent.com/sushiswap/icons/master/token/unknown.png'
const ewd = 'https://carbonpaws.io/icon.png'

const CurrencyLogo: FunctionComponent<CurrencyLogoProps> = ({
  currency,
  size = '24px',
  style,
  className = '',
  ...rest
}) => {
  const uriLocations = useHttpLocations(
    currency instanceof WrappedTokenInfo ? currency.logoURI || currency.tokenInfo.logoURI : undefined
  )

  const srcs = useMemo(() => {
    if (!currency) {
      return [unknown]
    }
    if (currency?.symbol == 'EWD') {
      return [ewd]
    }
    if (currency.isNative || currency.equals(WNATIVE[currency.chainId])) {
      return [logo[currency.chainId], unknown]
    }

    if (currency.isToken) {
      const defaultUrls = [...getCurrencyLogoUrls(currency)]
      if (currency instanceof WrappedTokenInfo) {
        return [...uriLocations, ...defaultUrls, unknown]
      }
      return defaultUrls
    }
  }, [currency, uriLocations])

  return <Logo srcs={srcs} width={size} height={size} alt={currency?.symbol} {...rest} />
}

export default CurrencyLogo
