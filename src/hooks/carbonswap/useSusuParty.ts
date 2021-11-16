import { useCallback, useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { useSusuContract, useSusuPartyContract } from '../useContract'
import { useTransactionAdder } from '../../state/transactions/hooks'
import { useActiveWeb3React } from '..'

import Fraction from '../../constants/Fraction'
import { BalanceProps } from '../queries/useTokenBalance'

const { BigNumber } = ethers

const useSusuParty = () => {
  const { account } = useActiveWeb3React()
  const addTransaction = useTransactionAdder()
  const sushiContract = useSusuContract(true) // withSigner
  const barContract = useSusuPartyContract(true) // withSigner

  const [allowance, setAllowance] = useState('0')

  const fetchAllowance = useCallback(async () => {
    if (account) {
      try {
        const allowance = await sushiContract?.allowance(account, barContract?.address)
        const formatted = Fraction.from(BigNumber.from(allowance), BigNumber.from(10).pow(18)).toString()
        setAllowance(formatted)
      } catch {
        setAllowance('0')
      }
    }
  }, [account, barContract, sushiContract])

  useEffect(() => {
    if (account && barContract && sushiContract) {
      fetchAllowance()
    }
    const refreshInterval = setInterval(fetchAllowance, 10000)
    return () => clearInterval(refreshInterval)
  }, [account, barContract, fetchAllowance, sushiContract])

  const approve = useCallback(async () => {
    try {
      const tx = await sushiContract?.approve(barContract?.address, ethers.constants.MaxUint256.toString())
      return addTransaction(tx, { summary: 'Approve' })
    } catch (e) {
      return e
    }
  }, [addTransaction, barContract, sushiContract])

  const enter = useCallback(
    // todo: this should be updated with BigNumber as opposed to string
    async (amount: BalanceProps | undefined, recipient: string | null | undefined) => {
      if (amount?.value) {
        try {
          const tx = await barContract?.enter(amount?.value, recipient)
          return addTransaction(tx, { summary: 'Join SusuParty' })
        } catch (e) {
          return e
        }
      }
    },
    [addTransaction, barContract]
  )

  const leave = useCallback(
    // todo: this should be updated with BigNumber as opposed to string
    async (amount: BalanceProps | undefined, recipient: string | null | undefined) => {
      if (amount?.value) {
        try {
          const tx = await barContract?.leave(amount?.value, recipient)
          //const tx = await barContract?.leave(ethers.utils.parseUnits(amount)) // where amount is string
          return addTransaction(tx, { summary: 'Leave SusuParty' })
        } catch (e) {
          return e
        }
      }
    },
    [addTransaction, barContract]
  )

  return { allowance, approve, enter, leave }
}

export default useSusuParty
