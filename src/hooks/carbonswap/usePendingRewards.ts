import { useCallback, useEffect, useState } from 'react'
import { BigNumber } from '@ethersproject/bignumber'
import { useActiveWeb3React } from 'hooks'
import { useChefContract } from '../useContract'
import { useBlockNumber } from 'state/application/hooks'

import Fraction from 'constants/Fraction'

const usePendingRewards = (pid: number) => {
  const [balance, setBalance] = useState<string>('0')
  const { account } = useActiveWeb3React()

  const chefContract = useChefContract()
  const currentBlockNumber = useBlockNumber()

  const fetchPending = useCallback(async () => {
    const pending = await chefContract?.pendingRewards(pid, account)
    const formatted = Fraction.from(BigNumber.from(pending), BigNumber.from(10).pow(18)).toString()
    setBalance(formatted)
  }, [account, chefContract, pid])

  useEffect(() => {
    if (account && chefContract && pid) {
      fetchPending()
    }
  }, [account, currentBlockNumber, fetchPending, chefContract, pid])

  return balance
}

export default usePendingRewards
