import React, { useContext } from 'react'
import Image from 'next/image'
import { formatNumberScale } from '../../functions/format'
import { useTokenStatsModalToggle } from '../../state/application/hooks'
import { useWeb3React } from '@web3-react/core'
import TokenStatsModal from '../../modals/TokenStatsModal'
import { ChainId } from '../../sdk'
import { PriceContext } from '../../contexts/priceContext'

const supportedTokens = {
  EWT: {
    name: 'EnergyWeb Token',
    symbol: 'EWT',
    icon: '/images/tokens/0x4fC53aEA7A4C6e898a8fA2545d725a0B48c614A4.png',
  },
  EWD: {
    name: 'EnergyWeb DOGE',
    symbol: 'EWD',
    icon: '/images/tokens/0x16e13C4cCcC031a0D7BAa34bcB39Aaf65b3C1891.png',
    address: {
      [ChainId.EWC]: '0x16e13C4cCcC031a0D7BAa34bcB39Aaf65b3C1891',
    },
  },
}

interface TokenStatsProps {
  token: string
}

function TokenStatusInner({ token }) {
  const toggleModal = useTokenStatsModalToggle(token)

  var priceData = useContext(PriceContext)

  var price = formatNumberScale(priceData?.[token.symbol.toLowerCase()]/100, true, 2)
  
  if (token.symbol == 'EWT') price = formatNumberScale(priceData?.["EWT".toLowerCase()], true, 2)
  if (token.symbol == 'EWD') price = formatNumberScale(priceData?.["EWD".toLowerCase()]/100, true, 4)

  return (
    <div className="flex pl-2" onClick={toggleModal}>
      {token.icon && (
        <Image
          src={token['icon']}
          alt={token['symbol']}
          width="24px"
          height="24px"
          objectFit="contain"
          className="rounded-md"
        />
      )}
      <div className="px-3 py-2 text-primary text-bold">
        {price}
      </div>
    </div>
  )
}

export default function TokenStats({ token, ...rest }: TokenStatsProps) {
  const selectedToken = supportedTokens[token]

  return (
    <>
      <TokenStatusInner token={selectedToken} />
      <TokenStatsModal token={selectedToken} />
    </>
  )
}
