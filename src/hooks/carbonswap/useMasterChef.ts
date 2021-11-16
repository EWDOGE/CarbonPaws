import { useCallback } from 'react'
import { useChefContract } from '../useContract'
import { useTransactionAdder } from '../../state/transactions/hooks'
//import { BigNumber } from '@ethersproject/bignumber'
import { ethers } from 'ethers'
import { useWeb3React } from '@web3-react/core'

const useMasterChef = () => {
  const addTransaction = useTransactionAdder()
  const masterChefContract = useChefContract(true) // withSigner

  const { account } = useWeb3React()

  // Deposit
  const deposit = useCallback(
    async (pid: number, amount: string, name: string) => {
      console.log('depositing...', pid, amount)
      try {
        const tx = await masterChefContract?.deposit(pid, ethers.utils.parseUnits(amount), account)
        return addTransaction(tx, { summary: `Deposit ${name} CLP` })
      } catch (e) {
        console.error(e)
        return e
      }
    },
    [addTransaction, masterChefContract, account]
  )

  // Withdraw
  const withdraw = useCallback(
    async (pid: number, amount: string, name: string) => {
      try {
        const tx = await masterChefContract?.withdraw(pid, ethers.utils.parseUnits(amount), account)
        return addTransaction(tx, { summary: `Withdraw ${name} CLP` })
      } catch (e) {
        console.error(e)
        return e
      }
    },
    [addTransaction, masterChefContract, account]
  )

  const harvest = useCallback(
    async (pid: number, name: string) => {
      try {
        const tx = await masterChefContract?.harvest(pid, account)
        return addTransaction(tx, { summary: `Harvest SUSU from ${name}` })
      } catch (e) {
        console.error(e)
        return e
      }
    },
    [addTransaction, masterChefContract, account]
  )

  return { deposit, withdraw, harvest }
}

export default useMasterChef
