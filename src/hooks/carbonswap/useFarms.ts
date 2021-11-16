import { useCallback, useEffect, useState } from 'react'
import { useActiveWeb3React } from 'hooks'

//import { exchange, masterchef } from '../../apollo/client'
//import { getAverageBlockTime } from '../../apollo/getAverageBlockTime'
//import { liquidityPositionSubsetQuery, pairSubsetQuery, poolsQuery } from '../../apollo/queries'

//import sushiData from '@sushiswap/sushi-data'
import _ from 'lodash'

import { useQueryContract } from '../useContract'
//import { BigNumber } from '@ethersproject/bignumber'
//import Fraction from '../../constants/Fraction'

import { MINING_CONSTANTS, POOL_DENY, ZERO_ADDRESS } from '../../constants'
import { BigNumber } from '@ethersproject/bignumber'
import { ChainId, Fraction } from '@uniswap/sdk'
import { useBlockNumber } from 'state/application/hooks'

// Todo: Rewrite in terms of web3 as opposed to subgraph
const useFarms = () => {
  const [farms, setFarms] = useState<any | undefined>()
  const { account, chainId } = useActiveWeb3React()
  const queryContract = useQueryContract()

  const bnum = useBlockNumber()

  const fetchAllFarms = useCallback(async () => {
    //console.log(queryContract)
    const results = await queryContract?.query(account ?? ZERO_ADDRESS)

    //console.log('yolo results 0', results[0].toString())
    //console.log('yolo results 1', results[1])
    //console.log('yolo results 2', results[2])

    const blocknumber = results[0]
    const totalAllocPoint = results[1]

    const xtotalSupply: BigNumber = results[2].totalSupply
    const xbalance: BigNumber = results[2].balance
    const xsbalance: BigNumber = results[2].sbalance

    const stake = {
      totalSupply: xtotalSupply,
      userBalance: xbalance,
      stakeSusuBalance: xsbalance
    }

    //console.log({xtotalSupply, xbalance, blocknumber})

    /*
    uint256 pid;
        address lpToken;
        uint256 lpTotalSupply;
        uint256 lpChefSupply;
        uint256 lpBalance;
        uint256 pending;
        address rewarder;
        uint256 allocPoint;
        uint256 lastRewardBlock;
        uint256 accRewardPerShare;
        uint256 deposit;
        int256 rewardDebt;
     */

    // ToDO: update when we approach late game
    const getRewardPerBlock = (bnum: BigNumber) => {
      const params = MINING_CONSTANTS[chainId ?? ChainId.EWC]

      if (!params || params.startBlock.gt(bnum)) {
        return BigNumber.from('0')
      }

      if (params.earlyEndBlock.gt(bnum)) {
        return params.rewardEarlyPerBlock
      }

      return params.rewardPerBlock
    }

    const getPoolYieldPerDay = (bnum: BigNumber, allocPoint: BigNumber) => {
      return getRewardPerBlock(blocknumber)
        .mul(allocPoint)
        .mul(86400 / 5)
        .div(totalAllocPoint)
    }

    //console.log('yolo length', results[3].length)
    //console.log({lpToken, lpTotalSupply, lpChefSupply, lpBalance, pending, rewarder, allocPoint, lastRewardBlock, accRewardPerShare, deposit, rewardDebt})

    const sorted = results[3]
      .filter((pool: any) => {
        return !POOL_DENY.includes(pool.pid.toString())
      })
      .map((pool: any) => {
        const {
          lpToken,
          lpTotalSupply,
          lpChefSupply,
          lpBalance,
          pending,
          rewarder,
          allocPoint,
          lastRewardBlock,
          accRewardPerShare,
          deposit,
          rewardDebt
        } = pool

        //console.log('yolo deposit', deposit.toString(), lpChefSupply.toString())
        const yld = getPoolYieldPerDay(blocknumber, allocPoint)

        //console.log('yld', yld.toNumber())

        const cheflp = lpChefSupply.toString() === '0' ? BigNumber.from('1') : lpChefSupply // this is just to preven the UI to crash when new farm is pushed out with 0

        return {
          ...pool,
          blocksPerHour: 3600 / 5,
          rewardPerBlock: pool.allocPoint
            .abs()
            .div(totalAllocPoint)
            .mul(getRewardPerBlock(blocknumber)),
          symbol: pool.lpToken0Symbol + '-' + pool.lpToken1Symbol,
          name: pool.lpToken0Name + '-' + pool.lpToken1Name,
          tvl: cheflp,
          deposited: deposit,
          yield: yld,
          personalYield: deposit.mul(yld).div(cheflp),
          sharePercent: new Fraction(deposit.toString(), cheflp.toString()),
          farmLiquidityPercent: new Fraction(cheflp, lpTotalSupply)
        }
      })
      .sort((x: { pid: BigNumber }, y: { pid: BigNumber }) => Number(x.pid) - Number(y.pid))

    if (!account || account === ZERO_ADDRESS) {
      setFarms({ farms: sorted, userFarms: [], stake })
      return
    }

    const userFarms = sorted.filter((pool: any) => {
      return pool.deposit.gt('0') || pool.pending.gt('0')
    })

    setFarms({ farms: sorted, userFarms: userFarms, stake })

    /*
    const pools = results[0]?.data.pools
    const pairAddresses = pools
      .map((pool: any) => {
        return pool.pair
      })
      .sort()
    const pairsQuery = await exchange.query({
      query: pairSubsetQuery,
      variables: { pairAddresses }
    })

    const liquidityPositions = results[1]?.data.liquidityPositions
    const pairs = pairsQuery?.data.pairs
    const averageBlockTime = results[2]
    const sushiPrice = results[3]

    const farms = pools
      .filter((pool: any) => {
        return !POOL_DENY.includes(pool.id) && pairs.find((pair: any) => pair?.id === pool.pair)
      })
      .map((pool: any) => {
        const pair = pairs.find((pair: any) => pair.id === pool.pair)
        const liquidityPosition = liquidityPositions.find(
          (liquidityPosition: any) => liquidityPosition.pair.id === pair.id
        )
        const blocksPerHour = 3600 / averageBlockTime
        const balance = Number(pool.balance / 1e18) > 0 ? Number(pool.balance / 1e18) : 0.1
        const totalSupply = pair.totalSupply > 0 ? pair.totalSupply : 0.1
        const reserveUSD = pair.reserveUSD > 0 ? pair.reserveUSD : 0.1
        const balanceUSD = (balance / Number(totalSupply)) * Number(reserveUSD)
        const rewardPerBlock = ((pool.allocPoint / pool.owner.totalAllocPoint) * pool.owner.sushiPerBlock) / 1e18
        const roiPerBlock = (rewardPerBlock * sushiPrice) / balanceUSD
        const roiPerHour = roiPerBlock * blocksPerHour
        const roiPerDay = roiPerHour * 24
        const roiPerMonth = roiPerDay * 30
        const roiPerYear = roiPerMonth * 12

        return {
          ...pool,
          symbol: pair.token0.symbol + '-' + pair.token1.symbol,
          name: pair.token0.name + ' ' + pair.token1.name,
          pid: Number(pool.id),
          pairAddress: pair.id,
          slpBalance: pool.balance,
          liquidityPair: pair,
          roiPerBlock,
          roiPerHour,
          roiPerDay,
          roiPerMonth,
          roiPerYear,
          rewardPerThousand: 1 * roiPerDay * (1000 / sushiPrice),
          tvl: liquidityPosition?.liquidityTokenBalance
            ? (pair.reserveUSD / pair.totalSupply) * liquidityPosition.liquidityTokenBalance
            : 0.1
        }
      })

    //console.log('farms:', farms)
    const sorted = _.orderBy(farms, ['pid'], ['desc'])

    const pids = sorted.map(pool => {
      return pool.pid
    })

    if (account) {
      const userFarmDetails = await boringHelperContract?.pollPools(account, pids)
      const userFarms = userFarmDetails
        .filter((farm: any) => {
          return farm.balance.gt(BigNumber.from(0)) || farm.pending.gt(BigNumber.from(0))
        })
        .map((farm: any) => {
          const pid = farm.pid.toNumber()
          const farmDetails = sorted.find((pair: any) => pair.pid === pid)
          const deposited = Fraction.from(farm.balance, BigNumber.from(10).pow(18)).toString(18)
          const pending = Fraction.from(farm.pending, BigNumber.from(10).pow(18)).toString(18)

          return {
            ...farmDetails,
            depositedLP: deposited,
            depositedUSD:
              farmDetails.slpBalance && Number(farmDetails.slpBalance / 1e18) > 0
                ? (Number(deposited) * Number(farmDetails.tvl)) / (farmDetails.slpBalance / 1e18)
                : 0,
            pendingSushi: pending
          }
        })
      setFarms({ farms: sorted, userFarms: userFarms })
      //console.log('userFarms:', userFarms)
    } else {
      setFarms({ farms: sorted, userFarms: [] })
    }
    */
  }, [account, queryContract, chainId])

  useEffect(() => {
    fetchAllFarms()
  }, [fetchAllFarms, bnum, account, chainId])

  return farms
}

export default useFarms
