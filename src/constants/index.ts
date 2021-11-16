import { BigNumber } from '@ethersproject/bignumber'
import { ChainId, JSBI, Percent, Token, WETH } from '@uniswap/sdk'
import { AbstractConnector } from '@web3-react/abstract-connector'

import { injected, walletconnect, NETWORK_CHAIN_ID } from '../connectors'

export const POOL_DENY = ['0']

export const ROUTER_ADDRESSES: { [key: number]: string } = {
  [ChainId.MAINNET]: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
  [ChainId.VOLTA]: '0xbD30A7B53a75dBbA53f4f15af2650bB67A4B3665',
  [ChainId.EWC]: '0x3b932c3f73A9Eb6836Cd31145F2D47561e21DeCB'
}

export const ROUTER_ADDRESS = ROUTER_ADDRESSES[NETWORK_CHAIN_ID]

export const ORCHESTRATOR_ADDRESS: { [chainId in ChainId]?: string } = {
  [ChainId.EWC]: '0xe442F3dCbB869F63593d46A4E3304966e73eb19B',
  [ChainId.VOLTA]: '0x199c01398712BFc08Da64c02f9478981ad4c9875'
}

export const CHEF_ADDRESS: { [chainId in ChainId]?: string } = {
  [ChainId.EWC]: '0xD323586fB6b6E33cb0a7309c131811FaAfeE737B',
  [ChainId.VOLTA]: '0x12568E8Bb2b4B6beC9A7574c816A9367fC2c5e4B'
}

export const SUSU_ADDRESS: { [chainId in ChainId]?: string } = {
  [ChainId.EWC]: '0x9cd9CAECDC816C3E7123A4F130A91A684D01f4Dc',
  [ChainId.VOLTA]: '0xDC5b69374207a18e75F7cdCf5176CA63911e690d'
}

export const EWD_ADDRESS: { [chainId in ChainId]?: string } = {
  [ChainId.EWC]: '0x16e13C4cCcC031a0D7BAa34bcB39Aaf65b3C1891',
  [ChainId.VOLTA]: '0x16e13C4cCcC031a0D7BAa34bcB39Aaf65b3C1891'
}

export const MAGIC_ADDRESS: { [chainId in ChainId]?: string } = {
  [ChainId.EWC]: '0x4c0e53b1D27799B1aFA164ED6c537bF897D17ab8',
  [ChainId.VOLTA]: '0x88593a3A2589AdD65B1A6c9a35E57868870B9b65'
}

export const PARTY_ADDRESS: { [chainId in ChainId]?: string } = {
  [ChainId.EWC]: '0x1C41d2223dc95605fc4395294e65f170A4Fb1b40',
  [ChainId.VOLTA]: '0x1369eA55a479CC2A334ACa55e250DC5161677442'
}

export const TIMELOCK_ADDRESS: { [chainId in ChainId]?: string } = {
  [ChainId.EWC]: '',
  [ChainId.VOLTA]: ''
}

export const QUERY_ADDRESS: { [chainId in ChainId]?: string } = {
  [ChainId.EWC]: '0x2Bd6B960911dF27AAc4F88Be7b0388c4Bd3d51D9', // old one in case emergency '0x9176f114b0C0CE7662070Ac11808287551eFFC8a',
  [ChainId.VOLTA]: '0x85b3B307Cc88b23808844A61d98E244894523721'
}

export const STAKING_GAME_ADDRESS: { [chainId in ChainId]?: string } = {
  [ChainId.EWC]: '0xd171B471043f1fF5C5958D5888b4aF33dAcf0f59',
  [ChainId.VOLTA]: '0x9394c0f30b0B837BEd005A1C95bB0B317825dE80'
}

export const STAKING_GAME_QUERY_ADDRESS: { [chainId in ChainId]?: string } = {
  [ChainId.EWC]: '0xCA069e97eAF742eafB59419999fC309FCBbEAeA6',
  [ChainId.VOLTA]: '0x155E41922430448ce35C398b88d80Be49CA90868'
}

export const COLLECTION_S1_ADDRESS: { [chainId in ChainId]?: string } = {
  [ChainId.EWC]: '0xF88735fe03B6D3A8F3cA7eDa166d2E71Dd54452a',
  [ChainId.VOLTA]: '0x1121D93708cb7E9EE65723efE2a8F115B09947Cc'
}

