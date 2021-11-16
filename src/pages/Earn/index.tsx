import React, { useState } from 'react'
import { AutoColumn } from '../../components/Column'
import styled from 'styled-components'
import { STAKING_REWARDS_INFO, useStakingInfo } from '../../state/stake/hooks'
import { TYPE, ExternalLink } from '../../theme'
import PoolCard from '../../components/earn/PoolCard'
import { RowBetween } from '../../components/Row'
import { CardSection, DataCard, CardNoise, CardBGImage } from '../../components/earn/styled'
import { Countdown } from './Countdown'
import Loader from '../../components/Loader'
import { useActiveWeb3React } from '../../hooks'
import { JSBI } from '@uniswap/sdk'
import { BIG_INT_ZERO } from '../../constants'
import { OutlineCard } from '../../components/Card'

import { Dots } from '../Pool/styleds'

//import { useActiveWeb3React } from 'hooks'
import { formattedNum, toEth /*formattedPercent*/ } from '../../utils/sushi'
import { Card, CardHeader, Paper, Search, DoubleLogo } from './components'
import useFuse from '../../hooks/carbonswap/useFuse'
import useSortableData from '../../hooks/carbonswap/useSortableData'
import useFarms from '../../hooks/carbonswap/useFarms'

import { ChevronUp, ChevronDown } from 'react-feather'
import InputGroup from './InputGroup'

const PageWrapper = styled(AutoColumn)`
  max-width: 640px;
  width: 100%;
`

const TopSection = styled(AutoColumn)`
  max-width: 720px;
  width: 100%;
`

const PoolSection = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  column-gap: 10px;
  row-gap: 15px;
  width: 100%;
  justify-self: center;
