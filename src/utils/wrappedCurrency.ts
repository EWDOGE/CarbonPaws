import { ChainId, Currency, CurrencyAmount, Token, TokenAmount, WETH, getNativeCurrency } from '@uniswap/sdk'

export function wrappedCurrency(currency: Currency | undefined, chainId: ChainId | undefined): Token | undefined {
  return chainId && currency === getNativeCurrency(chainId)
    ? WETH[chainId]
    : currency instanceof Token
    ? currency
    : undefined
}

export function wrappedCurrencyAmount(
  currencyAmount: CurrencyAmount | undefined,
  chainId: ChainId | undefined
): TokenAmount | undefined {
  const token = currencyAmount && chainId ? wrappedCurrency(currencyAmount.currency, chainId) : undefined
  return token && currencyAmount ? new TokenAmount(token, currencyAmount.raw) : undefined
}

export function unwrappedToken(token: Token): Currency {
  if (token.equals(WETH[token.chainId])) return getNativeCurrency(token.chainId)
  return token
}