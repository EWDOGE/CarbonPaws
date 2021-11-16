import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Input as NumericalInput } from 'components/NumericalInput'
import { Dots } from '../Pool/styleds'
import { useActiveWeb3React } from 'hooks'

import useTokenBalance from '../../hooks/carbonswap/useTokenBalance'
import useStakedBalance from '../../hooks/carbonswap/useStakedBalance'
import usePendingRewards from '../../hooks/carbonswap/usePendingRewards'
import useMasterChef from '../../hooks/carbonswap/useMasterChef'

import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback'
import { ChainId, Token, TokenAmount } from '@uniswap/sdk'
import { CHEF_ADDRESS } from '../../constants'

import { ethers } from 'ethers'
import { Button } from './components'
import { isAddressString, formattedNum, isWETH } from '../../utils/sushi'
import Fraction from 'constants/Fraction'
import { BigNumber } from '@ethersproject/bignumber'
import { ButtonConfirmed, ButtonPrimary, ButtonSecondary } from '../../components/Button'
import { LinkStyledButton } from '../../theme'
import styled from 'styled-components'
import { darken, lighten } from 'polished'
import useFarms from 'hooks/carbonswap/useFarms'

const fixedFormatting = (value: BigNumber, decimals?: number) => {
  return Fraction.from(value, BigNumber.from(10).pow(BigNumber.from(decimals))).toString(decimals)
}

export const MaxButton = styled.button`
  background-color: ${({ theme }) => theme.primary5};
  border: 1px solid ${({ theme }) => theme.primary5};
  border-radius: 0.5rem;
  position: absolute;
  right: 1rem;
  //font-size: 1rem;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 0.25rem 0.5rem;
  `};
  //font-weight: 500;
  color: ${({ theme }) => theme.primaryText1};
  :hover {
    border: 1px solid ${({ theme }) => theme.primary1};
  }
  :focus {
    border: 1px solid ${({ theme }) => theme.primary1};
    outline: none;
  }
`
export const DarkenedButtonSecondary = styled(ButtonSecondary)`
  border: 1px solid #000000;
  color: #ffffff;
  :hover{
    color:#e9e9e9;
  }
