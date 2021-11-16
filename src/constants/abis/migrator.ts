import { ChainId } from '@uniswap/sdk'
import MIGRATOR_ABI from './migrator.json'

const getMigratorAddress = (chainId: ChainId) => {
  switch (chainId) {
    case ChainId.VOLTA:
      return '0xF53CbCBCc01d5Eee8555DFa89cc188A89535A8A0'
    case ChainId.EWC:
      return ''
    default:
      return '0x16D4F26C15f3658ec65B1126ff27DD3dF2a2996b'
  }
}

export { getMigratorAddress, MIGRATOR_ABI }
