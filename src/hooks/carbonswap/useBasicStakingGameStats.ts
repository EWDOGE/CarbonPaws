import { useCallback, useEffect, useState } from 'react'
import { useActiveWeb3React } from 'hooks'

//import { exchange, masterchef } from '../../apollo/client'
//import { getAverageBlockTime } from '../../apollo/getAverageBlockTime'
//import { liquidityPositionSubsetQuery, pairSubsetQuery, poolsQuery } from '../../apollo/queries'

//import sushiData from '@sushiswap/sushi-data'
import _ from 'lodash'

import { useStakingGameQueryContract } from '../useContract'
//import { BigNumber } from '@ethersproject/bignumber'
//import Fraction from '../../constants/Fraction'

import { MINING_CONSTANTS, POOL_DENY, STAKING_GAME_ADDRESS, ZERO_ADDRESS } from '../../constants'
import { BigNumber } from '@ethersproject/bignumber'
import { ChainId, Fraction } from '@uniswap/sdk'
import { useBlockNumber } from 'state/application/hooks'

/**
 * - successful rug pull -> VIP
- failed rug pull -> potato peeler
- honorable decision (help frog) -> wood sourcer
- deplorable decision (calculator) -> DJ
- ride to nowhere (take ride) -> valet
- blown away (quixotic) -> entertainer
- bewitched -> firestarter
- saved (spell failed) -> grillmaster

{
  1: {
    1: {
      1: Story.rugPullSuccess,
      2: Story.rugPullFailure
    },
    2: {
      1: Story.acceptHelp,
      2: Story.rejectHelp
    }
  },
  2: {
    1: {
      1: Story.acceptRide,
      2: Story.rejectRide
    },
    2: {
      1: Story.spellSuccess,
      2: Story.spellFailure
    }
  }
}
 */

// byte32 role definitions to choice sequences
export const roleToChoice = {
  '0x46700b4d40ac5c35af2c22dda2787a91eb567b06c924a8fb8ae9a05b20c08c21': '000', //000
  '0x525876128d9eb0ad1b9e0d64c9c51b1cd33790861c401ad2e3df0f670ce6a2a4': '111', //111
  '0xa80034bdbb8de39fce520a04fa6876dfa52ef6776d880d540d3ad0887abb2032': '112', //112
  '0x2cfda879dcf534565d413e4bc65be1b6443383eb23288610914a2e85c33e162d': '121', //121
  '0xbf528ce5e535e2cf241dc944b153d5925ab2cdd488c386e326716b6a8ecf751a': '122', //122
  '0xdf92d62175d67607cc8aab61268e34e39c3407c7a4b2b2b172f05931f43d4473': '211', //211
  '0xcfeb0db821474afb76aa0658ea10c92266529072ed43958d6e2fa8274443b0f4': '212', //212
  '0x0073d82a0d9fd31516bcedd1585b7ad7fd372b24932440dfa5bc139ff61f78c1': '221', //221
  '0x4ae0d4ae6fc2f72344802e3b90dd1aaed32edfd5c27bb4e65517656e5ccac4c0': '222' //222
}

// adam here check
export const choiceToName = {
  '000': '???', //000 - this is not stowaway actually!! maybe the player did some steps but never finished the game and bribed
  '111': 'vip', //111
  '112': 'potato peeler', //112
  '121': 'wood sourcer', //121
  '122': 'dj', //122
  '211': 'valet', //211
  '212': 'entertainer', //212
  '221': 'firestarter', //221
  '222': 'grillmaster' //222
}

export type UserProgress = {
  choice1: BigNumber
  choice2: BigNumber
  choice3: BigNumber
  ready: boolean
  participated: boolean
}

/*
uint256 choice1;
uint256 choice2;
uint256 choice3;
bool ready;
bool participated;
uint256 numPlayers;
uint256 totalChoicesMade;
bytes32 encodedChoice;
 */
export type UserStats = {
  choice1: BigNumber
  choice2: BigNumber
  choice3: BigNumber
  ready: boolean
  participated: boolean
  numPlayers: BigNumber
  totalChoicesMade: BigNumber
  encodedChoice: string
}

export type BasicStats = {
  roles: string[]
  roleCounts: BigNumber[]
  choice: string
  invited: boolean
  participated: boolean
  didBribeGuard: boolean
  choice1: BigNumber
  choice2: BigNumber
  choice3: BigNumber
  ready: boolean
  numPlayers: BigNumber
  totalChoicesMade: BigNumber
  encodedChoice: string
}

const useBasicStakingGameStats = () => {
  const [stats, setStats] = useState<BasicStats | undefined>()
  const { account, chainId } = useActiveWeb3React()
  const stakingGameQueryContract = useStakingGameQueryContract()

  const bnum = useBlockNumber()

  const stakingGameContractAddress = STAKING_GAME_ADDRESS[chainId ?? ChainId.EWC]

  const fetchAllStats = useCallback(async () => {
    if (!account) {
      return
    }

    const query = await stakingGameQueryContract?.query(stakingGameContractAddress, account)
    const userProgress: UserStats = query[0]

    // encoded role selectors
    const roles: string[] = query[1]

    // how many of these roles in total
    const roleCounts: BigNumber[] = query[2]

    // sequence of choices
    const choice = userProgress.choice1.toString() + userProgress.choice2.toString() + userProgress.choice3.toString()

    // didnt complete game but bribed guard
    const didBribeGuard = userProgress.choice3.eq(0) && userProgress.participated

    // invited and allowerd to enter, otherwise didn't finish game
    const invited =
      userProgress.ready && userProgress.choice1.gt('0') && userProgress.choice2.gt('0') && userProgress.choice3.gt('0')
    const participated = userProgress.participated

    console.log(userProgress, roles, roleCounts, userProgress, choice, didBribeGuard, invited, participated)

    //console.log('yolo length', results[3].length)
    //console.log({lpToken, lpTotalSupply, lpChefSupply, lpBalance, pending, rewarder, allocPoint, lastRewardBlock, accRewardPerShare, deposit, rewardDebt})

    const retval = {
      ...userProgress,
      roles,
      roleCounts,
      choice,
      invited,
      participated,
      didBribeGuard
    }

    setStats(retval)
  }, [account, stakingGameContractAddress, chainId])

  useEffect(() => {
    fetchAllStats()
  }, [fetchAllStats, bnum, account, chainId])

  return stats
}

export default useBasicStakingGameStats
