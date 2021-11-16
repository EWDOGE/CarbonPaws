import { ChainId } from '@uniswap/sdk'
//import React, { useMemo } from 'react'
import React from 'react'
import { X } from 'react-feather'
import styled from 'styled-components'
//import tokenLogo from '../../assets/images/token-logo.png'
import susuMarketplace from '../../assets/images/susu/susumarketplace.png'
import { SUSU } from '../../constants'
import { useAllSusuTotalSupply } from '../../data/TotalSupply'
import { useActiveWeb3React } from '../../hooks'
//import { useMerkleDistributorContract } from '../../hooks/useContract'
//import useCurrentBlockTimestamp from '../../hooks/useCurrentBlockTimestamp'
//import { useTotalUniEarned } from '../../state/stake/hooks'
//import { useAggregateUniBalance, useTokenBalance } from '../../state/wallet/hooks'
import { useSusuBalances } from '../../state/wallet/hooks'
//import { ExternalLink, StyledInternalLink, TYPE, UniTokenAnimated } from '../../theme'
//import { StyledInternalLink, TYPE, UniTokenAnimated } from '../../theme'
import { ExternalLink, TYPE, UniTokenAnimated } from '../../theme'
//import { computeUniCirculation } from '../../utils/computeUniCirculation'
//import useUSDCPrice from '../../utils/useUSDCPrice'
import { AutoColumn } from '../Column'
import { RowBetween } from '../Row'
import { Break, CardBGImage, CardNoise, CardSection, DataCard } from '../earn/styled'
import ReactPlayer from 'react-player'
import teaserVideo from '../../assets/videos/cropped_Version.mp4'

const ContentWrapper = styled(AutoColumn)`
  width: 100%;
`

const ModalUpper = styled(DataCard)`
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  //background: radial-gradient(76.02% 75.41% at 1.84% 0%, #F1B24A 0%, #021d43 100%);
  background: radial-gradient(76.02% 75.41% at 1.84% 0%, #ffffff 0%, #000000 100%);
  padding: 0.5rem;
`

const StyledClose = styled(X)`
  position: absolute;
  right: 16px;
  top: 16px;

  :hover {
    cursor: pointer;
  }
`

/**
 * Content for balance stats modal
 */
