import { PARTY_ADDRESS, EWD_ADDRESS, UNI } from './../../constants'
import { ChainId, Currency, CurrencyAmount, getNativeCurrency, JSBI, Token, TokenAmount } from '@uniswap/sdk'
import { useMemo } from 'react'
import ERC20_INTERFACE from '../../constants/abis/erc20'
import { useAllTokens } from '../../hooks/Tokens'
import { useActiveWeb3React } from '../../hooks'
import { useMulticallContract } from '../../hooks/useContract'
import { isAddress } from '../../utils'
import { useSingleContractMultipleData, useMultipleContractSingleData } from '../multicall/hooks'
import { useUserUnclaimedAmount } from '../claim/hooks'
import { useTotalUniEarned } from '../stake/hooks'
import { NETWORK_CHAIN_ID } from 'connectors'

/**
 * Returns a map of the given addresses to their eventually consistent ETH balances.
 */
export function useETHBalances(
  uncheckedAddresses?: (string | undefined)[]
): { [address: string]: CurrencyAmount | undefined } {
  const multicallContract = useMulticallContract()

  const addresses: string[] = useMemo(
    () =>
      uncheckedAddresses
        ? uncheckedAddresses
            .map(isAddress)
            .filter((a): a is string => a !== false)
            .sort()
        : [],
    [uncheckedAddresses]
  )

  const results = useSingleContractMultipleData(
    multicallContract,
    'getEthBalance',
    addresses.map(address => [address])
  )

  return useMemo(
    () =>
      addresses.reduce<{ [address: string]: CurrencyAmount }>((memo, address, i) => {
        const value = results?.[i]?.result?.[0]
        if (value) memo[address] = CurrencyAmount.native(NETWORK_CHAIN_ID, JSBI.BigInt(value.toString()))
        return memo
      }, {}),
    [addresses, results]
  )
}

/**
 * Returns a map of token addresses to their eventually consistent token balances for a single account.
 */
export function useTokenBalancesWithLoadingIndicator(
  address?: string,
  tokens?: (Token | undefined)[]
): [{ [tokenAddress: string]: TokenAmount | undefined }, boolean] {
  const validatedTokens: Token[] = useMemo(
    () => tokens?.filter((t?: Token): t is Token => isAddress(t?.address) !== false) ?? [],
    [tokens]
  )

  const validatedTokenAddresses = useMemo(() => validatedTokens.map(vt => vt.address), [validatedTokens])

  const balances = useMultipleContractSingleData(validatedTokenAddresses, ERC20_INTERFACE, 'balanceOf', [address])

  const anyLoading: boolean = useMemo(() => balances.some(callState => callState.loading), [balances])

  return [
    useMemo(
      () =>
        address && validatedTokens.length > 0
          ? validatedTokens.reduce<{ [tokenAddress: string]: TokenAmount | undefined }>((memo, token, i) => {
              const value = balances?.[i]?.result?.[0]
              const amount = value ? JSBI.BigInt(value.toString()) : undefined
              if (amount) {
                memo[token.address] = new TokenAmount(token, amount)
              }
              return memo
            }, {})
          : {},
      [address, validatedTokens, balances]
    ),
    anyLoading
  ]
}

export function useTokenBalances(
  address?: string,
  tokens?: (Token | undefined)[]
): { [tokenAddress: string]: TokenAmount | undefined } {
  return useTokenBalancesWithLoadingIndicator(address, tokens)[0]
}

// get the balance for a single token/account combo
export function useTokenBalance(account?: string, token?: Token): TokenAmount | undefined {
  const tokenBalances = useTokenBalances(account, [token])
  if (!token) return undefined
  return tokenBalances[token.address]
}

export function useCurrencyBalances(
  account?: string,
  currencies?: (Currency | undefined)[]
): (CurrencyAmount | undefined)[] {
  const tokens = useMemo(() => currencies?.filter((currency): currency is Token => currency instanceof Token) ?? [], [
    currencies
  ])

  const tokenBalances = useTokenBalances(account, tokens)
  const nativeCurrency = getNativeCurrency(NETWORK_CHAIN_ID)
  const containsETH: boolean = useMemo(() => currencies?.some(currency => currency === nativeCurrency) ?? false, [
    currencies,
    nativeCurrency
  ])
  const ethBalance = useETHBalances(containsETH ? [account] : [])

  return useMemo(
    () =>
      currencies?.map(currency => {
        if (!account || !currency) return undefined
        if (currency instanceof Token) return tokenBalances[currency.address]
        if (currency === nativeCurrency) return ethBalance[account]
        return undefined
      }) ?? [],
    [account, currencies, ethBalance, tokenBalances, nativeCurrency]
  )
}

export function useCurrencyBalance(account?: string, currency?: Currency): CurrencyAmount | undefined {
  return useCurrencyBalances(account, [currency])[0]
}

// mimics useAllBalances
export function useAllTokenBalances(): { [tokenAddress: string]: TokenAmount | undefined } {
  const { account } = useActiveWeb3React()
  const allTokens = useAllTokens()
  const allTokensArray = useMemo(() => Object.values(allTokens ?? {}), [allTokens])
  const balances = useTokenBalances(account ?? undefined, allTokensArray)
  return balances ?? {}
}

// get the total owned, unclaimed, and unharvested UNI for account
export function useAggregateUniBalance(): TokenAmount | undefined {
  const { account, chainId } = useActiveWeb3React()

  const uni = chainId ? UNI[chainId] : undefined

  const uniBalance: TokenAmount | undefined = useTokenBalance(account ?? undefined, uni)
  const uniUnclaimed: TokenAmount | undefined = useUserUnclaimedAmount(account)
  const uniUnHarvested: TokenAmount | undefined = useTotalUniEarned()

  if (!uni) return undefined

  return new TokenAmount(
    uni,
    JSBI.add(
      JSBI.add(uniBalance?.raw ?? JSBI.BigInt(0), uniUnclaimed?.raw ?? JSBI.BigInt(0)),
      uniUnHarvested?.raw ?? JSBI.BigInt(0)
    )
  )
}

export function useSusuBalances(): { [tokenAddress: string]: TokenAmount | undefined } {
  const { account, chainId } = useActiveWeb3React()

  const sa = EWD_ADDRESS[chainId ?? ChainId.EWC] as string
  const allTokens: { [tokenAddress: string]: Token | undefined } = {}
  if (sa) {
    allTokens[sa] = new Token(chainId ?? ChainId.EWC, sa, 18, 'SUSU', 'SusuToken')
  }

  const pa = PARTY_ADDRESS[chainId ?? ChainId.EWC] as string

  if (pa) {
    allTokens[pa] = new Token(chainId ?? ChainId.EWC, pa, 18, 'xSUSU', 'SusuParty')
  }
  //console.log('susu-party', chainId, `this(${sa})`, `this(${pa})`, PARTY_ADDRESS, SUSU_ADDRESS)

  const allTokensArray = useMemo(() => Object.values(allTokens ?? {}), [allTokens])
  const balances = useTokenBalances(account ?? undefined, allTokensArray)

  if (sa) {
    balances['susu'] = balances[sa]
  }

  if (pa) {
    balances['xsusu'] = balances[pa]
  }

  return balances ?? {}
}