export type MiningConstants = {
  startBlock: BigNumber
  earlyEndBlock: BigNumber
  rewardEarlyPerBlock: BigNumber
  rewardPerBlock: BigNumber
  rewardLatePerBlock: BigNumber
  targetSupply: BigNumber
}

export const MINING_CONSTANTS: { [chainId in ChainId]?: MiningConstants } = {
  [ChainId.VOLTA]: {
    startBlock: BigNumber.from('11343305'),
    earlyEndBlock: BigNumber.from('11343315'),
    rewardEarlyPerBlock: BigNumber.from('50000000000000000000'),
    rewardPerBlock: BigNumber.from('6000000000000000000'),
    rewardLatePerBlock: BigNumber.from('317100000000000000'),
    targetSupply: BigNumber.from('100000000000000000000000000')
  },
  [ChainId.EWC]: {
    startBlock: BigNumber.from('11443127'),
    earlyEndBlock: BigNumber.from('11961527'),
    rewardEarlyPerBlock: BigNumber.from('40000000000000000000'),
    rewardPerBlock: BigNumber.from('6500000000000000000'),
    rewardLatePerBlock: BigNumber.from('158500000000000000'),
    targetSupply: BigNumber.from('100000000000000000000000000')
  }
}

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

export { PRELOADED_PROPOSALS } from './proposals'

// a list of tokens by chain
type ChainTokenList = {
  readonly [chainId in ChainId]: Token[]
}

//export const fDAI = new Token(ChainId.EWC, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18, 'eDAI', 'Energy Web Bridged DAI')
//export const eDAI = new Token(ChainId.VOLTA, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18, 'fDAI', 'Funny Dai')

export const DAI = new Token(ChainId.MAINNET, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18, 'DAI', 'Dai Stablecoin')
export const USDC = new Token(ChainId.MAINNET, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6, 'USDC', 'USD//C')
export const USDT = new Token(ChainId.MAINNET, '0xdAC17F958D2ee523a2206206994597C13D831ec7', 6, 'USDT', 'Tether USD')
export const COMP = new Token(ChainId.MAINNET, '0xc00e94Cb662C3520282E6f5717214004A7f26888', 18, 'COMP', 'Compound')
export const MKR = new Token(ChainId.MAINNET, '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2', 18, 'MKR', 'Maker')
export const AMPL = new Token(ChainId.MAINNET, '0xD46bA6D942050d489DBd938a2C909A5d5039A161', 9, 'AMPL', 'Ampleforth')
export const WBTC = new Token(ChainId.MAINNET, '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', 8, 'WBTC', 'Wrapped BTC')

// Block time here is slightly higher (~1s) than average in order to avoid ongoing proposals past the displayed time
export const AVERAGE_BLOCK_TIME_IN_SECS = 6
export const PROPOSAL_LENGTH_IN_BLOCKS = 40_320
export const PROPOSAL_LENGTH_IN_SECS = AVERAGE_BLOCK_TIME_IN_SECS * PROPOSAL_LENGTH_IN_BLOCKS

export const GOVERNANCE_ADDRESS = '0x5e4be8Bc9637f0EAA1A755019e06A68ce081D58F'

//export const TIMELOCK_ADDRESS = '0x1a9C8182C09F50C8318d769245beA52c32BE35BC'

const UNI_ADDRESS = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984'
export const UNI: { [chainId in ChainId]: Token } = {
  [ChainId.EWC]: new Token(ChainId.VOLTA, '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984', 18, 'UNI', 'Uniswap'),
  [ChainId.VOLTA]: new Token(ChainId.EWC, '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984', 18, 'UNI', 'Uniswap'),
  [ChainId.MAINNET]: new Token(ChainId.MAINNET, UNI_ADDRESS, 18, 'UNI', 'Uniswap'),
  [ChainId.RINKEBY]: new Token(ChainId.RINKEBY, UNI_ADDRESS, 18, 'UNI', 'Uniswap'),
  [ChainId.ROPSTEN]: new Token(ChainId.ROPSTEN, UNI_ADDRESS, 18, 'UNI', 'Uniswap'),
  [ChainId.GÖRLI]: new Token(ChainId.GÖRLI, UNI_ADDRESS, 18, 'UNI', 'Uniswap'),
  [ChainId.KOVAN]: new Token(ChainId.KOVAN, UNI_ADDRESS, 18, 'UNI', 'Uniswap'),
  [ChainId.BSC]: new Token(ChainId.VOLTA, '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984', 18, 'UNI', 'Uniswap')
}

