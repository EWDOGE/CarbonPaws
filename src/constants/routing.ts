import {
  EWC
} from './tokens'
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
const MIRROR_ADDITIONAL_BASES: { [tokenAddress: string]: Token[] } = {

}

// TODO: SDK should have two maps, WETH map and WNATIVE map.
const WRAPPED_NATIVE_ONLY: ChainTokenList = {
  [ChainId.EWC]: [WNATIVE[ChainId.EWC]],
}

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  [ChainId.EWC]: [
    ...WRAPPED_NATIVE_ONLY[ChainId.EWC],
    EWC.DAI,
  ],
}

export const ADDITIONAL_BASES: {
  [chainId: number]: { [tokenAddress: string]: Token[] }
} = {
  
}

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */
export const CUSTOM_BASES: {
  [chainId: number]: { [tokenAddress: string]: Token[] }
} = {

}

/**
 * Shows up in the currency select for swap and add liquidity
 */
export const COMMON_BASES: ChainTokenList = {
  [ChainId.EWC]: [
    ...WRAPPED_NATIVE_ONLY[ChainId.EWC],
    EWC.DAI,
    EWC.EWD,
  ],
}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  [ChainId.EWC]: [
    ...WRAPPED_NATIVE_ONLY[ChainId.EWC],
    EWC.DAI,
  ],
}


export const FACTORY_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.EWC]: '0x17854c8d5a41d5A89B275386E24B2F38FD0AfbDd',
}

export const ROUTER_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.EWC]: '0x3b932c3f73A9Eb6836Cd31145F2D47561e21DeCB',
}


export const INIT_CODE_HASH: string = '0x930f72af52e9f7553fd568961dff48b9d73ba993c0ddc3f637f6af07a34e97bd'
