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

export default function ConfirmPickupModal({
  onConfirm,
  errorMessage,
  onDismiss,
  txHash,
  isOpen
}: {
  isOpen: boolean
  errorMessage: string | undefined
  txHash: string | undefined
  onConfirm: () => void
  onDismiss: () => void
}) {
  const theme = useContext(ThemeContext)
  const [didConfirm, setDidConfirm] = React.useState(false)

  const handleOnConfirm = useCallback(() => {
    setDidConfirm(true)
    onConfirm()
  }, [onConfirm, setDidConfirm])

  const modalHeader = useCallback(
    () => (
      <AutoColumn>
        <RowBetween>
          <div>
            <TYPE.white
              fontSize={14}
              color={theme.text2}
              style={{ marginTop: '10px' }}
            >{`Remember, don't squeeze them too tight or they will turn to soot!`}</TYPE.white>
            <TYPE.white
              fontSize={14}
              color={theme.text2}
              style={{ marginTop: '10px' }}
            >{`And make sure to put them to work. They hate being bored!`}</TYPE.white>
          </div>
        </RowBetween>
      </AutoColumn>
    ),
    [theme.text2]
  )

  const modalBottom = useCallback(
    () => (
      <AutoColumn>
        <RowBetween>
          <ButtonPrimary onClick={handleOnConfirm}>{`Pick up the SUSUs`}</ButtonPrimary>
        </RowBetween>
      </AutoColumn>
    ),
    [handleOnConfirm]
  )
  const confirmationContent = useCallback(
    () =>
      errorMessage ? (
        <TransactionErrorContent onDismiss={onDismiss} message={errorMessage} />
      ) : (
        <ConfirmationModalContent
          title="Confirm pick up"
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
      onDismiss={onDismiss}
      hash={txHash}
      attemptingTxn={didConfirm && !txHash && !errorMessage}
      content={confirmationContent}
      pendingText={`Transaction pending...`}
    />
  )
}
