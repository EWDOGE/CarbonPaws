import React, { useState } from 'react'
import styled from 'styled-components'
import { RowBetween } from '../../components/Row'
import { Dots } from '../Pool/styleds'

//import { useActiveWeb3React } from 'hooks'
import { formatBalance, formattedNum, toEth /*formattedPercent*/ } from '../../utils/sushi'
import { Card, CardHeader, Paper, Search, DoubleLogo } from './components'
import useFuse from '../../hooks/carbonswap/useFuse'
import useSortableData from '../../hooks/carbonswap/useSortableData'
import useFarms from '../../hooks/carbonswap/useFarms'

import { ChevronUp, ChevronDown, ExternalLink } from 'react-feather'
import InputGroup from './InputGroup'
import { CardBGImage, CardNoise, CardSection, DataCard, Poolz } from '../../components/earn/styled'
import { AutoColumn } from '../../components/Column'
import { TYPE } from 'theme'
import { LightCard } from '../../components/Card'
import { transparentize } from 'polished'
import { useColor } from '../../hooks/useColor'
import { ChainId, Token, TokenAmount } from '@uniswap/sdk'
import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import usePendingRewards from 'hooks/carbonswap/usePendingRewards'
import { Countdown } from 'components/Countdown'
import { useMatchMedia } from '../../theme/useMatchMedia'

export const FixedHeightRow = styled(RowBetween)`
  height: 24px;
`

export const PrimaryColoredDiv = styled.div`
  background: ${({ theme }) => theme.primary3};
`

export const SecondaryColoredDiv = styled.div`
  background: ${({ theme }) => theme.secondary2};
`
const TopSection = styled(AutoColumn)`
  max-width: 720px;
  width: 100%;
`
const PageWrapper = styled(AutoColumn)`
  max-width: 640px;
  width: 100%;
`

export const CardSection2 = styled(AutoColumn)<{ disabled?: boolean }>`
  padding: 1rem;
  z-index: 1;
  opacity: ${({ disabled }) => disabled && '0.4'};
`

export default function BentoBalances(): JSX.Element {
  const query = useFarms()

  //console.log('yolo' , query)

  const farms = query?.farms
  const userFarms = query?.userFarms

  // Search Setup
  const options = { keys: ['symbol', 'name', 'lpToken'], threshold: 0.4 }
  const { result, search, term } = useFuse({
    data: farms && farms.length > 0 ? farms : [],
    options
  })
  const flattenSearchResults = result.map((a: { item: any }) => (a.item ? a.item : a))
  // Sorting Setup
  const { items, requestSort, sortConfig } = useSortableData(flattenSearchResults)

  //let items: any[] = []

  const BackGroundInput = styled.input`
    background: ${({ theme }) => theme.primary5};
    color: ${({ theme }) => theme.text1};
    border-radius: 12px;
  `

  const isDesktopResolution = useMatchMedia('(min-width:640px)', true)

  console.log('userFarms:', userFarms)
  return (
    <div
      style={{ marginLeft: 'auto', marginRight: 'auto', maxWidth: '640px', width: '100%' }}
      className="container max-w-2xl mx-auto px-0 sm:px-4"
    >
      {isDesktopResolution && (
        <img
          className="d-none d-lg-block"
          style={{
            maxWidth: '80%',
            width: '420px',
            marginBottom: '100px',
            textAlign: 'center',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}
          id="logo"
          src={require('./../../assets/images/3.png')}
        />
      )}
      <Poolz>
        <DataCard>
          <CardBGImage />
          <CardNoise />
          <CardSection2>
            <AutoColumn gap="md">
              <RowBetween>
                <TYPE.white fontWeight={600}>CarbonSwap liquidity mining</TYPE.white>
              </RowBetween>
              <RowBetween>
                <TYPE.white fontSize={14}>
                  Deposit your CarbonSwap Liquidity Provider tokens (CLP) to receive SUSU, the CarbonSwap protocol
                  governance token. Activates at #11443127
                </TYPE.white>
              </RowBetween>{' '}
              {/*
              <ExternalLink
                style={{ color: 'white', textDecoration: 'underline' }}
                href="https://x.carbonswap.exchange"
                target="_blank"
              >
                <TYPE.white fontSize={14}>Read more about SUSU</TYPE.white>
              </ExternalLink>
               */}
            </AutoColumn>
          </CardSection2>
          <CardBGImage />
          <CardNoise />
        </DataCard>
        <Card
          className="h-full"
          header={
            <CardHeader className="flex justify-between items-center">
              <div className="flex w-full justify-between">
                <Search search={search} term={term} />
              </div>
            </CardHeader>
          }
        >
          {/* UserFarms */}

          {userFarms && userFarms.length > 0 && (
            <>
              <div className="pb-4">
                <div className="grid grid-cols-3 pb-4 px-4 text-sm text-secondary">
                  <div className="flex items-center">
                    <div>Your Yields</div>
                  </div>
                  <div className="flex items-center justify-end">
                    <div>Deposited</div>
                  </div>
                  <div className="flex items-center justify-end">
                    <div>Claimable</div>
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

          <div className="grid grid-cols-3 pb-4 px-4 text-sm text-secondary">
            <div
              className="flex items-center cursor-pointer hover:text-secondary"
              onClick={() => requestSort('symbol')}
            >
              <div>Lure</div>
              {sortConfig &&
                sortConfig.key === 'symbol' &&
                ((sortConfig.direction === 'ascending' && <ChevronUp size={12} />) ||
                  (sortConfig.direction === 'descending' && <ChevronDown size={12} />))}
            </div>
            <div className="hover:text-secondary cursor-pointer" onClick={() => requestSort('tvl')}>
              <div className="flex items-center justify-end">
                <div>Pool size</div>
                {sortConfig &&
                  sortConfig.key === 'tvl' &&
                  ((sortConfig.direction === 'ascending' && <ChevronUp size={12} />) ||
                    (sortConfig.direction === 'descending' && <ChevronDown size={12} />))}
              </div>
            </div>

            <div className="hover:text-secondary cursor-pointer" onClick={() => requestSort('yield')}>
              <div className="flex items-center justify-end">
                <div>Yield (SUSU/day)</div>
                {sortConfig &&
                  sortConfig.key === 'yield' &&
                  ((sortConfig.direction === 'ascending' && <ChevronUp size={12} />) ||
                    (sortConfig.direction === 'descending' && <ChevronDown size={12} />))}
              </div>
            </div>
            {/**/}
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
                    <Dots>Fetching SUSU lures</Dots>
                  </div>
                )}
              </>
            )}
          </div>
        </Card>
      </Poolz>
    </div>
  )
}

