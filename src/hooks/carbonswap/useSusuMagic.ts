import { useCallback } from 'react'
import { useMagicContract } from '../useContract'
import { useTransactionAdder } from '../../state/transactions/hooks'

const useSusuMagic = () => {
  const addTransaction = useTransactionAdder()
  const magicContract = useMagicContract()

  // Serve
  const serve = useCallback(
    async (token0: string, token1: string) => {
      try {
        const tx = await magicContract?.methods.convert(token0, token1)
        return addTransaction(tx, { summary: 'Serve' })
      } catch (e) {
        return e
      }
    },
    [addTransaction, magicContract]
  )

  // TODO: Serve all?

  return { serve }
}

export default useSusuMagic
