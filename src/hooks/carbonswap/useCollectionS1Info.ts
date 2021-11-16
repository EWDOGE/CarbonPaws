import { useCallback, useEffect, useState } from 'react'
import { useActiveWeb3React } from 'hooks'

//import { exchange, masterchef } from '../../apollo/client'
//import { getAverageBlockTime } from '../../apollo/getAverageBlockTime'
//import { liquidityPositionSubsetQuery, pairSubsetQuery, poolsQuery } from '../../apollo/queries'

//import sushiData from '@sushiswap/sushi-data'
import _ from 'lodash'

import { useS1CollectionContract, useStakingGameQueryContract } from '../useContract'
//import { BigNumber } from '@ethersproject/bignumber'
//import Fraction from '../../constants/Fraction'

import { COLLECTION_S1_ADDRESS, STAKING_GAME_ADDRESS, ZERO_ADDRESS } from '../../constants'
import { BigNumber } from '@ethersproject/bignumber'
import { ChainId } from '@uniswap/sdk'
import { useBlockNumber } from 'state/application/hooks'
import { useSingleContractMultipleData } from 'state/multicall/hooks'

export type CollectionData = {
  sortedIds: number[]
  collection: {
    name: string
    symbol: string
    decimals: number
    uri: string // contract uri
  }
  [key: number]: {
    balance: BigNumber
    totalSupply: BigNumber
    maxSupply: BigNumber
    creator: BigNumber
    claimed: boolean
    locked: boolean //whether the total supply/max supply is locked
    uri: string // token uri
  }
}

const useCollectionS1Info = () => {
  const [data, setData] = useState<CollectionData | undefined>()
  const { account, chainId } = useActiveWeb3React()
  const collection = useS1CollectionContract()

  const bnum = useBlockNumber()

  // every 5 mins
  const wakeword = bnum ? Math.round(bnum / 60) : undefined

  const ids = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] // ACTHUNG: 0 is the contract URI

  const fetchData = useCallback(async () => {
    const results = await collection?.queryBatch(account ?? '0xffffffffffffffffffffffffffffffffffffffff', ids)

    if (!results) {
      return
    }

    const collectionQuery: CollectionData = {
      sortedIds: ids,
      collection: {
        name: results[1].name,
        symbol: results[1].symbol,
        decimals: results[1].decimals,
        uri: results[1].uri
      }
    }
    results[0].map((x: any, i: number) => {
      collectionQuery[i] = {
        balance: account ? x.balance : BigNumber.from('0'),
        uri: x.uri,
        totalSupply: x.totalSupply,
        maxSupply: x.maxSupply,
        creator: x.creator,
        claimed: x.claimed,
        locked: x.locked
      }
    })

    setData(collectionQuery)
  }, [account, collection])

  useEffect(() => {
    //console.log('yolo wakey', wakeword)
    if (wakeword) {
      fetchData()
    }
  }, [fetchData, wakeword, account, chainId, collection])

  return data
}

export default useCollectionS1Info
