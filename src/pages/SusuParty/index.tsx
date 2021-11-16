import React, { useContext, useState } from 'react'
import styled, { ThemeContext } from 'styled-components'

//import { WrapperNoPadding } from '../../components/swap/styleds'
//import { useDarkModeManager } from '../../state/user/hooks'
import { BodyWrapper } from '../AppBody'
import SaaveHeader from './SusuBarHeader'
import { Wrapper } from '../../components/swap/styleds'

import SushiDepositPanel from './SushiDepositPanel'
import XSushiWithdrawlPanel from './XSusuWithdrawalPanel'

import { CardSection, DataCard } from '../../components/earn/styled'
import { RowBetween, RowFixed } from '../../components/Row'
import { AutoColumn } from '../../components/Column'
//import { TYPE, ExternalLink } from '../../theme'
import { TYPE } from '../../theme'
import { transparentize } from 'polished'
import useFarms from 'hooks/carbonswap/useFarms'
import QuestionHelper from 'components/QuestionHelper'
import FormattedPriceImpact from 'components/swap/FormattedPriceImpact'
import TradePrice from 'components/swap/TradePrice'
import { ChainId, Fraction, Price, Token, TokenAmount } from '@uniswap/sdk'

import { useActiveWeb3React } from '../../hooks'
import { PARTY_ADDRESS, SUSU_ADDRESS } from '../../constants'
import StakeAmount from 'components/Stake/StakeAmount'
import { useMatchMedia } from '../../theme/useMatchMedia'

const PageWrapper = styled(AutoColumn)`
  max-width: 650px;
  width: 100%;
  padding-bottom: 50px;
`
const AdvancedDetailsFooter = styled.div<{ show: boolean }>`
  position: relative;
  padding-top: calc(16px + 2rem);
  padding-bottom: 16px;
  margin-top: -2rem;
  width: 100%;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  color: ${({ theme }) => theme.text2};
  background-color: ${({ theme }) => theme.advancedBG};
  z-index: 0;

  transform: ${({ show }) => (show ? 'translateY(0%)' : 'translateY(-100%)')};
  transition: transform 300ms ease-in-out;
`
const ZAppBody = styled(BodyWrapper)`
  z-index: 1;
`

