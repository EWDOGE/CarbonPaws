import { nanoid } from '@reduxjs/toolkit'
import { ChainId } from '@uniswap/sdk'
import { TokenList } from '@uniswap/token-lists'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { getNetworkLibrary, NETWORK_CHAIN_ID } from '../connectors'
import { AppDispatch } from '../state'
import { fetchTokenList } from '../state/lists/actions'
import getTokenList from '../utils/getTokenList'
import resolveENSContentHash from '../utils/resolveENSContentHash'
import { useActiveWeb3React } from './index'

export function useFetchListCallback(): (listUrl: string, sendDispatch?: boolean) => Promise<TokenList> {
  const { chainId, library } = useActiveWeb3React()
  const dispatch = useDispatch<AppDispatch>()
  //console.log('yolo outer', chainId)
  const ensResolver = useCallback(
    (ensName: string) => {
      //console.log('yolo ensname', ensName)
      if (!library || (chainId !== ChainId.MAINNET && chainId !== ChainId.EWC && chainId !== ChainId.VOLTA)) {
        //console.log('yolo', 'inner1')
        if (
          NETWORK_CHAIN_ID === ChainId.MAINNET ||
          NETWORK_CHAIN_ID === ChainId.VOLTA ||
          NETWORK_CHAIN_ID === ChainId.EWC
        ) {
          //console.log('yolo', 'inner2')
          const networkLibrary = getNetworkLibrary()
          if (networkLibrary) {
            //console.log('yolo', 'inner3')
            return resolveENSContentHash(ensName, networkLibrary)
          }
        }
        throw new Error(`Could not construct ENS resolver on chain with id: ${chainId}`)
      }
      return resolveENSContentHash(ensName, library)
    },
    [chainId, library]
  )

  // note: prevent dispatch if using for list search or unsupported list
  return useCallback(
    async (listUrl: string, sendDispatch = true) => {
      const requestId = nanoid()
      //console.log('yolo listUrl', listUrl)
      sendDispatch && dispatch(fetchTokenList.pending({ requestId, url: listUrl }))
      return getTokenList(listUrl, ensResolver)
        .then(tokenList => {
          sendDispatch && dispatch(fetchTokenList.fulfilled({ url: listUrl, tokenList, requestId }))
          //console.log('yolo tokenList', tokenList)
          return tokenList
        })
        .catch(error => {
          //console.log('yolo tokenList error', listUrl, error)
          console.debug(`Failed to get list at url ${listUrl}`, error)
          sendDispatch && dispatch(fetchTokenList.rejected({ url: listUrl, requestId, errorMessage: error.message }))
          throw error
        })
    },
    [dispatch, ensResolver]
  )
}
