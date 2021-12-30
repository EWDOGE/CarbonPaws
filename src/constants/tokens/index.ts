import { ChainId, Ether, Token, WETH9, WNATIVE } from '../../sdk'

import { SupportedChainId } from '../chains'

// Default Ethereum chain tokens
export const EWC: { [key: string]: Token } = {
  DAI: new Token(ChainId.EWC, '0x3862F260e94904aaAe628DdF427b1F662652BBD2', 18, 'DAI', 'Dai Stablecoin'),
  EWD: new Token(ChainId.EWC, '0x16e13C4cCcC031a0D7BAa34bcB39Aaf65b3C1891', 18, 'EWD', 'CarbonPaws Token'),
  WBCT: new Token(ChainId.EWC, '0x62250f0b6a9923a19412469ad09f37a2aa367eda', 18, 'WBCT', 'Toucan Protocol'),
}

export const DAI = new Token(ChainId.EWC, '0x16e13C4cCcC031a0D7BAa34bcB39Aaf65b3C1891', 18, 'DAI', 'Dai')

type ChainTokenMap = {
  readonly [chainId in ChainId]?: Token
}

export const EWD_ADDRESS = {
  [ChainId.EWC]: '0x16e13C4cCcC031a0D7BAa34bcB39Aaf65b3C1891',
}

export const EWD: ChainTokenMap = {
  [ChainId.EWC]: new Token(ChainId.EWC, EWD_ADDRESS[ChainId.EWC], 18, 'EWD', 'CarbonPaws Token'),
}

export const WETH9_EXTENDED: { [chainId: number]: Token } = {
  ...WETH9,
  [SupportedChainId.EWC]: new Token(ChainId.EWC, '0x6b3bd0478DF0eC4984b168Db0E12A539Cc0c83cd', 18, 'EWT', 'EnergyWeb'),
}

export class ExtendedEther extends Ether {
  public get wrapped(): Token {
    // if (this.chainId in WNATIVE) return WNATIVE[this.chainId]
    if (this.chainId in WETH9_EXTENDED) return WETH9_EXTENDED[this.chainId]

    throw new Error('Unsupported chain ID')
  }

  public static onChain(chainId: number): ExtendedEther {
    return new ExtendedEther(chainId)
  }
}
