class MockedERC721 {
  getNumberOfTokens = (user: string) => Promise.resolve(10)

  getToken = (user: string, index: number) => Promise.resolve(Math.random().toString())

  getMetadata = (url: string): Promise<NFTMetadata> => {
    const randomNumber = Math.ceil(Math.random() * (50 - 1) + 1)
    return Promise.resolve({
      description: `Really awesome token #${randomNumber}`,
      image: `https://storage.googleapis.com/opensea-prod.appspot.com/creature/${randomNumber}.png`,
      name: ''
    })
  }

  getTokenMetadataURI = (tokenId: string) => Promise.resolve('')
}

const useERC721 = () => new MockedERC721()

export interface NFT {
  id: string
}

export interface NFTMetadata {
  image: string
  name: string
  description: string
}

const useNFT = () => {
  const { getMetadata, getTokenMetadataURI, getNumberOfTokens, getToken } = useERC721()

  const getUsersNFTs = async (user: string): Promise<(NFT & NFTMetadata)[]> => {
    const index = await getNumberOfTokens(user)
    return Promise.all(
      Array.from({ length: index }, (_, index) => index).map(async index => {
        const tokenId = await getToken(user, index)
        const url = await getTokenMetadataURI(tokenId)
        const metadata = await getMetadata(url)
        return {
          id: tokenId,
          ...metadata
        }
      })
    )
  }

  return {
    getUsersNFTs
  }
}

export default useNFT
