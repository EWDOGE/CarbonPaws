//import styled from 'styled-components'

import React from 'react'
import styled from 'styled-components'

// const CardHeader = styled.div<{ border?: boolean; market?: string }>`
//   display: flex;
//   align-items: center;
//   background: ${({ theme }) => theme.extraDarkPurple};
//   border-radius: 10px 10px 0 0;
//   padding: 32px 32px 26px;
//   border-bottom: 6px solid
//     ${({ market, border, theme }) =>
//       border ? `${market === 'Supply' ? theme.primaryBlue : theme.primaryPink}` : 'transparent'};
// `

const RoundedTDiv = styled.div`
  //background: ${({ theme }) => theme.primary5};
  //color: ${({ theme }) => theme.text1};
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
`

export default function CardHeader({ className, children }: any) {
  return <RoundedTDiv className={`${className} flex items-center px-2 py-4 sm:px-8 sm:py-6`}>{children}</RoundedTDiv>
}

export function BorrowCardHeader({ children }: any) {
  return <CardHeader className="bg-dark-pink border-b-8 border-pink">{children}</CardHeader>
}

export function LendCardHeader({ children }: any) {
  return <CardHeader className="bg-dark-blue border-b-8 border-blue">{children}</CardHeader>
}
