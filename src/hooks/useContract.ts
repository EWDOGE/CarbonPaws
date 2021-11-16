import { Contract } from '@ethersproject/contracts'
import { abi as GOVERNANCE_ABI } from '@uniswap/governance/build/GovernorAlpha.json'
import { abi as UNI_ABI } from '@uniswap/governance/build/Uni.json'
import { abi as STAKING_REWARDS_ABI } from '@uniswap/liquidity-staker/build/StakingRewards.json'
import { abi as MERKLE_DISTRIBUTOR_ABI } from '@uniswap/merkle-distributor/build/MerkleDistributor.json'
import { ChainId, WETH } from '@uniswap/sdk'
import { abi as IUniswapV2PairABI } from '@uniswap/v2-core/build/IUniswapV2Pair.json'
import { NETWORK_CHAIN_ID } from 'connectors'
import { useMemo } from 'react'
import { registryAddresses } from 'utils/resolveENSContentHash'
import {
  GOVERNANCE_ADDRESS,
  MERKLE_DISTRIBUTOR_ADDRESS,
  UNI,
  MAGIC_ADDRESS,
  PARTY_ADDRESS,
  CHEF_ADDRESS,
  SUSU_ADDRESS,
  QUERY_ADDRESS,
  ORCHESTRATOR_ADDRESS,
  STAKING_GAME_ADDRESS,
  STAKING_GAME_QUERY_ADDRESS,
  COLLECTION_S1_ADDRESS
} from '../constants'
import {
  ARGENT_WALLET_DETECTOR_ABI,
  ARGENT_WALLET_DETECTOR_MAINNET_ADDRESS
} from '../constants/abis/argent-wallet-detector'
import ENS_PUBLIC_RESOLVER_ABI from '../constants/abis/ens-public-resolver.json'
import ENS_ABI from '../constants/abis/ens-registrar.json'
import { ERC20_BYTES32_ABI } from '../constants/abis/erc20'
import ERC20_ABI from '../constants/abis/erc20.json'
import { MIGRATOR_ABI, getMigratorAddress } from '../constants/abis/migrator'
import UNISOCKS_ABI from '../constants/abis/unisocks.json'
import WETH_ABI from '../constants/abis/weth.json'
import { MULTICALL_ABI, MULTICALL_NETWORKS } from '../constants/multicall'
import { V1_EXCHANGE_ABI, V1_FACTORY_ABI, V1_FACTORY_ADDRESSES } from '../constants/v1'
import { getContract } from '../utils'
import { useActiveWeb3React } from './index'

import {
  CHEF_ABI,
  MAGIC_ABI,
  PARTY_ABI,
  SUSU_ABI,
  QUERY_ABI,
  ORCHESTRATOR_ABI,
  STAKING_GAME_QUERY_ABI,
  STAKING_GAME_ABI,
  COLLECTION_S1_ABI
} from '../constants/abis/carbonswap'
//import { getFactoryAddress } from '@uniswap/sdk/dist/constants'

// returns null on errors
export function useContract(address: string | undefined, ABI: any, withSignerIfPossible = true): Contract | null {
  const { library, account } = useActiveWeb3React()

  return useMemo(() => {
    if (!address || !ABI || !library) return null
    try {
      return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [address, ABI, library, withSignerIfPossible, account])
}

export function useV1FactoryContract(): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId && V1_FACTORY_ADDRESSES[chainId], V1_FACTORY_ABI, false)
}

export function useV2MigratorContract(): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(getMigratorAddress(chainId ?? NETWORK_CHAIN_ID), MIGRATOR_ABI, true)
}

export function useV1ExchangeContract(address?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(address, V1_EXCHANGE_ABI, withSignerIfPossible)
}

export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(tokenAddress, ERC20_ABI, withSignerIfPossible)
}

export function useWETHContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId ? WETH[chainId].address : undefined, WETH_ABI, withSignerIfPossible)
}

