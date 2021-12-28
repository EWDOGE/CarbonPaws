import { Token, WNATIVE } from '../Token'

import { Currency } from '../Currency'
import { NativeCurrency } from '../NativeCurrency'
import invariant from 'tiny-invariant'

export class EnergyWeb extends NativeCurrency {
  public readonly address: string
  protected constructor(chainId: number) {
    super(chainId, 18, 'EWT', 'EnergyWeb Token')
  }

  public get wrapped(): Token {
    const wnative = WNATIVE[this.chainId]
    invariant(!!wnative, 'WRAPPED')
    return wnative
  }

  private static _cache: { [chainId: number]: EnergyWeb } = {}

  public static onChain(chainId: number): EnergyWeb {
    return this._cache[chainId] ?? (this._cache[chainId] = new EnergyWeb(chainId))
  }

  public equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId
  }

  public sortsBefore(other: Token): boolean {
    return false
  }
}