const clpDecimals = (lpToken: string): number => {
  //ren-ewt
  if ('0xdF43600a2d27f7d5a8481189ad56317451e8D5c0' === lpToken) {
    return 5
  }

  //ewt-usdc
  if ('0x5Cec0CcC21D2EB89a0613f6cA4b19b07c75909B0' === lpToken) {
    return 5
  }

  return 1
}

const StyledPositionCard = styled(LightCard)<{ bgColor: any }>`
  border: none;
  background: ${({ theme, bgColor }) =>
    `radial-gradient(91.85% 100% at 1.84% 0%, ${transparentize(0.8, bgColor)} 0%, ${theme.bg3} 100%) `};
  position: relative;
  overflow: hidden;
`

const TokenBalance = ({ farm }: any) => {
  const [expand, setExpand] = useState<boolean>(false)
  //const backgroundColor = getColorFromToken(new Token(chainId ?? ChainId.VOLTA, farm.lpToken0, 18))

  /*
    <StyledPositionCard bgColor={backgroundColor}>
      <CardNoise />
    */

  //console.log(farm?.lpToken0, backgroundColor)

  const clpamount = new TokenAmount(new Token(ChainId.EWC, farm.lpToken, 18, '', ''), farm.lpChefSupply)

  const yieldamount = new TokenAmount(new Token(ChainId.EWC, farm.lpToken, 18, '', ''), farm.yield)

  const [timerEnded, setTimerEnded] = useState<boolean>(false)

  return (
    <Paper>
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
            {/*<div className="text-right">Size</div>*/}
            {/* hardcode for renBTC */}
            <div className="text-right">{clpamount.toFixed(clpDecimals(farm.lpToken))} CLP</div>
            <div className="text-secondary text-right">{`${farm.farmLiquidityPercent
              .multiply(100)
              .toFixed(3)}% of total`}</div>
          </div>
        </div>
        <div className="flex justify-end items-center">
          <div className="text-right font-semibold text-xl">
            {farm.lpToken === '0x5f91643BeA88572CaBeb64d4A81154868A5C4D5A' && !timerEnded ? (
              <>
                <span>Ramping up in</span>
                <Countdown targetSec={1623787200} times={3600} onFinish={() => setTimerEnded(true)} /> hours
              </>
            ) : (
              `${yieldamount.toFixed(0)}`
            ) /*formattedPercent(farm.roiPerYear * 100)*/}
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

const UserBalance = ({ farm }: any) => {
  const [expand, setExpand] = useState<boolean>(false)
  //const pending = usePendingRewards(farm.pid.toNumber())

  const depositamount = new TokenAmount(new Token(ChainId.EWC, farm.lpToken, 18, '', ''), farm.deposit)

  const pendingamount = new TokenAmount(new Token(ChainId.EWC, farm.lpToken, 18, '', ''), farm.pending)

  const personalYield = new TokenAmount(new Token(ChainId.EWC, farm.lpToken, 18, '', ''), farm.personalYield)

  /*
  const sharePercent = new TokenAmount(
    new Token(ChainId.EWC, farm.lpToken, 18, '', ''),
    farm.sharePercent
  )
  */

  //console.log('yolo sharepecent', farm.sharePercent.toString())
  return (
    <Paper>
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
            {/*<div className="text-right">{formattedNum(farm.depositedUSD, true)} </div>*/}
            <div className="text-right">{depositamount.toSignificant(6)} CLP</div>
            <div className="text-secondary text-right">{`${farm.sharePercent.multiply(100).toFixed(4)}% share`}</div>
          </div>
        </div>
        <div className="flex justify-end items-center">
          <div>
            <div className="text-right">{`${pendingamount.toSignificant(5)} SUSU`} </div>
            <div className="text-secondary text-right">{`${personalYield.toFixed(1)}/day`}</div>
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
