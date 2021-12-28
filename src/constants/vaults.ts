import { ChainId } from '../sdk'

export type TokenInfo = {
  id: string
  name: string
  symbol: string
  decimals?: number
}

type PairInfo = {
  id: number
  lpToken: string
  token0: TokenInfo
  token1?: TokenInfo
  name?: string
  symbol?: string
}

type AddressMap = {
  [chainId: number]: {
    [id: string]: PairInfo
  }
}

export const VAULTS: AddressMap = {
  [ChainId.EWC]: {
    '0': {
      id: 0,
      lpToken: '0x16e13C4cCcC031a0D7BAa34bcB39Aaf65b3C1891',
      token0: {
        id: '0x16e13C4cCcC031a0D7BAa34bcB39Aaf65b3C1891',
        name: 'CarbonPaws',
        symbol: 'EWD',
        decimals: 18,
      },
    },
    '1': {
      id: 1,
      lpToken: '0x16e13C4cCcC031a0D7BAa34bcB39Aaf65b3C1891',
      token0: {
        id: '0x16e13C4cCcC031a0D7BAa34bcB39Aaf65b3C1891',
        name: 'CarbonPaws',
        symbol: 'EWD',
        decimals: 18,
      },
    },
    '2': {
      id: 2,
      lpToken: '0x16e13C4cCcC031a0D7BAa34bcB39Aaf65b3C1891',
      token0: {
        id: '0x16e13C4cCcC031a0D7BAa34bcB39Aaf65b3C1891',
        name: 'CarbonPaws',
        symbol: 'EWD',
        decimals: 18,
      },
    }
  },
}