export const SUSU: { [chainId in ChainId]: Token } = {
  [ChainId.VOLTA]: new Token(ChainId.VOLTA, SUSU_ADDRESS[ChainId.VOLTA] as string, 18, 'SUSU', 'Susu Token'),
  [ChainId.EWC]: new Token(ChainId.EWC, SUSU_ADDRESS[ChainId.EWC] as string, 18, 'SUSU', 'Susu Token'),
  [ChainId.MAINNET]: new Token(ChainId.MAINNET, UNI_ADDRESS, 18, 'SUSU', 'Susu Token'),
  [ChainId.RINKEBY]: new Token(ChainId.RINKEBY, UNI_ADDRESS, 18, 'SUSU', 'Susu Token'),
  [ChainId.ROPSTEN]: new Token(ChainId.ROPSTEN, UNI_ADDRESS, 18, 'SUSU', 'Susu Token'),
  [ChainId.GÖRLI]: new Token(ChainId.GÖRLI, UNI_ADDRESS, 18, 'SUSU', 'Susu Token'),
  [ChainId.KOVAN]: new Token(ChainId.KOVAN, UNI_ADDRESS, 18, 'SUSU', 'Susu Token'),
  [ChainId.BSC]: new Token(ChainId.KOVAN, UNI_ADDRESS, 18, 'SUSU', 'Susu Token')
}

export const COMMON_CONTRACT_NAMES: { [address: string]: string } = {
  [UNI_ADDRESS]: 'SUSU',
  [GOVERNANCE_ADDRESS]: 'Governance',
  ['0x1a9C8182C09F50C8318d769245beA52c32BE35BC']: 'Timelock'
}

// TODO: specify merkle distributor for mainnet
export const MERKLE_DISTRIBUTOR_ADDRESS: { [chainId in ChainId]?: string } = {
  [ChainId.MAINNET]: '0x090D4613473dEE047c3f2706764f49E0821D256e',
  [ChainId.VOLTA]: '0x090D4613473dEE047c3f2706764f49E0821D256e',
  [ChainId.EWC]: '0x090D4613473dEE047c3f2706764f49E0821D256e'
}

const WETH_ONLY: ChainTokenList = {
  [ChainId.MAINNET]: [WETH[ChainId.MAINNET]],
  [ChainId.ROPSTEN]: [WETH[ChainId.ROPSTEN]],
  [ChainId.RINKEBY]: [WETH[ChainId.RINKEBY]],
  [ChainId.GÖRLI]: [WETH[ChainId.GÖRLI]],
  [ChainId.KOVAN]: [WETH[ChainId.KOVAN]],
  [ChainId.EWC]: [WETH[ChainId.EWC]],
  [ChainId.VOLTA]: [WETH[ChainId.VOLTA]],
  [ChainId.BSC]: [WETH[ChainId.BSC]]
}

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], DAI, USDC, USDT, COMP, MKR, WBTC],
  [ChainId.EWC]: [...WETH_ONLY[ChainId.EWC]],
  [ChainId.VOLTA]: [...WETH_ONLY[ChainId.VOLTA]]
}

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */
export const CUSTOM_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
  [ChainId.MAINNET]: {
    [AMPL.address]: [DAI, WETH[ChainId.MAINNET]]
  }
}

// used for display in the default list when adding liquidity
export const SUGGESTED_BASES: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], DAI, USDC, USDT, WBTC],
  [ChainId.EWC]: [...WETH_ONLY[ChainId.EWC]],
  [ChainId.VOLTA]: [...WETH_ONLY[ChainId.VOLTA]]
}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.MAINNET]: [...WETH_ONLY[ChainId.MAINNET], DAI, USDC, USDT, WBTC],
  [ChainId.EWC]: [...WETH_ONLY[ChainId.EWC]],
  [ChainId.VOLTA]: [...WETH_ONLY[ChainId.VOLTA]]
}

