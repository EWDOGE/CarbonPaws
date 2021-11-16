import { ButtonPrimary } from 'components/Button'
import { AutoColumn } from 'components/Column'
import Modal from './modal'
import { RowBetween } from 'components/Row'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Text } from 'rebass'
import styled, { ThemeContext } from 'styled-components'
import { CloseIcon, ExternalLink, TYPE } from 'theme'
import { Token } from '.'
import { useIPFS } from 'hooks/useIPFS'
import { alignments, items } from './s1'
import { useS1CollectionContract } from 'hooks/useContract'
import ConfirmTransferModal from './transferModal'
import { ethers } from 'ethers'
import { useActiveWeb3React } from 'hooks'
import { getExplorerLink } from 'utils'
// import { TokenName } from 'components/Token/styles'

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const AssetWrapper = styled.div`
  background-color: black;
  justify-content: center;
  display: flex;
  height: 100%;
  width: 100%;
`

const Section = styled(AutoColumn)`
  padding: 24px;
  background-color: ${({ theme }) => theme.bg1};
`

const BottomSection = styled(Section)`
  background-color: ${({ theme }) => theme.bg2};
`

export default function DetailModal({
  isOpen,
  onDismiss,
  token
}: {
  isOpen: boolean
  onDismiss: () => void
  token?: Token
}) {
  const theme = useContext(ThemeContext)
  const ipfs = useIPFS()
  const collection = useS1CollectionContract()
  const { account, chainId } = useActiveWeb3React()

  const [isClaiming, setIsClaiming] = useState(false)
  const [claimWorked, setClaimWorked] = useState(false)

  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false)
  const [transferHash, setTransferHash] = useState('')
  const [transferError, setTransferError] = useState('')
  const [willTransfer, setWillTransfer] = useState(false)
  const [recipient, setRecipient] = useState<string>()

  useEffect(() => {
    const send = async () => {
      if (willTransfer && collection && account && token) {
        try {
          if (!recipient || !ethers.utils.isAddress(recipient)) {
            throw Error('Valid recipient address required')
          }
          const transfer = await collection.safeTransferFrom(account, recipient, token.id, 1, 0)
          const tx = await transfer.wait()
          if (tx.transactionHash) {
            setTransferHash(tx.transactionHash)
          }
        } catch (err) {
          setTransferError(err.message)
          setWillTransfer(false)
        }
      }
    }
    send()
  }, [willTransfer, recipient, collection, account, token])

  const modalHeader = useCallback(() => {
    if (!token) {
      return
    }
    const {
      metadata: { description, properties }
    } = token
    const toCapitalized = (some: string) => `${some.slice(0, 1).toUpperCase()}${some.slice(1)}`
    const getPrefix = (val: number) => (val > 0 ? ' +' : ' ')

    const claimed = token.stats.claimed || claimWorked

    return (
      <AutoColumn>
        <RowBetween>
          <div>
            <TYPE.italic fontSize={14} color={theme.text2} style={{ marginTop: '10px' }}>
              {description}
            </TYPE.italic>
            <hr style={{ marginTop: '15px' }} />
            <div style={{ marginTop: '15px' }}>
              <TYPE.white fontSize={14} color={theme.text2}>
                Token ID: {token.id}
              </TYPE.white>
              <TYPE.white fontSize={14} color={theme.text2}>
                Owned: {`${claimed ? token.stats.balance : 0} / ${token.stats.totalSupply}`}
              </TYPE.white>
            </div>
            {chainId && collection && (
              <div style={{ marginTop: '20px' }}>
                <ExternalLink
                  href={getExplorerLink(chainId, collection.address, 'address')}
                  style={{ fontSize: '14px' }}
                >
                  View Collection on Explorer <span style={{ fontSize: '11px' }}>↗</span>
                </ExternalLink>
              </div>
            )}
            <hr style={{ marginTop: '15px' }} />
            <TYPE.white fontSize={14} color={theme.text2} style={{ marginTop: '15px' }}>
              {properties.summary}
            </TYPE.white>
            {/* <hr style={{ marginTop: '15px' }} /> */}
            <div style={{ marginTop: '15px' }}>
              <TYPE.white fontSize={12} color={theme.text2}>
                Alignment
              </TYPE.white>
              <TYPE.white fontWeight={600} fontSize={14} color={theme.text2}>
                {alignments[properties.alignment]}
              </TYPE.white>
            </div>
            <div style={{ marginTop: '20px' }}>
              <TYPE.white fontSize={12} color={theme.text2}>
                Skills
              </TYPE.white>
              {properties.powers.map((power, index) => (
                <TYPE.white key={index} fontWeight={600} fontSize={14} color={theme.text2}>
                  {toCapitalized(power.key)}
                  {`${getPrefix(power.value)}${power.value}`}
                </TYPE.white>
              ))}
            </div>
            {properties.items.length > 0 && (
              <div style={{ marginTop: '20px' }}>
                <TYPE.white fontSize={12} color={theme.text2}>
                  Items
                </TYPE.white>
                {properties.items.map(item => (
                  <TYPE.white key={item} fontWeight={600} fontSize={14} color={theme.text2}>
                    {items[item]}
                  </TYPE.white>
                ))}
              </div>
            )}
          </div>
        </RowBetween>
      </AutoColumn>
    )
  }, [theme.text2, token, chainId, collection, claimWorked])

  const modalBottom = useCallback(() => {
    if (!token) {
      return
    }
    const claimable = token.stats.balance.gt(0)
    const claimed = token.stats.claimed || claimWorked

    const handleClaim = async () => {
      if (!collection) {
        return
      }
      try {
        setIsClaiming(true)
        const tx = await collection.claim(token.id)
        await tx.wait()
        setClaimWorked(true)
      } catch (err) {
        setIsClaiming(false)
        console.log('error claiming:', err)
      }
    }

    const handleTransfer = () => {
      setIsTransferModalOpen(true)
    }

    const decideButton = () => {
      if (!claimable || transferHash) {
        return <ButtonPrimary disabled>{`Claim`}</ButtonPrimary>
      }
      return !claimed ? (
        <ButtonPrimary disabled={isClaiming} onClick={handleClaim}>{`Claim`}</ButtonPrimary>
      ) : (
        <ButtonPrimary onClick={handleTransfer}>{`Transfer`}</ButtonPrimary>
      )
    }

    return (
      <AutoColumn>
        <RowBetween>{decideButton()}</RowBetween>
      </AutoColumn>
    )
  }, [token, isClaiming, collection, claimWorked, transferHash])
  const content = useCallback(
    () => (
      <Wrapper>
        <Section>
          <RowBetween>
            <Text fontWeight={500} fontSize={20}>
              {`#${token?.id} ${token?.metadata.name}`}
            </Text>
            <CloseIcon
              onClick={() => {
                setClaimWorked(false)
                onDismiss()
              }}
            />
          </RowBetween>
          {modalHeader()}
        </Section>
        <BottomSection gap="12px">{modalBottom()}</BottomSection>
      </Wrapper>
    ),
    [onDismiss, modalBottom, modalHeader, token]
  )
  return (
    <>
      <Modal isOpen={isOpen} onDismiss={onDismiss}>
        {token?.metadata.image && (
          <AssetWrapper>
            <img src={ipfs.toGatewayUrl(token?.metadata.image)} />
          </AssetWrapper>
        )}
        {content()}
      </Modal>
      <ConfirmTransferModal
        isOpen={isTransferModalOpen}
        onDismiss={() => {
          setTransferError('')
          setIsTransferModalOpen(false)
        }}
        onConfirm={recipient => {
          setRecipient(recipient)
          setWillTransfer(true)
        }}
        txHash={transferHash}
        errorMessage={transferError}
      />
    </>
  )
}
