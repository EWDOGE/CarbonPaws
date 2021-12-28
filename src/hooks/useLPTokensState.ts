import { ChainId, CurrencyAmount, Token } from '../sdk'
import { useBoringHelperContract, useDashboardContract, useQuickSwapFactoryContract } from '../hooks/useContract'
import { useCallback, useEffect, useRef, useState } from 'react'

import LPToken from '../types/LPToken'
import { getAddress } from '@ethersproject/address'
import { useActiveWeb3React } from '../hooks/useActiveWeb3React'

export interface LPTokensState {
  updateLPTokens: () => Promise<void>
  lpTokens: LPToken[]
  selectedLPToken?: LPToken
  setSelectedLPToken: (token?: LPToken) => void
  selectedLPTokenAllowed: boolean
  setSelectedLPTokenAllowed: (allowed: boolean) => void
  loading: boolean
  updatingLPTokens: boolean
}

const useLPTokensState = () => {
  const { account, chainId } = useActiveWeb3React()
  const boringHelperContract = useBoringHelperContract()
  const dashboardContract = useDashboardContract()
  const quickSwapFactoryContract = useQuickSwapFactoryContract()
  const [lpTokens, setLPTokens] = useState<LPToken[]>([])
  const [selectedLPToken, setSelectedLPToken] = useState<LPToken>()
  const [selectedLPTokenAllowed, setSelectedLPTokenAllowed] = useState(false)
  const [loading, setLoading] = useState(true)
  const updatingLPTokens = useRef(false)
  const updateLPTokens = useCallback(async () => {
    try {
      updatingLPTokens.current = true
    } finally {
      setLoading(false)
      updatingLPTokens.current = false
    }
  }, [chainId, account, boringHelperContract, dashboardContract, quickSwapFactoryContract])

  useEffect(() => {
    if (chainId && account && boringHelperContract && !updatingLPTokens.current) {
      updateLPTokens()
    }
  }, [account, chainId, boringHelperContract, updateLPTokens])

  return {
    updateLPTokens,
    lpTokens,
    selectedLPToken,
    setSelectedLPToken,
    selectedLPTokenAllowed,
    setSelectedLPTokenAllowed,
    loading,
    updatingLPTokens: updatingLPTokens.current,
  }
}

export default useLPTokensState
