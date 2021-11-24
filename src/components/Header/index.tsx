import { ChainId, TokenAmount } from '@uniswap/sdk'
//import { ChainId } from '@uniswap/sdk'
import React, { useContext, useState } from 'react'
import { Text } from 'rebass'
import { NavLink } from 'react-router-dom'
import { darken } from 'polished'
import { useTranslation } from 'react-i18next'

import styled from 'styled-components'

import Logo from '../../assets/svg/logo.svg'
import LogoDark from '../../assets/images/dogo.png'
import { useActiveWeb3React } from '../../hooks'
import { useDarkModeManager } from '../../state/user/hooks'
import { useETHBalances, useSusuBalances } from '../../state/wallet/hooks'
//import { useETHBalances } from '../../state/wallet/hooks'
import { CardNoise } from '../earn/styled'
import { CountUp } from 'use-count-up'
import { TYPE, ExternalLink } from '../../theme'

import { YellowCard } from '../Card'
import { Moon, Sun } from 'react-feather'
import Menu from '../Menu'

import Row, { RowFixed } from '../Row'
import Web3Status from '../Web3Status'
import ClaimModal from '../claim/ClaimModal'
import { useToggleSelfClaimModal, useShowClaimPopup } from '../../state/application/hooks'
import { useUserHasAvailableClaim } from '../../state/claim/hooks'
import { useUserHasSubmittedClaim } from '../../state/transactions/hooks'
import { Dots } from '../swap/styleds'
import Modal from '../Modal'
import UniBalanceContent from './UniBalanceContent'
import usePrevious from '../../hooks/usePrevious'
import { Countdown, CountdownContext } from '../../components/Countdown'

import dogologo from '../../assets/images/ewd.png'

import { useLocation } from 'react-router-dom'

const HeaderFrame = styled.div`
  display: grid;
  grid-template-columns: 1fr 120px;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 100%;
  top: 0;
  position: relative;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 1rem;
  z-index: 2;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    grid-template-columns: 1fr;
    padding: 0 1rem;
    width: calc(100%);
    position: relative;
  `};

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
        padding: 0.5rem 1rem;
  `}
`

const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-self: flex-end;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    flex-direction: row;
    justify-content: space-between;
    justify-self: center;
    width: 100%;
    max-width: 960px;
    padding: 1rem;
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    z-index: 99;
    height: 72px;
    border-radius: 12px 12px 0 0;
    background-color: ${({ theme }) => theme.bg1};
  `};
`

const HeaderElement = styled.div`
  display: flex;
  align-items: center;

  /* addresses safari's lack of support for "gap" */
  & > *:not(:first-child) {
    margin-left: 8px;
  }

  ${({ theme }) => theme.mediaWidth.upToMedium`
   flex-direction: row-reverse;
    align-items: center;
  `};
`

const HeaderElementWrap = styled.div`
  display: flex;
  align-items: center;
`

const HeaderRow = styled(RowFixed)`
  ${({ theme }) => theme.mediaWidth.upToMedium`
   width: 100%;
  `};
`

const HeaderLinks = styled(Row)`
  justify-content: center;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 1rem 0 1rem 1rem;
    justify-content: flex-end;
`};
`

const AccountElement = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #101010;
  border-radius: 12px;
  border: 1px solid #000000;
  white-space: nowrap;
  width: 100%;
  cursor: pointer;
`

const UNIAmount = styled(AccountElement)`
  color: white;
  padding: 8px 12px;
  font-weight: 500;
  background-color: #080808;
`

const UNIWrapper = styled.span`
  width: fit-content;
  position: relative;
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }

  :active {
    opacity: 0.9;
  }
`

const HideSmall = styled.span`
  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: none;
  `};
`

const NetworkCard = styled(YellowCard)`
  border-radius: 12px;
  padding: 8px 12px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin: 0;
    margin-right: 0.5rem;
    width: initial;
    overflow: hidden;
    text-overflow: ellipsis;
    flex-shrink: 1;
  `};
`

const BalanceText = styled(Text)`
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`

const Title = styled.a`
  display: flex;
  align-items: center;
  pointer-events: auto;
  justify-self: flex-start;
  margin-right: 12px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    justify-self: center;
  `};
  :hover {
    cursor: pointer;
  }
`

const UniIcon = styled.div`
  width: 35px;
  height: 35px;

  :hover {
    transform: rotate(-5deg);
  }
`

const activeClassName = 'ACTIVE'

const StyledNavLink = styled(NavLink).attrs({
  activeClassName
})<{ isNftPage?: boolean }>`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme, isNftPage }) => (isNftPage ? '#ddd' : theme.text2)};
  font-size: 1rem;
  width: fit-content;
  margin: 0 12px;
  font-weight: 500;

  &.${activeClassName} {
    border-radius: 12px;
    font-weight: 600;
    color: ${({ theme, isNftPage }) => (isNftPage ? 'white' : theme.text1)};
  }

  :hover,
  :focus {
    color: ${({ theme, isNftPage }) => darken(0.1, isNftPage ? 'white' : theme.text1)};
  }