export const PINNED_PAIRS: { readonly [chainId in ChainId]?: [Token, Token][] } = {
  [ChainId.MAINNET]: [
    [
      new Token(ChainId.MAINNET, '0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643', 8, 'cDAI', 'Compound Dai'),
      new Token(ChainId.MAINNET, '0x39AA39c021dfbaE8faC545936693aC917d5E7563', 8, 'cUSDC', 'Compound USD Coin')
    ],
    [USDC, USDT],
    [DAI, USDT]
  ]
}

export interface WalletInfo {
  connector?: AbstractConnector
  name: string
  iconName: string
  description: string
  href: string | null
  color: string
  primary?: true
  mobile?: true
  mobileOnly?: true
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  INJECTED: {
    connector: injected,
    name: 'Injected',
    iconName: 'arrow-right.svg',
    description: 'Injected web3 provider.',
    href: null,
    color: '#010101',
    primary: true
  },
  METAMASK: {
    connector: injected,
    name: 'MetaMask',
    iconName: 'metamask.png',
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D'
  },
  WALLET_CONNECT: {
    connector: walletconnect,
    name: 'WalletConnect',
    iconName: 'walletConnectIcon.svg',
    description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
    href: null,
    color: '#4196FC',
    mobile: true
  }
  /*
  WALLET_LINK: {
    connector: walletlink,
    name: 'Coinbase Wallet',
    iconName: 'coinbaseWalletIcon.svg',
    description: 'Use Coinbase Wallet app on mobile device',
    href: null,
    color: '#315CF5'
  },
  COINBASE_LINK: {
    name: 'Open in Coinbase Wallet',
    iconName: 'coinbaseWalletIcon.svg',
    description: 'Open in Coinbase Wallet app.',
    href: 'https://go.cb-w.com/mtUDhEZPy1',
    color: '#315CF5',
    mobile: true,
    mobileOnly: true
  },
  FORTMATIC: {
    connector: fortmatic,
    name: 'Fortmatic',
    iconName: 'fortmaticIcon.png',
    description: 'Login using Fortmatic hosted wallet',
    href: null,
    color: '#6748FF',
    mobile: true
  },
  Portis: {
    connector: portis,
    name: 'Portis',
    iconName: 'portisIcon.png',
    description: 'Login using Portis hosted wallet',
    href: null,
    color: '#4A6C9B',
    mobile: true
  }
  */
}

export const NetworkContextName = 'NETWORK'

// default allowed slippage, in bips
export const INITIAL_ALLOWED_SLIPPAGE = 50
// 20 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20

// used for rewards deadlines
export const BIG_INT_SECONDS_IN_WEEK = JSBI.BigInt(60 * 60 * 24 * 7)

export const BIG_INT_ZERO = JSBI.BigInt(0)

// one basis point
export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000))
export const BIPS_BASE = JSBI.BigInt(10000)
// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(JSBI.BigInt(100), BIPS_BASE) // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(JSBI.BigInt(300), BIPS_BASE) // 3%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(JSBI.BigInt(500), BIPS_BASE) // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(JSBI.BigInt(1000), BIPS_BASE) // 10%
// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(JSBI.BigInt(1500), BIPS_BASE) // 15%

// used to ensure the user doesn't send so much ETH so they end up with <.01
export const MIN_ETH: JSBI = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)) // .01 ETH
export const BETTER_TRADE_LESS_HOPS_THRESHOLD = new Percent(JSBI.BigInt(50), JSBI.BigInt(10000))

export const ZERO_PERCENT = new Percent('0')
export const ONE_HUNDRED_PERCENT = new Percent('1')

// SDN OFAC addresses
export const BLOCKED_ADDRESSES: string[] = [
  '0x7F367cC41522cE07553e823bf3be79A889DEbe1B',
  '0xd882cFc20F52f2599D84b8e8D58C7FB62cfE344b',
  '0x901bb9583b24D97e995513C6778dc6888AB6870e',
  '0xA7e5d5A720f06526557c513402f2e6B5fA20b008',
  '0x8576aCC5C05D6Ce88f4e49bf65BdF0C62F91353C'
]
