const Web3 = require('web3')
const { default: axios } = require('axios')
import IUniswapV2PairABI from '../../constants/abis/uniswap-v2-pair.json'
const NETWORK_URL = 'https://rpc.energyweb.org'
const web3 = new Web3(NETWORK_URL)

export default async function handler(req, res) {
  let ewtUSDCContract = new web3.eth.Contract(IUniswapV2PairABI, '0xecc6AcBAB3D9A806DD8aBD6cF983D118cD7a6d7C')
  const ewtUSDCReserves = await ewtUSDCContract.methods.getReserves().call()

  const ewtUSDCPrice = (Number(ewtUSDCReserves.reserve1) / Number(ewtUSDCReserves.reserve0) ) 

  let ewdEWTContract = new web3.eth.Contract(IUniswapV2PairABI, '0xA8EAe4378dFE66bF3C174d5aC93c2b38F6bB4cbc')
  const ewdEWTReserves = await ewdEWTContract.methods.getReserves().call()

  const ewdEWTPrice = Number(ewdEWTReserves.reserve1) / Number(ewdEWTReserves.reserve0)

  let ribEWTContract = new web3.eth.Contract(IUniswapV2PairABI, '0x0acDB54E610dAbC82b8FA454b21AD425ae460DF9')
  const ribEWTReserves = await ribEWTContract.methods.getReserves().call()

  const ribEWTPrice = Number(ribEWTReserves.reserve0) / Number(ribEWTReserves.reserve1)

  let ret = {}
  ret['ewt'] = ewtUSDCPrice
  ret['ewd'] = ewdEWTPrice * ewtUSDCPrice
  ret['rib'] = ribEWTPrice * ewtUSDCPrice
  ret['usdc'] = 1

  res.status(200).json(ret)
}