`
/*
const StyledInactiveLink = styled(NavLink).attrs({
  activeClassName
})`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text4};
  font-size: 1rem;
  width: fit-content;
  margin: 0 12px;
  font-weight: 500;
  `
*/

const StyledExternalLink = styled(ExternalLink).attrs({
  activeClassName
})<{ isActive?: boolean; isNftPage?: boolean }>`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme, isNftPage }) => (isNftPage ? '#ddd' : theme.text2)};
  font-size: 1rem;
  width: fit-content;
  margin: 0 12px;
  font-weight: 500;

  &.${activeClassName} {
    border-radius: 12px;
    font-weight: 600;
    color: ${({ theme, isNftPage }) => (isNftPage ? 'white' : theme.text1)};
  }

  :hover,
  :focus {
    color: ${({ theme, isNftPage }) => (isNftPage ? 'white' : darken(0.1, theme.text1))};
    text-decoration:none;
  }

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
      
`}
`

export const StyledMenuButton = styled.button`
  position: relative;
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
  height: 35px;
  background-color: ${({ theme }) => theme.bg3};
  margin-left: 8px;
  padding: 0.15rem 0.5rem;
  border-radius: 0.5rem;

  :hover,
  :focus {
    cursor: pointer;
    outline: none;
    background-color: ${({ theme }) => theme.bg4};
  }

  svg {
    margin-top: 2px;
  }
  > * {
    stroke: ${({ theme }) => theme.text1};
  }
`

const NETWORK_LABELS: { [chainId in ChainId]?: string } = {
  [ChainId.RINKEBY]: 'Rinkeby',
  [ChainId.ROPSTEN]: 'Ropsten',
  [ChainId.GÖRLI]: 'Görli',
  [ChainId.KOVAN]: 'Kovan',
  [ChainId.VOLTA]: 'Volta',
  [ChainId.EWC]: 'EWC'
}

