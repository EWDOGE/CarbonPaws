import React, { useContext, useEffect, useState } from 'react'
import { CardsWrapper, Card, Wrapper } from './styles'
import { CountdownContext } from 'components/Countdown'
import DetailModal from './detailModal'
import useCollectionS1Info from 'hooks/carbonswap/useCollectionS1Info'
import { TYPE } from 'theme'
import { useIPFS } from 'hooks/useIPFS'
import Loader from 'components/Loader'
import { BigNumber } from '@ethersproject/bignumber'
//import { useActiveWeb3React } from 'hooks'
//import styled from 'styled-components'
// import { VideoComponent } from 'components/Video'

/*
{countdownEnded ? <>
  <Card key={0}>
    <video src={SUSUNFT} muted={true} autoPlay loop playsInline/>
  </Card>
  </> : <>
    <Card key={0}>
      <img src={NFTVideo} />
    </Card>
  </>
}

 */

type Metadata = {
  name: string
  description: string
}

type TokenMetadata = Metadata & {
  image: string
  properties: {
    summary: string
    full_story: string
    alignment: number
    powers: Array<{
      key: string
      value: number
    }>
    items: number[]
  }
}

export type Token = {
  id: number
  metadata: TokenMetadata
  stats: {
    balance: BigNumber
    totalSupply: BigNumber
    maxSupply: BigNumber
    creator: BigNumber
    claimed: boolean
    locked: boolean //whether the total supply/max supply is locked
    uri: string
  }
}

const NFTPage = () => {
  const tokenIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  const [collectionInfo, setCollectionInfo] = useState<Metadata>()
  const [tokens, setTokens] = useState<Token[]>()
  const [fetched, setFetched] = useState(false)

  const [selectedToken, setSelectedToken] = useState<Token>()
  const [detailModalOpen, setDetailModalOpen] = useState(false)

  // const theme = useContext(ThemeContext)
  const ipfs = useIPFS()
  const info = useCollectionS1Info()
  console.log('yolo', info)

  //const { account } = useActiveWeb3React()
  const { countdownEnded } = useContext(CountdownContext)

  //console.log("countdownEnded", countdownEnded);
  useEffect(() => {
    /// shitty fix :)
    const wrapper = document.body
    if (wrapper) {
      wrapper.style.background = 'black'
    }
    return () => {
      if (wrapper) {
        wrapper.style.background = 'unset'
      }
    }
  }, [])

  useEffect(() => {
    if (info) {
      if (!fetched) {
        ipfs.get(info[0].uri).then(res => setCollectionInfo(res))
        setFetched(true)
        const t: Promise<Token>[] = tokenIds.map(async id => ({
          id,
          metadata: await ipfs.get(info[id].uri),
          stats: info[id]
        }))
        Promise.all(t).then(res => {
          setTokens(res)
        })
      }
    }
  }, [ipfs, info, tokenIds, fetched])

  const handleClick = (token: Token) => {
    setSelectedToken(token)
    setDetailModalOpen(true)
  }

  return collectionInfo ? (
    <Wrapper>
      <TYPE.largeHeader color={'white'} style={{ marginBottom: '20px' }}>
        {`💎 ${collectionInfo?.name} 💎`}
      </TYPE.largeHeader>
      <TYPE.subHeader color="#ddd" style={{ margin: '20px' }}>
        {collectionInfo?.description}
      </TYPE.subHeader>
      <CardsWrapper>
        {tokenIds.map(id => {
          const token = tokens?.[id - 1]
          if (!token) {
            return (
              <Card key={id}>
                <Loader size="16px" />
              </Card>
            )
          }
          const claimable = token.stats.balance.gt(0)
          return (
            <Card key={id} onClick={() => handleClick(token)}>
              <img src={ipfs.toGatewayUrl(token.metadata.image)} style={{ opacity: claimable ? 1 : 0.3 }} />
            </Card>
          )
        })}
      </CardsWrapper>
      <DetailModal isOpen={detailModalOpen} onDismiss={() => setDetailModalOpen(false)} token={selectedToken} />
    </Wrapper>
  ) : (
    <Loader size="16px" />
  )
}

export default NFTPage
