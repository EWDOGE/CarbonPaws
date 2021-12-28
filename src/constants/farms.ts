import { ChainId } from '../sdk'

export type TokenInfo = {
  id: string
  name: string
  symbol: string
  decimals?: number
}

type PairInfo = {
  id: number
  token0: TokenInfo
  token1?: TokenInfo
  name?: string
  symbol?: string
}

type AddressMap = {
  [chainId: number]: {
    [address: string]: PairInfo
  }
}

export const POOLS: AddressMap = {
  [ChainId.EWC]: {
    '0xA8EAe4378dFE66bF3C174d5aC93c2b38F6bB4cbc': {
      id: 0,
      token0: {
        id: '0x16e13C4cCcC031a0D7BAa34bcB39Aaf65b3C1891',
        name: 'EnergyWeb Doge',
        symbol: 'EWD',
        decimals: 18,
      },
      token1: {
        id: '0x6b3bd0478df0ec4984b168db0e12a539cc0c83cd',
        name: 'EnergyWeb Token',
        symbol: 'EWT',
        decimals: 18,
      },
      name: 'CarbonPaws LP',
      symbol: 'SLP',
    },
    '0x16e13C4cCcC031a0D7BAa34bcB39Aaf65b3C1891': {
      id: 1,
      token0: {
        id: '0x16e13C4cCcC031a0D7BAa34bcB39Aaf65b3C1891',
        name: 'EnergyWeb Doge',
        symbol: 'EWD',
        decimals: 18,
      },
    },
    '0x6b3bd0478DF0eC4984b168Db0E12A539Cc0c83cd': {
      id: 2,
      token0: {
        id: '0x6b3bd0478DF0eC4984b168Db0E12A539Cc0c83cd',
        name: 'Wrapped EnergyWeb Token',
        symbol: 'WEWT',
        decimals: 18,
      },
    },
    '0x5C0C1CAC7bC9554c2d12a7694f82151E45640507': {
      id: 3,
      token0: {
        id: '0x16e13C4cCcC031a0D7BAa34bcB39Aaf65b3C1891',
        name: 'EnergyWeb Doge',
        symbol: 'EWD',
        decimals: 18,
      },
      token1: {
        id: '0x9cd9CAECDC816C3E7123A4F130A91A684D01f4Dc',
        name: 'SUSU',
        symbol: 'SUSU',
        decimals: 18,
      },
      name: 'CarbonPaws LP',
      symbol: 'SLP',
    },
    '0xBb261983A11895970122157c8CAd56EE488f9eb8': {
      id: 3,
      token0: {
        id: '0x16e13C4cCcC031a0D7BAa34bcB39Aaf65b3C1891',
        name: 'EnergyWeb Doge',
        symbol: 'EWD',
        decimals: 18,
      },
      token1: {
        id: '0x62250F0B6a9923a19412469ad09F37A2aA367eda',
        name: 'Toucan Protocol',
        symbol: 'WBCT',
        decimals: 18,
      },
      name: 'CarbonPaws LP',
      symbol: 'SLP',
    },
  },
}