`

const DataRow = styled(RowBetween)`
  ${({ theme }) => theme.mediaWidth.upToSmall`
flex-direction: column;
`};
`

export default function Earn() {
  const { chainId } = useActiveWeb3React()

  // staking info for connected account
  const query = useFarms()
  //console.log('yolo' , query)

  const farms = query?.farms
  const userFarms = query?.userFarms

  const options = { keys: ['symbol', 'name', 'lpToken'], threshold: 0.4 }
  const { result, search, term } = useFuse({
    data: farms && farms.length > 0 ? farms : [],
    options
  })
  const flattenSearchResults = result.map((a: { item: any }) => (a.item ? a.item : a))
  // Sorting Setup
  const { items, requestSort, sortConfig } = useSortableData(flattenSearchResults)

  return (
    <PageWrapper gap="lg" justify="center">
      <TopSection gap="md">
        <DataCard>
          <CardBGImage />
          <CardNoise />
          <CardSection>
            <AutoColumn gap="md">
              <RowBetween>
                <TYPE.white fontWeight={600}>CarbonSwap liquidity mining</TYPE.white>
              </RowBetween>
              <RowBetween>
                <TYPE.white fontSize={14}>
                  Deposit your Liquidity Provider tokens to receive SUSU, the CarbonSwap protocol governance token.
                  bnum#11443127
                </TYPE.white>
              </RowBetween>{' '}
              <ExternalLink
                style={{ color: 'white', textDecoration: 'underline' }}
                href="https://topsecret.carbonswap.exchange"
                target="_blank"
              >
                <TYPE.white fontSize={14}>Read more about SUSU</TYPE.white>
              </ExternalLink>
            </AutoColumn>
          </CardSection>
          <CardBGImage />
          <CardNoise />
        </DataCard>
      </TopSection>

      <AutoColumn gap="lg" style={{ width: '100%', maxWidth: '720px' }}>
        <DataRow style={{ alignItems: 'baseline' }}>
          {/*<Countdown exactEnd={stakingInfos?.[0]?.periodFinish} />*/}
        </DataRow>
        <Search search={search} term={term} title="Farms" />

        <PoolSection>
          {userFarms && userFarms.length > 0 && (
            <>
              <div className="pb-4">
                <div className="grid grid-cols-3 pb-4 px-4 text-sm  text-secondary">
                  <div className="flex items-center">
                    <div>Your Yields</div>
                  </div>
                  <div className="flex items-center justify-end">
                    <div>Deposited</div>
                  </div>
                  <div className="flex items-center justify-end">
                    <div>Claim</div>
                  </div>
                </div>
                <div className="flex-col space-y-2">
                  {userFarms.map((farmInner: any, i: number) => {
                    return <UserBalance key={farmInner.lpToken + '_' + i} farm={farmInner} />
                  })}
                </div>
              </div>
            </>
          )}
          {/* */}
          {/* All Farms */}

          <div className="grid grid-cols-3 pb-4 px-4 text-sm  text-secondary">
            <div
              className="flex items-center cursor-pointer hover:text-secondary"
              onClick={() => requestSort('symbol')}
            >
              <div>Farm</div>
              {sortConfig &&
                sortConfig.key === 'symbol' &&
                ((sortConfig.direction === 'ascending' && <ChevronUp size={12} />) ||
                  (sortConfig.direction === 'descending' && <ChevronDown size={12} />))}
            </div>
            <div className="hover:text-secondary cursor-pointer" onClick={() => requestSort('tvl')}>
              <div className="flex items-center justify-end">
                <div>TVL</div>
                {sortConfig &&
                  sortConfig.key === 'tvl' &&
                  ((sortConfig.direction === 'ascending' && <ChevronUp size={12} />) ||
                    (sortConfig.direction === 'descending' && <ChevronDown size={12} />))}
              </div>
            </div>
            {/*
            <div className="hover:text-secondary cursor-pointer" onClick={() => requestSort('roiPerYear')}>
              <div className="flex items-center justify-end">
                <div>APR</div>
                {sortConfig &&
                  sortConfig.key === 'roiPerYear' &&
                  ((sortConfig.direction === 'ascending' && <ChevronUp size={12} />) ||
                    (sortConfig.direction === 'descending' && <ChevronDown size={12} />))}
              </div>
            </div>
            */}
          </div>

          <div className="flex-col space-y-2">
            {items && items.length > 0 ? (
              items.map((farmInner: any, i: number) => {
                return <TokenBalance key={farmInner.lpToken + '_' + i} farm={farmInner} />
              })
            ) : (
              <>
                {term ? (
                  <div className="w-full text-center py-6">No Results.</div>
                ) : (
                  <div className="w-full text-center py-6">
                    <Dots>Fetching SUSU farms</Dots>
                  </div>
                )}
              </>
            )}
          </div>
        </PoolSection>
      </AutoColumn>
    </PageWrapper>
  )
}

const TokenBalance = ({ farm }: any) => {
  const [expand, setExpand] = useState<boolean>(false)
  return (
    <Paper className="bg-dark-800">
      <div
        className="grid grid-cols-3 py-4 px-4 cursor-pointer select-none rounded text-sm"
        onClick={() => setExpand(!expand)}
      >
        <div className="flex items-center">
          <div className="mr-4">
            <DoubleLogo a0={farm.lpToken0} a1={farm.lpToken1} size={26} margin={true} />
          </div>
          <div className="hidden sm:block">{farm && farm.lpToken0Symbol + '-' + farm.lpToken1Symbol}</div>
        </div>
        <div className="flex justify-end items-center">
          <div>
            <div className="text-right">TVL</div>
            <div className="text-secondary text-right">{toEth(farm.lpBalance)} CLP</div>
          </div>
        </div>
        <div className="flex justify-end items-center">
          <div className="text-right font-semibold text-xl">{'x' /*formattedPercent(farm.roiPerYear * 100)*/} </div>
        </div>
      </div>
      {expand && (
        <InputGroup
          pid={farm.pid.toNumber()}
          pairAddress={farm.lpToken}
          pairSymbol={farm.symbol}
          token0Address={farm.lpToken0}
          token1Address={farm.lpToken1}
        />
      )}
    </Paper>
  )
}

const UserBalance = ({ farm }: any) => {
  const [expand, setExpand] = useState<boolean>(false)
  return (
    <Paper className="bg-dark-800">
      <div
        className="grid grid-cols-3 py-4 px-4 cursor-pointer select-none rounded text-sm"
        onClick={() => setExpand(!expand)}
      >
        <div className="flex items-center">
          <div className="mr-4">
            <DoubleLogo a0={farm.lpToken0} a1={farm.lpToken1} size={26} margin={true} />
          </div>
          <div className="hidden sm:block">{farm && farm.lpToken0Symbol + '-' + farm.lpToken1Symbol}</div>
        </div>
        <div className="flex justify-end items-center">
          <div>
            <div className="text-right">{formattedNum(0 /*farm.depositedUSD*/, true)} </div>
            <div className="text-secondary text-right">{toEth(farm.deposit)} CLP</div>
          </div>
        </div>
        <div className="flex justify-end items-center">
          <div>
            <div className="text-right">{toEth(farm.pending)} </div>
            <div className="text-secondary text-right">SUSU</div>
          </div>
        </div>
      </div>
      {expand && (
        <InputGroup
          pid={farm.pid.toNumber()}
          pairAddress={farm.lpToken}
          pairSymbol={farm.symbol}
          token0Address={farm.lpToken0}
          token1Address={farm.lpToken1}
        />
      )}
    </Paper>
  )
}
