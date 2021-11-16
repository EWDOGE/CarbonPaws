import { useCallback } from 'react'
import { Contract, ethers } from 'ethers'
//import { useActiveWeb3React } from '../hooks'
import { isAddress } from '../../utils'
import ERC20_ABI from '../../constants/abis/erc20.json'
import { useContract, useChefContract } from '../useContract'
import { useTransactionAdder } from '../../state/transactions/hooks'

const useApprove = (lpAddress: string) => {
  //const { account } = useActiveWeb3React()
  const addTransaction = useTransactionAdder()
  const masterChefContract = useChefContract()
  const lpAddressChecksum = isAddress(lpAddress)
  const lpContract = useContract(lpAddressChecksum || undefined, ERC20_ABI, true) // withSigner = true

  const approve = async (lpContract: Contract | null, masterChefContract: Contract | null) => {
    return lpContract?.approve(masterChefContract?.address, ethers.constants.MaxUint256.toString())
  }

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, masterChefContract)
      return addTransaction(tx, { summary: 'Approve' })
    } catch (e) {
      return e
    }
  }, [addTransaction, lpContract, masterChefContract])

  return { onApprove: handleApprove }
}

export default useApprove