export function useArgentWalletDetectorContract(): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(
    chainId === ChainId.MAINNET ? ARGENT_WALLET_DETECTOR_MAINNET_ADDRESS : undefined,
    ARGENT_WALLET_DETECTOR_ABI,
    false
  )
}

export function useENSRegistrarContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  let address: string | undefined
  if (chainId) {
    address = registryAddresses[chainId]
  }
  return useContract(address, ENS_ABI, withSignerIfPossible)
}

export function useENSResolverContract(address: string | undefined, withSignerIfPossible?: boolean): Contract | null {
  return useContract(address, ENS_PUBLIC_RESOLVER_ABI, withSignerIfPossible)
}

export function useBytes32TokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(tokenAddress, ERC20_BYTES32_ABI, withSignerIfPossible)
}

export function usePairContract(pairAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(pairAddress, IUniswapV2PairABI, withSignerIfPossible)
}

export function useMulticallContract(): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId && MULTICALL_NETWORKS[chainId], MULTICALL_ABI, false)
}

export function useMerkleDistributorContract(): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId ? MERKLE_DISTRIBUTOR_ADDRESS[chainId] : undefined, MERKLE_DISTRIBUTOR_ABI, true)
}

export function useGovernanceContract(): Contract | null {
  return useContract(GOVERNANCE_ADDRESS, GOVERNANCE_ABI, true)
}

export function useUniContract(): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId ? UNI[chainId].address : undefined, UNI_ABI, true)
}

export function useStakingContract(stakingAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(stakingAddress, STAKING_REWARDS_ABI, withSignerIfPossible)
}

export function useSocksController(): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(
    chainId === ChainId.MAINNET ? '0x65770b5283117639760beA3F867b69b3697a91dd' : undefined,
    UNISOCKS_ABI,
    false
  )
}

export function useOrchestratorContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(
    chainId ? ORCHESTRATOR_ADDRESS[chainId ?? ChainId.EWC] : undefined,
    ORCHESTRATOR_ABI,
    withSignerIfPossible
  )
}

export function useSusuContract(withSignerIfPossible = true): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId ? SUSU_ADDRESS[chainId ?? ChainId.EWC] : undefined, SUSU_ABI, withSignerIfPossible)
}

export function useChefContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId ? CHEF_ADDRESS[chainId ?? ChainId.EWC] : undefined, CHEF_ABI, withSignerIfPossible)
}

/*
export function useFactoryContract(): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId && getFactoryAddress(chainId), FACTORY_ABI, false)
}

export function useRouterContract(): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId && ROUTER_ADDRESS, ROUTER_ABI, false)
}
*/

export function useSusuPartyContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId ? PARTY_ADDRESS[chainId ?? ChainId.EWC] : undefined, PARTY_ABI, withSignerIfPossible)
}

export function useMagicContract(): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId ? MAGIC_ADDRESS[chainId ?? ChainId.EWC] : undefined, MAGIC_ABI, false)
}

export function useQueryContract(): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId ? QUERY_ADDRESS[chainId ?? ChainId.EWC] : undefined, QUERY_ABI, false)
}

export function useS1CollectionContract(withSignerIfPossible = true): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(
    chainId ? COLLECTION_S1_ADDRESS[chainId ?? ChainId.EWC] : undefined,
    COLLECTION_S1_ABI,
    withSignerIfPossible
  )
}

export function useStakingGameContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(
    chainId ? STAKING_GAME_ADDRESS[chainId ?? ChainId.EWC] : undefined,
    STAKING_GAME_ABI,
    withSignerIfPossible
  )
}

export function useStakingGameQueryContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(
    chainId ? STAKING_GAME_QUERY_ADDRESS[chainId ?? ChainId.EWC] : undefined,
    STAKING_GAME_QUERY_ABI,
    withSignerIfPossible
  )
}

/*
export function useTimelockContract(): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract(chainId && TIMELOCK_ADDRESS[chainId], TIMELOCK_ABI, false)
}
*/