export default function Saave() {
  const theme = useContext(ThemeContext)
  const { chainId, account } = useActiveWeb3React()
  //const darkMode = useDarkModeManager()

  const [showInverted, setShowInverted] = useState(false)
  const [showInToken, setShowInToken] = useState(false)

  const query = useFarms()
  const stake = query?.stake

  const xSUSU = new Token(
    chainId ?? ChainId.EWC,
    PARTY_ADDRESS[chainId ?? ChainId.EWC] as string,
    18,
    'xSUSU',
    'Susu Party'
  )
  const SUSU = new Token(
    chainId ?? ChainId.EWC,
    SUSU_ADDRESS[chainId ?? ChainId.EWC] as string,
    18,
    'SUSU',
    'Susu Token'
  )

  let price: Price | undefined
  let totsup, sbalance, ubalance: TokenAmount | undefined
  let ushare: Fraction | undefined
  if (stake) {
    price = new Price(xSUSU, SUSU, stake.totalSupply.toString(), stake.stakeSusuBalance.toString())

    totsup = new TokenAmount(xSUSU, stake.totalSupply)

    sbalance = new TokenAmount(SUSU, stake.stakeSusuBalance)

    ubalance = new TokenAmount(xSUSU, stake.userBalance)

    ushare = new Fraction(stake.userBalance, stake.totalSupply)
  }

  const isDesktopResolution = useMatchMedia('(min-width:640px)', true)

  //console.log('yolo price', price)

  return (
    <>
      <PageWrapper>
        {isDesktopResolution && (
          <img
            className="d-none d-lg-block"
            style={{
              maxWidth: '80%',
              width: '420px',
              marginBottom: '60px',
              textAlign: 'center',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}
            id="logo"
            src={require('./../../assets/images/3.png')}
          />
        )}
        <ZAppBody>
          <CardSection>
            <AutoColumn gap="md">
              <RowBetween>
                <TYPE.white fontWeight={600} color={theme.text1}>
                  SusuParty: Make your SUSU work for you
                </TYPE.white>
              </RowBetween>
              <RowBetween>
                <div>
                  <TYPE.white fontSize={14} color={theme.text2} style={{ paddingBottom: '10px' }}>
                    {`Stake your SUSU into xSUSU. No impermanent loss, no loss of governance rights. Continuously compounding.`}
                  </TYPE.white>
                  <TYPE.white fontSize={14} color={theme.text2} style={{ paddingBottom: '10px' }}>
                    {`xSUSU automatically earn fees (0.05% of all swaps) proportional to your share of the SusuParty. These fees get distributed for the stakers at least once per day. You harvest this automatically when you withdraw.`}
                  </TYPE.white>
                </div>
              </RowBetween>
              {/*
              <ExternalLink
                style={{ color: 'white', textDecoration: 'underline' }}
                target="_blank"
                href="https://analytics.sushi.com/bar"
              >
                <TYPE.white fontSize={14} color={theme.text1}>
                  View SushiBar Stats <span style={{ fontSize: '11px' }}>↗</span>
                </TYPE.white>
              </ExternalLink>
              {account && (
                <ExternalLink
                  style={{ color: 'white', textDecoration: 'underline' }}
                  target="_blank"
                  href={'http://analytics.sushi.com/users/' + account}
                >
                  <TYPE.white fontSize={14} color={theme.text1}>
                    View your SushiBar Portfolio <span style={{ fontSize: '11px' }}>↗</span>
                  </TYPE.white>
                </ExternalLink>
              )}
              */}
            </AutoColumn>
          </CardSection>
          <SaaveHeader />
          <Wrapper id="swap-page">
            <AutoColumn style={{ paddingBottom: '10px' }}>
              <SushiDepositPanel
                label={''}
                disableCurrencySelect={true}
                customBalanceText={'Available to deposit: '}
                id="stake-liquidity-token"
                buttonText="Deposit"
                cornerRadiusBottomNone={true}
              />
              <XSushiWithdrawlPanel
                label={''}
                disableCurrencySelect={true}
                customBalanceText={'Available to withdraw: '}
                id="withdraw-liquidity-token"
                buttonText="Withdraw"
                cornerRadiusTopNone={true}
              />
            </AutoColumn>
            <AutoColumn gap="0px" style={{ padding: '0 16px' }} id="stake-autocol">
              <RowBetween>
                <RowFixed>
                  <TYPE.black fontSize={14} fontWeight={400} color={theme.text2}>
                    xSUSU supply
                  </TYPE.black>
                  <QuestionHelper text="Amount of xSUSU currently in circulation" />
                </RowFixed>
                <RowFixed>
                  <TYPE.black color={theme.text1} fontSize={14}>
                    {totsup?.toFixed(0, { groupSeparator: ',' })}
                  </TYPE.black>
                </RowFixed>
              </RowBetween>

              <RowBetween>
                <RowFixed>
                  <TYPE.black fontSize={14} fontWeight={400} color={theme.text2}>
                    SUSU in
                  </TYPE.black>
                  <QuestionHelper text="Amount of SUSU being in the staking contract" />
                </RowFixed>
                <RowFixed>
                  <TYPE.black color={theme.text1} fontSize={14}>
                    {sbalance?.toFixed(0, { groupSeparator: ',' })}
                  </TYPE.black>
                </RowFixed>
              </RowBetween>

              <RowBetween align="center">
                <TYPE.black fontWeight={500} fontSize={14} color={theme.text2}>
                  Current ratio (approx.)
                </TYPE.black>
                <TradePrice price={price} showInverted={showInverted} setShowInverted={setShowInverted} />
              </RowBetween>

              {account && stake && (
                <RowBetween>
                  <RowFixed>
                    <TYPE.black fontSize={14} fontWeight={400} color={theme.text2}>
                      Your share
                    </TYPE.black>
                    <QuestionHelper text="You share of the SUSU in the stake pool" />
                  </RowFixed>
                  {/* <TYPE.black fontSize={14} color={theme.text1}>
    {`${ushare?.multiply('100').toFixed(4)}%`}
  </TYPE.black>
  */}
                  <StakeAmount
                    totalSupply={stake.totalSupply}
                    stakeSusuBalance={stake.stakeSusuBalance}
                    userBalance={stake.userBalance}
                    showInToken={showInToken}
                    setShowInToken={setShowInToken}
                  />
                </RowBetween>
              )}
            </AutoColumn>
          </Wrapper>
        </ZAppBody>
      </PageWrapper>
    </>
  )
}
