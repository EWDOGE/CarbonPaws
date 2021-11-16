import { CurrencyAmount, getNativeCurrency, JSBI } from '@uniswap/sdk'
import { NETWORK_CHAIN_ID } from 'connectors'
import { MIN_ETH } from '../constants'

/**
 * Given some token amount, return the max that can be spent of it
 * @param currencyAmount to return max of
 */
export function maxAmountSpend(currencyAmount?: CurrencyAmount): CurrencyAmount | undefined {
  if (!currencyAmount) return undefined
  if (currencyAmount.currency === getNativeCurrency(NETWORK_CHAIN_ID)) {
    if (JSBI.greaterThan(currencyAmount.raw, MIN_ETH)) {
      return CurrencyAmount.native(NETWORK_CHAIN_ID, JSBI.subtract(currencyAmount.raw, MIN_ETH))
    } else {
      return CurrencyAmount.native(NETWORK_CHAIN_ID, JSBI.BigInt(0))
    }
  }
  return currencyAmount
}
