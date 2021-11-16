import { Currency, getNativeCurrency, Token } from '@uniswap/sdk'
import { NETWORK_CHAIN_ID } from 'connectors'

export function currencyId(currency: Currency): string {
  const nativeCurrency = getNativeCurrency(NETWORK_CHAIN_ID)
  if (currency === nativeCurrency) return nativeCurrency.symbol ?? 'EWT'
  if (currency instanceof Token) return currency.address
  throw new Error('invalid currency')
}
