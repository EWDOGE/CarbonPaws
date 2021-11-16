import { BigNumber } from '@ethersproject/bignumber'
import { ChainId, Token, TokenAmount } from '@uniswap/sdk'
import { SUSU_ADDRESS, PARTY_ADDRESS, SUSU } from '../constants'
import { useActiveWeb3React } from 'hooks'
import ERC20_INTERFACE from '../constants/abis/erc20'
import { useTokenContract } from '../hooks/useContract'
import { useMultipleContractSingleData, useSingleCallResult } from '../state/multicall/hooks'

// returns undefined if input token is undefined, or fails to get token contract,
// or contract total supply cannot be fetched
export function useTotalSupply(token?: Token): TokenAmount | undefined {
  const contract = useTokenContract(token?.address, false)

  const totalSupply: BigNumber = useSingleCallResult(contract, 'totalSupply')?.result?.[0]

  return token && totalSupply ? new TokenAmount(token, totalSupply.toString()) : undefined
}

// returns undefined if input token is undefined, or fails to get token contract,
// or contract total supply cannot be fetched
export function useAllSusuTotalSupply(): { [tokenAddress: string]: TokenAmount | undefined } {
  const { account, chainId } = useActiveWeb3React()

  const sa = SUSU_ADDRESS[chainId ?? ChainId.EWC] as string
  const alist: string[] = []
  if (sa) {
    alist.push(sa)
  }

  const pa = PARTY_ADDRESS[chainId ?? ChainId.EWC] as string

  if (pa) {
    alist.push(pa)
  }

  const balances = useMultipleContractSingleData(alist, ERC20_INTERFACE, 'totalSupply')

  const totalSupplies: { [tokenAddress: string]: TokenAmount | undefined } = {}

  const tsupps = balances.map((x, i) => {
    const tsup = alist[i] ? x?.result?.[0] : undefined
    if (tsup) {
      totalSupplies[alist[i]] = new TokenAmount(SUSU[chainId ?? ChainId.EWC], tsup.toString())
    }
  })

  if (sa) {
    totalSupplies['susu'] = totalSupplies[sa]
  }

  if (pa) {
    totalSupplies['xsusu'] = totalSupplies[pa]
  }

  return totalSupplies
}
