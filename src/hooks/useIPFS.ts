import axios from 'axios'

export const useIPFS = () => {
  const gateway = 'https://carbonswap.mypinata.cloud/ipfs/'
  const toGatewayUrl = (cid: string) => cid.replace('ipfs://', gateway)
  return {
    toGatewayUrl,
    get: async (cid: string) => {
      try {
        const response = await axios.get(toGatewayUrl(cid))
        return response.data
      } catch (err) {
        console.log(err)
      }
    }
  }
}
