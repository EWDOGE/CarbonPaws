import React, { useContext, useEffect, useState } from 'react'
import { transparentize } from 'polished'
// import { TransactionResponse } from '@ethersproject/providers'

import styled, { ThemeContext } from 'styled-components'
import { TYPE } from '../../theme'
import { CardSection, DataCard } from '../../components/earn/styled'
import { RowBetween } from '../../components/Row'
import { AutoColumn } from '../../components/Column'
//import { ButtonPrimary } from '../../components/Button'
//import AppBody from '../AppBody'

// import { useActiveWeb3React } from '../../hooks'
// import ConfirmPickupModal from './ConfirmPickupModal'
// import Confetti from 'components/Confetti'
// import { useOrchestratorContract } from 'hooks/useContract'

// import susus from '../../assets/images/susus.gif'
//import trailer from '../../assets/images/trailer.jpeg'
//import susuparty from '../../assets/images/susu/susuparty.png'
// import teaserVideo from '../../assets/videos/awesome.mp4'
// import ReactPlayer from 'react-player'
//import { StoryX } from './story'
import { ButtonPrimary } from 'components/Button'
import { CountdownContext } from 'components/Countdown'
//import useBreakdownStakingGameStats, {choiceToName} from 'hooks/carbonswap/useBreakdownStakingGameStats'
//import useStakingGameStats from '../../hooks/carbonswap/useBasicStakingGameStats'
//import { BigNumber } from 'ethers'

import marketplacepromo from '../../assets/videos/NFT4seconds.mp4'

const PageWrapper = styled(AutoColumn)`
  max-width: 420px;
  width: 100%;
`

const VoteCard = styled(DataCard)`
  background: ${({ theme }) => transparentize(0.5, theme.bg1)};
  overflow: hidden;
  margin-bottom: 10px;
`

const StyledSwapHeader = styled.div`
  padding: 12px 1rem 0px 1.5rem;
  margin-bottom: -4px;
  width: 100%;
  max-width: 420px;
  color: ${({ theme }) => theme.text2};
`

export default function Saave() {
  const theme = useContext(ThemeContext)

  const [page, setPage] = useState(0)
  const [isFinalPage, setFinalPage] = useState(false)

  const [showHiddenButton, setShowHiddenButton] = useState(false)

  useEffect(() => {
    if (page === 9) {
      setTimeout(() => setShowHiddenButton(true), 60 * 1000)
    } else {
      setShowHiddenButton(false)
    }
  }, [page])

  const openSnapshot = () => window.open('https://snapshot.org/#/carbonswap.eth', '_blank')
  const openProposal = () =>
    window.open(
      'https://snapshot.org/#/carbonswap.eth/proposal/QmVrxey5iTbcFzZgDNwqC68ydKdMHgK1ndGwwpKcerPSU5',
      '_blank'
    )

  const nextPage = () => setPage(page + 1)

  const getButton = () => {
    if (page === 0) {
      return (
        <VoteCard>
          <CardSection>
            <AutoColumn gap="md">
              <RowBetween>
                <ButtonPrimary style={{ marginRight: 5 }} onClick={() => setPage(1)}>
                  👈 Backwards
                </ButtonPrimary>
                <ButtonPrimary style={{ marginLeft: 5 }} onClick={() => setPage(6)}>
                  Onwards 👉
                </ButtonPrimary>
              </RowBetween>
            </AutoColumn>
          </CardSection>
        </VoteCard>
      )
    }
    if (page === 9 && !showHiddenButton) {
      return
    }
    return (
      <VoteCard>
        <CardSection>
          <AutoColumn gap="md">
            <RowBetween>
              <ButtonPrimary onClick={nextPage}>Continue</ButtonPrimary>
            </RowBetween>
          </AutoColumn>
        </CardSection>
      </VoteCard>
    )
  }

  return (
    <PageWrapper>
      <VoteCard>
        <CardSection>
          <AutoColumn gap="md">
            {/*<StoryX page={page} onFinalPage={() => setFinalPage(true)} />*/}
            <video src={marketplacepromo} muted autoPlay loop playsInline></video>
          </AutoColumn>
        </CardSection>
      </VoteCard>
      {/*!isFinalPage && getButton()*/}
    </PageWrapper>
  )
}