export default function Header() {
  const { account, chainId } = useActiveWeb3React()
  const { t } = useTranslation()

  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']
  const [darkMode] = useDarkModeManager()
  //const [darkMode, toggleDarkMode] = useDarkModeManager()

  const toggleClaimModal = useToggleSelfClaimModal()

  const availableClaim: boolean = useUserHasAvailableClaim(account)

  const { claimTxn } = useUserHasSubmittedClaim(account ?? undefined)

  const balances = useSusuBalances()

  const [showUniBalanceModal, setShowUniBalanceModal] = useState(false)
  const showClaimPopup = useShowClaimPopup()

  const [showBiggerUniBalanceModal, setShowBiggerUniBalanceModal] = useState(false)

  const countUpValue = balances['susu']?.toFixed(0) ?? '0'
  const countUpValuePrevious = usePrevious(countUpValue) ?? '0'

  const { countdownEnded, setCountdownEnded } = useContext(CountdownContext)

  const location = useLocation()

  const getLogo = () => {
    if (location.pathname === '/nft') {
      return LogoDark
    }
    return darkMode ? LogoDark : Logo
  }

  return (
    <HeaderFrame>
      <ClaimModal />
      <Modal isOpen={showUniBalanceModal} onDismiss={() => setShowUniBalanceModal(false)}>
        <UniBalanceContent setShowUniBalanceModal={setShowUniBalanceModal} />
      </Modal>
      <HeaderRow>
        <Title href=".">
          <UniIcon>
            <img width={'35px'} src={getLogo()} alt="logo" />
          </UniIcon>
        </Title>
        <HeaderLinks>
          <StyledNavLink id={`swap-nav-link`} to={'/swap'} isNftPage={location.pathname === '/nft'}>
            {t('swap')}
          </StyledNavLink>

          <StyledNavLink
            id={`pool-nav-link`}
            to={'/pool'}
            isNftPage={location.pathname === '/nft'}
            isActive={(match, { pathname }) =>
              Boolean(match) ||
              pathname.startsWith('/add') ||
              pathname.startsWith('/remove') ||
              pathname.startsWith('/create') ||
              pathname.startsWith('/find')
            }
          >
            {t('Pool')}
          </StyledNavLink>

          {/* ENABLE HERE */}
          <StyledNavLink id={`farm-nav-link`} to={'javascript:void(0)'}>
            {t('Farming')}
          </StyledNavLink>

          <StyledNavLink id={`farm-nav-link`} to={'javascript:void(0)'}>
            {t('NFTs')}
          </StyledNavLink>

          <StyledExternalLink id={`stake-nav-link`} href={'https://snapshot.org/#/carbonpaws.eth'}>
            DAO <span style={{ fontSize: '11px' }}></span>
          </StyledExternalLink>

          {/*
          <StyledNavLink id={`stake-nav-link`} to={'/stake'} isNftPage={location.pathname === '/nft'}>
            {t('Stake')}
          </StyledNavLink> */}

          {/*
          <StyledInactiveLink id={`farm-nav-link`} to={'/farm'} onClick={e => e.preventDefault()}>
            {t('Farm')}
          </StyledNavLink>
          <StyledNavLink id={`stake-nav-link`} to={'/stake'}>
            {t('Stake')}
          </StyledNavLink>
          {/*
          <StyledNavLink id={`stake-nav-link`} to={'/uni'}>
            UNI
          </StyledNavLink>
          
          <StyledNavLink id={`stake-nav-link`} to={'/vote'}>
            Vote
          </StyledNavLink>
          <StyledExternalLink id={`stake-nav-link`} href={'https://snapshot.org/#/carbonpaws.eth'}>
            Charts <span style={{ fontSize: '11px' }}>↗</span>
          </StyledExternalLink>
          */}
        </HeaderLinks>
      </HeaderRow>
      <HeaderControls>
        <HeaderElement>
          <HideSmall>
            {chainId && NETWORK_LABELS[chainId] && (
              <NetworkCard title={NETWORK_LABELS[chainId]}>{NETWORK_LABELS[chainId]}</NetworkCard>
            )}
          </HideSmall>
          {availableClaim && !showClaimPopup && (
            <UNIWrapper onClick={toggleClaimModal}>
              <UNIAmount active={!!account && !availableClaim} style={{ pointerEvents: 'auto' }}>
                <TYPE.white padding="0 2px">
                  {claimTxn && !claimTxn?.receipt ? <Dots>Claiming SUSU</Dots> : 'Claim SUSU'}
                </TYPE.white>
              </UNIAmount>
              <CardNoise />
            </UNIWrapper>
          )}

          {/* ENABLE HERE (remove false) */}
          {!availableClaim && (
            <UNIWrapper onClick={() => setShowUniBalanceModal(true)}>
              <UNIAmount active={!!account && !availableClaim} style={{ pointerEvents: 'auto' }}>
                {account && (
                  <HideSmall>
                    <TYPE.white
                      style={{
                        paddingRight: '.4rem'
                      }}
                    >
                      <CountUp
                        key={countUpValue}
                        isCounting
                        start={parseFloat(countUpValuePrevious)}
                        end={parseFloat(countUpValue)}
                        thousandsSeparator={','}
                        duration={1}
                      />
                    </TYPE.white>
                  </HideSmall>
                )}
                <img style={{margin:"5px"}} width={'24px'} src={dogologo} alt="happydogo" />
                <span>&nbsp;</span>
                <span>&nbsp;</span>
                <span>&nbsp;</span>
                
                {!showBiggerUniBalanceModal && (
                  <>
                    <span>&nbsp;</span>
                    <span>&nbsp;</span>
                  </>
                )}
                <Countdown
                  startMessage={showBiggerUniBalanceModal ? '' : ''}
                  targetSec={1630630800} //1623189600 Math.floor(Date.now()/1000) + 20
                  radix={17}
                  roman={false}
                  times={28}
                  onFinish={() => {
                    setShowBiggerUniBalanceModal(true)
                    if (setCountdownEnded) {
                      setCountdownEnded(true)
                    }
                  }}
                  onTick={() => {
                    if (setCountdownEnded) {
                      setCountdownEnded(false)
                    }
                  }}
                />
                {/*
                <span>&nbsp;</span>
                <span>&nbsp;</span>
                <span>&nbsp;</span>
                <span>&nbsp;</span>
                <span>&nbsp;</span>
                */}
              </UNIAmount>
              <CardNoise />
            </UNIWrapper>
          )}

          {/* 
          <UNIWrapper onClick={() => setShowUniBalanceModal(true)}>
            <UNIAmount active={!!account && !availableClaim} style={{ pointerEvents: 'auto' }}>
              <img width={'24px'} src={Steak} alt="someone-logo" />
              <span>&nbsp;</span>
              <Countdown
                startMessage={showBiggerUniBalanceModal ? 'Huh?' : 'Start!'}
                targetSec={1619647199}//1619647199
                inMinutes={true}
                onFinish={() => setShowBiggerUniBalanceModal(true)}
              />
            </UNIAmount>
            <CardNoise />
          </UNIWrapper>
          */}

          <AccountElement active={!!account} style={{ pointerEvents: 'auto' }}>
            {account && userEthBalance ? (
              <BalanceText style={{ flexShrink: 0 }} pl="0.75rem" pr="0.5rem" fontWeight={500}>
                {userEthBalance?.toSignificant(4)} EWT
              </BalanceText>
            ) : null}
            <Web3Status />
          </AccountElement>
        </HeaderElement>
        <HeaderElementWrap>
          {/* <StyledMenuButton onClick={() => toggleDarkMode()}>
            {darkMode ? <Moon size={20} /> : <Sun size={20} />}
            </StyledMenuButton>*/}
          <Menu />
        </HeaderElementWrap>
      </HeaderControls>
    </HeaderFrame>
  )
}