`

export default function InputGroup({
  pairAddress,
  pid,
  pairSymbol,
  token0Address,
  token1Address
}: {
  pairAddress: string
  pid: number
  pairSymbol: string
  token0Address: string
  token1Address: string
}): JSX.Element {
  const history = useHistory()
  const { account, chainId } = useActiveWeb3React()
  const [pendingTx, setPendingTx] = useState(false)
  const [depositValue, setDepositValue] = useState('')
  const [withdrawValue, setWithdrawValue] = useState('')

  const pairAddressChecksum = isAddressString(pairAddress)

  //const { deposit } = useBentoBox()

  const balance = useTokenBalance(pairAddressChecksum)
  const staked = useStakedBalance(pid)
  const pending = usePendingRewards(pid)

  // const farms = useFarms()
  // const farm = farms.filter((x: any) => x.pid == pid)
  // const balance = farm.balance
  // const balance = farm.balance

  const [approvalState, approve] = useApproveCallback(
    new TokenAmount(
      new Token(chainId ?? ChainId.EWC, pairAddressChecksum, balance.decimals, pairSymbol, ''),
      ethers.constants.MaxUint256.toString()
    ),
    CHEF_ADDRESS[chainId ?? ChainId.EWC]
  )

  const { deposit, withdraw, harvest } = useMasterChef()

  //console.log('depositValue:', depositValue)

  return (
    <>
      <div className="flex flex-col space-y-4 py-6">
        {pending && Number(pending) > 0 && (
          <div className=" px-4">
            <DarkenedButtonSecondary
              onClick={async () => {
                setPendingTx(true)
                await harvest(pid, pairSymbol)
                setPendingTx(false)
              }}
            >
              {`✨  Harvest ${formattedNum(pending)} SUSU  ✨`}
            </DarkenedButtonSecondary>
          </div>
        )}

        {(approvalState === ApprovalState.NOT_APPROVED || approvalState === ApprovalState.PENDING) && (
          <div className="px-4">
            {/* 
            <Button color="blue" disabled={approvalState === ApprovalState.PENDING} onClick={approve}>
              {approvalState === ApprovalState.PENDING ? <Dots>Approving </Dots> : 'Approve'}
            </Button>
            */}
            <ButtonConfirmed onClick={approve} disabled={approvalState === ApprovalState.PENDING}>
              {approvalState === ApprovalState.PENDING ? <Dots>Approving </Dots> : 'Approve'}
            </ButtonConfirmed>
          </div>
        )}
        {approvalState === ApprovalState.APPROVED && (
          <div className="grid gap-4 grid-cols-2 px-4">
            {/* Deposit */}
            <div className="text-center col-span-2 md:col-span-1">
              {account && (
                <div className="text-sm text-secondary cursor-pointer text-right mb-2 pr-4">
                  Wallet balance: {formattedNum(fixedFormatting(balance.value, balance.decimals))} CLP
                </div>
              )}
              <div className="flex items-center relative w-full mb-4">
                <NumericalInput
                  className="w-full p-3"
                  value={depositValue}
                  onUserInput={value => {
                    setDepositValue(value)
                  }}
                />
                {account && (
                  <MaxButton
                    onClick={() => {
                      setDepositValue(fixedFormatting(balance.value, balance.decimals))
                    }}
                  >
                    MAX
                  </MaxButton>
                )}
              </div>
              {/* 
              <Button
                color="blue"
                disabled={
                  pendingTx ||
                  !balance ||
                  Number(depositValue) === 0 ||
                  Number(depositValue) > Number(fixedFormatting(balance.value, balance.decimals))
                }
                onClick={async () => {
                  setPendingTx(true)
                  await deposit(pid, depositValue, pairSymbol)
                  setPendingTx(false)
                }}
              >
                Deposit
              </Button>
              */}
              <ButtonPrimary
                disabled={
                  pendingTx ||
                  !balance ||
                  Number(depositValue) === 0 ||
                  Number(depositValue) > Number(fixedFormatting(balance.value, balance.decimals))
                }
                onClick={async () => {
                  setPendingTx(true)
                  await deposit(pid, depositValue, pairSymbol)
                  setPendingTx(false)
                }}
              >
                Deposit CLP
              </ButtonPrimary>
            </div>
            {/* Withdraw */}
            <div className="text-center col-span-2 md:col-span-1">
              {account && (
                <div className="text-sm text-secondary cursor-pointer text-right mb-2 pr-4">
                  Deposited: {formattedNum(fixedFormatting(staked.value, staked.decimals))} CLP
                </div>
              )}
              <div className="flex items-center relative w-full mb-4">
                <NumericalInput
                  className="w-full p-3"
                  value={withdrawValue}
                  onUserInput={value => {
                    setWithdrawValue(value)
                  }}
                />
                {account && (
                  <MaxButton
                    onClick={() => {
                      setWithdrawValue(fixedFormatting(staked.value, staked.decimals))
                    }}
                  >
                    MAX
                  </MaxButton>
                )}
              </div>
              {/*
              <Button
                color="pink"
                className="border-0"
                disabled={
                  pendingTx ||
                  Number(withdrawValue) === 0 ||
                  Number(withdrawValue) > Number(fixedFormatting(staked.value, staked.decimals))
                }
                onClick={async () => {
                  setPendingTx(true)
                  await withdraw(pid, withdrawValue, pairSymbol)
                  setPendingTx(false)
                }}
              >
                Withdraw
              </Button>
              */}
              <ButtonPrimary
                disabled={
                  pendingTx ||
                  Number(withdrawValue) === 0 ||
                  Number(withdrawValue) > Number(fixedFormatting(staked.value, staked.decimals))
                }
                onClick={async () => {
                  setPendingTx(true)
                  await withdraw(pid, withdrawValue, pairSymbol)
                  setPendingTx(false)
                }}
              >
                Withdraw CLP
              </ButtonPrimary>
            </div>
          </div>
        )}
        {/*
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 px-4">
          <Button
            color="default"
            onClick={() => history.push(`/add/${isWETH(token0Address)}/${isWETH(token1Address)}`)}
          >
            Add Liquidity
          </Button>
          <Button
            color="default"
            onClick={() => history.push(`/remove/${isWETH(token0Address)}/${isWETH(token1Address)}`)}
          >
            Remove Liquidity
          </Button>
          
        </div>
        */}
        <LinkStyledButton
          id="add-recipient-button"
          onClick={() => history.push(`/add/${isWETH(token0Address)}/${isWETH(token1Address)}`)}
        >
          Need CLP tokens? Add liquidity to the pool!
        </LinkStyledButton>
      </div>
    </>
  )
}
