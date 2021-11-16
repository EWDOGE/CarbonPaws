import AddressInputPanel from 'components/AddressInputPanel'
import { ButtonPrimary } from 'components/Button'
import { AutoColumn } from 'components/Column'
import { RowBetween } from 'components/Row'
import React, { useCallback, useContext } from 'react'
import { ThemeContext } from 'styled-components'
import { TYPE } from 'theme'
import TransactionConfirmationModal, {
  ConfirmationModalContent,
  TransactionErrorContent
} from '../../components/TransactionConfirmationModal'

export default function ConfirmTransferModal({
  onConfirm,
  errorMessage,
  onDismiss,
  txHash,
  isOpen
}: {
  isOpen: boolean
  errorMessage: string | undefined
  txHash: string | undefined
  onConfirm: (recipient?: string) => void
  onDismiss: () => void
}) {
  const theme = useContext(ThemeContext)
  const [didConfirm, setDidConfirm] = React.useState(false)

  const [recipient, setRecipient] = React.useState<string>()

  const handleOnConfirm = useCallback(() => {
    setDidConfirm(true)
    onConfirm(recipient)
  }, [onConfirm, setDidConfirm, recipient])

  const modalHeader = useCallback(
    () => (
      <AutoColumn>
        <RowBetween>
          <div>
            <TYPE.white
              fontSize={14}
              color={theme.text2}
              style={{ marginTop: '10px', marginBottom: '10px' }}
            >{`Disclaimer: do not transfer your NFT to an untrusted recipient. It will be lost forever. You will have the opportunity to sell NFTs on a marketplace in the near future.`}</TYPE.white>
            <AddressInputPanel value={recipient ?? ''} onChange={v => setRecipient(v)} />
          </div>
        </RowBetween>
      </AutoColumn>
    ),
    [theme.text2, recipient]
  )

  const modalBottom = useCallback(
    () => (
      <AutoColumn>
        <RowBetween>
          <ButtonPrimary onClick={handleOnConfirm}>{`Transfer`}</ButtonPrimary>
        </RowBetween>
      </AutoColumn>
    ),
    [handleOnConfirm]
  )
  const confirmationContent = useCallback(
    () =>
      errorMessage ? (
        <TransactionErrorContent
          onDismiss={() => {
            setDidConfirm(false)
            onDismiss()
          }}
          message={errorMessage}
        />
      ) : (
        <ConfirmationModalContent
          title="Transfer"
          onDismiss={onDismiss}
          topContent={modalHeader}
          bottomContent={modalBottom}
        />
      ),
    [onDismiss, modalBottom, modalHeader, errorMessage]
  )
  return (
    <TransactionConfirmationModal
      isOpen={isOpen}
      onDismiss={() => {
        setDidConfirm(false)
        onDismiss()
      }}
      hash={txHash}
      attemptingTxn={didConfirm && !txHash && !errorMessage}
      content={confirmationContent}
      pendingText={`Transaction pending...`}
    />
  )
}
