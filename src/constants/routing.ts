import { EWC } from './tokens'
// a list of tokens by chain
import { Currency, Token, WNATIVE, ChainId } from '../sdk'

type ChainTokenList = {
  readonly [chainId: number]: Token[]
}

type ChainCurrencyList = {
  readonly [chainId: number]: Currency[]
}

// List of all mirror's assets addresses.
// Last pulled from : https://whitelist.mirror.finance/eth/tokenlists.json
// TODO: Generate this programmatically ?
const MIRROR_ADDITIONAL_BASES: { [tokenAddress: string]: Token[] } = {}

// TODO: SDK should have two maps, WETH map and WNATIVE map.
const WRAPPED_NATIVE_ONLY: ChainTokenList = {
  [ChainId.EWC]: [WNATIVE[ChainId.EWC]],
}

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  [ChainId.EWC]: [...WRAPPED_NATIVE_ONLY[ChainId.EWC], EWC.DAI, EWC.EWD],
}

export const ADDITIONAL_BASES: {
  [chainId: number]: { [tokenAddress: string]: Token[] }
} = {}

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */
export const CUSTOM_BASES: {
  [chainId: number]: { [tokenAddress: string]: Token[] }
} = {
  [ChainId.EWC]: {
    [EWC.WBCT.address]: [EWC.EWD, EWC.DAI],
  },
}

/**
 * Shows up in the currency select for swap and add liquidity
 */
export const COMMON_BASES: ChainTokenList = {
  [ChainId.EWC]: [...WRAPPED_NATIVE_ONLY[ChainId.EWC], EWC.DAI, EWC.EWD],
}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  [ChainId.EWC]: [...WRAPPED_NATIVE_ONLY[ChainId.EWC], EWC.DAI, EWC.EWD, EWC.WBCT],
}

export const FACTORY_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.EWC]: '0x17854c8d5a41d5A89B275386E24B2F38FD0AfbDd',
  1: undefined,
  3: undefined,
  4: undefined,
  5: undefined,
  42: undefined,
  137: undefined,
  80001: undefined,
  250: undefined,
  4002: undefined,
  100: undefined,
  56: undefined,
  97: undefined,
  42161: undefined,
  79377087078960: undefined,
  1287: undefined,
  43114: undefined,
  43113: undefined,
  128: undefined,
  256: undefined,
  1666600000: undefined,
  1666700000: undefined,
  66: undefined,
  65: undefined,
  42220: undefined,
  11297108109: undefined,
  11297108099: undefined,
}

export const ROUTER_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.EWC]: '0x3b932c3f73A9Eb6836Cd31145F2D47561e21DeCB',
  1: undefined,
  3: undefined,
  4: undefined,
  5: undefined,
  42: undefined,
  137: undefined,
  80001: undefined,
  250: undefined,
  4002: undefined,
  100: undefined,
  56: undefined,
  97: undefined,
  42161: undefined,
  79377087078960: undefined,
  1287: undefined,
  43114: undefined,
  43113: undefined,
  128: undefined,
  256: undefined,
  1666600000: undefined,
  1666700000: undefined,
  66: undefined,
  65: undefined,
  42220: undefined,
  11297108109: undefined,
  11297108099: undefined,
}

export const INIT_CODE_HASH: string = '0x930f72af52e9f7553fd568961dff48b9d73ba993c0ddc3f637f6af07a34e97bd'