export default function UniBalanceContent({ setShowUniBalanceModal }: { setShowUniBalanceModal: any }) {
  const { account, chainId } = useActiveWeb3React()
  const susu = chainId ? SUSU[chainId] : undefined

  const balances = useSusuBalances()
  //const uniBalance: TokenAmount | undefined = useTokenBalance(account ?? undefined, uni)
  //const uniToClaim: TokenAmount | undefined = useTotalUniEarned()

  const totalSupplies = useAllSusuTotalSupply()
  /*
  const uniPrice = useUSDCPrice(uni)
  
  const blockTimestamp = useCurrentBlockTimestamp()
  const unclaimedUni = useTokenBalance(useMerkleDistributorContract()?.address, uni)
  
  const circulation: TokenAmount | undefined = useMemo(
    () =>
      blockTimestamp && uni && chainId === ChainId.MAINNET
        ? computeUniCirculation(uni, blockTimestamp, unclaimedUni)
        : totalSupply,
    [blockTimestamp, chainId, totalSupply, unclaimedUni, uni]
  )
  */
  return (
    <ContentWrapper gap="lg">
      <ModalUpper>
        <CardBGImage />
        <CardNoise />
        <CardSection gap="md">
          <RowBetween>
            {/**<TYPE.white color="white">SUSU mining and staking coming soon. Stay tuned!</TYPE.white>*/}
            <TYPE.white color="white">Let's see...</TYPE.white>
            {/*<TYPE.white color="white">Your SUSU breakdown</TYPE.white>*/}
            <StyledClose stroke="white" onClick={() => setShowUniBalanceModal(false)} />
          </RowBetween>

          {/*
          <RowBetween>
              <TYPE.white color="white">One of the lesser known characteristics of SUSUs is their ability to combine and take different shapes. We hear they are particularly fond of transforming into fantastical, unique creatures. But, beware! Just like our natural resources, their abundance may not last forever… Keep your SUSUs safe! And remember, they're happiest when they're at work.</TYPE.white>
          </RowBetween>
          */}
        </CardSection>
        {/**<Break />*/}

        {/*
        <CardSection gap="sm">
               <AutoColumn gap="md" justify="center">
                <img width="300px" src={susuMarketplace} />
                <TYPE.white fontSize={48} fontWeight={600} color="white">
                  {balances['susu']?.toFixed(2, { groupSeparator: ',' })}
                </TYPE.white>
                
                <ReactPlayer playing controls muted loop url={teaserVideo} width="372px" height="auto" />
              </AutoColumn>
              <AutoColumn gap="md"></AutoColumn>
        </CardSection>
        */}

        {account && (
          <>
            <CardSection gap="sm">
              {/*
               <AutoColumn gap="md" justify="center">

                <img width="300px" src={susuMarketplace} />
                <TYPE.white fontSize={48} fontWeight={600} color="white">
                  {balances['susu']?.toFixed(2, { groupSeparator: ',' })}
                </TYPE.white>
                <ReactPlayer playing controls loop url={teaserVideo} width="372px" height="auto" />
              </AutoColumn>
              <AutoColumn gap="md"></AutoColumn>
              */}

              {/*
              <AutoColumn gap="md" justify="center">
                <UniTokenAnimated width="48px" src={tokenLogo} />{' '}
                
                <TYPE.white fontSize={48} fontWeight={600} color="white">
                  {balances['susu']?.toFixed(2, { groupSeparator: ',' })}
                </TYPE.white>
                
              </AutoColumn>
              */}
              <AutoColumn gap="md">
                <RowBetween>
                  <TYPE.white color="white">SUSU Balance:</TYPE.white>
                  <TYPE.white color="white">{balances['susu']?.toFixed(2, { groupSeparator: ',' })}</TYPE.white>
                </RowBetween>

                <RowBetween>
                  <TYPE.white color="white">xSUSU Balance:</TYPE.white>
                  <TYPE.white color="white">{balances['xsusu']?.toFixed(2, { groupSeparator: ',' })}</TYPE.white>
                </RowBetween>

                {/*
                <RowBetween>
                  <TYPE.white color="white">Unclaimed:</TYPE.white>
                  <TYPE.white color="white">
                    {uniToClaim?.toFixed(4, { groupSeparator: ',' })}{' '}
                    {uniToClaim && uniToClaim.greaterThan('0') && (
                      <StyledInternalLink onClick={() => setShowUniBalanceModal(false)} to="/uni">
                        (claim)
                      </StyledInternalLink>
                    )}
                    {'0.00'}
                  </TYPE.white>
                  
                </RowBetween>
                */}
              </AutoColumn>
            </CardSection>
            <Break />
          </>
        )}

        <CardSection gap="sm">
          <AutoColumn gap="md">
            {/*
            <RowBetween>
              <TYPE.white color="white">UNI price:</TYPE.white>
              <TYPE.white color="white">${uniPrice?.toFixed(2) ?? '-'}</TYPE.white>
            </RowBetween>
            
            <RowBetween>
              <TYPE.white color="white">UNI in circulation:</TYPE.white>
              <TYPE.white color="white">{circulation?.toFixed(0, { groupSeparator: ',' })}</TYPE.white>
            </RowBetween>
            */}
            <RowBetween>
              <TYPE.white color="white">SUSU Total Supply</TYPE.white>
              <TYPE.white color="white">{totalSupplies['susu']?.toFixed(0, { groupSeparator: ',' })}</TYPE.white>
            </RowBetween>
            <RowBetween>
              <TYPE.white color="white">xSUSU Total Supply</TYPE.white>
              <TYPE.white color="white">{totalSupplies['xsusu']?.toFixed(0, { groupSeparator: ',' })}</TYPE.white>
            </RowBetween>
            {susu && susu.chainId === ChainId.EWC ? (
              <ExternalLink href={`https://info.carbonswap.exchange/token/${susu.address}`}>
                View SUSU Analytics
              </ExternalLink>
            ) : null}
          </AutoColumn>
        </CardSection>
      </ModalUpper>
    </ContentWrapper>
  )
}
