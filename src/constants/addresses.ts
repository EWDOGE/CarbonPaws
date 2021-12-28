import { ChainId } from '../sdk'

type AddressMap = { [chainId: number]: string }

export const TIMELOCK_ADDRESS = ''
export const FAUCET_ADDRESS = ''

export const LOCKER_ADDRESS: AddressMap = {
  [ChainId.ROPSTEN]: '',
  [ChainId.BSC]: '',
  [ChainId.EWC]: '',
}

export const EWD_DISTRIBUTOR_ADDRESS: AddressMap = {
  [ChainId.ROPSTEN]: '',
  [ChainId.BSC]: '',
  [ChainId.EWC]: '0xb8902eff63a3c3c70feC9cEdFd68098599Ad13B3',
}

export const EWD_VAULT_ADDRESS: AddressMap = {
  [ChainId.EWC]: '',
}

export const EWD_EWT_PAIR: AddressMap = {
  [ChainId.EWC]: '0xA8EAe4378dFE66bF3C174d5aC93c2b38F6bB4cbc',
}

export const EWT_DAI_PAIR: AddressMap = {
  [ChainId.EWC]: '0xecc6AcBAB3D9A806DD8aBD6cF983D118cD7a6d7C',
}

export const ARCHER_ROUTER_ADDRESS: AddressMap = {
  [ChainId.MAINNET]: '',
}

export const MINICHEF_ADDRESS: AddressMap = {
  [ChainId.MATIC]: '',
}

export const MASTERCHEF_V2_ADDRESS: AddressMap = {
  [ChainId.EWC]: '',
}

export const ZAPPER_ADDRESS: AddressMap = {
  [ChainId.MAINNET]: '0xcff6eF0B9916682B37D80c19cFF8949bc1886bC2',
  [ChainId.ROPSTEN]: '0xcff6eF0B9916682B37D80c19cFF8949bc1886bC2',
}

// TODO: specify merkle distributor for mainnet
export const MERKLE_DISTRIBUTOR_ADDRESS: AddressMap = {
  [ChainId.EWC]: '0x090D4613473dEE047c3f2706764f49E0821D256e',

}

export const MULTICALL2_ADDRESS: AddressMap = {
  [ChainId.EWC]: '0xAa130ff3abe4698138ED46186a5902BED7C68DE5',
}

export const WETH9: AddressMap = {
  [ChainId.MAINNET]: '',
  [ChainId.ROPSTEN]: '',
  [ChainId.RINKEBY]: '',
  [ChainId.GÖRLI]: '',
  [ChainId.KOVAN]: '',
  [ChainId.ARBITRUM]: '',
  [ChainId.ARBITRUM_TESTNET]: '',
  [ChainId.CELO]: '',
  [ChainId.FANTOM]: '',
  [ChainId.FANTOM_TESTNET]: '',
  [ChainId.MATIC]: '',
  [ChainId.MATIC_TESTNET]: '',
  [ChainId.XDAI]: '',
  [ChainId.BSC]: '',
  [ChainId.BSC_TESTNET]: '',
  [ChainId.MOONBEAM_TESTNET]: '',
  [ChainId.EWC]: '0x6b3bd0478DF0eC4984b168Db0E12A539Cc0c83cd',
  [ChainId.AVALANCHE]: '',
  [ChainId.AVALANCHE_TESTNET]: '',
  [ChainId.HECO]: '',
  [ChainId.HECO_TESTNET]: '',
  [ChainId.HARMONY]: '',
  [ChainId.HARMONY_TESTNET]: '',
  [ChainId.OKEX]: '',
  [ChainId.OKEX_TESTNET]: '',
}

export const WNATIVE: AddressMap = {
  [ChainId.MAINNET]: '',
  [ChainId.ROPSTEN]: '',
  [ChainId.RINKEBY]: '',
  [ChainId.GÖRLI]: '',
  [ChainId.KOVAN]: '',
  [ChainId.ARBITRUM]: '',
  [ChainId.ARBITRUM_TESTNET]: '',
  [ChainId.CELO]: '',
  [ChainId.FANTOM]: '',
  [ChainId.FANTOM_TESTNET]: '',
  [ChainId.MATIC]: '',
  [ChainId.MATIC_TESTNET]: '',
  [ChainId.XDAI]: '',
  [ChainId.BSC]: '',
  [ChainId.BSC_TESTNET]: '',
  [ChainId.MOONBEAM_TESTNET]: '',
  [ChainId.EWC]: '0x6b3bd0478DF0eC4984b168Db0E12A539Cc0c83cd',
  [ChainId.AVALANCHE]: '',
  [ChainId.AVALANCHE_TESTNET]: '',
  [ChainId.HECO]: '',
  [ChainId.HECO_TESTNET]: '',
  [ChainId.HARMONY]: '',
  [ChainId.HARMONY_TESTNET]: '',
  [ChainId.OKEX]: '',
  [ChainId.OKEX_TESTNET]: '',
}
