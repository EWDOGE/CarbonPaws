import { transparentize } from 'polished'
import React from 'react'
import styled from 'styled-components'

const RoundedDiv = styled.div`
  //background: ${({ theme }) => theme.primary4};
  //color: ${({ theme }) => theme.text1};
  background: #101010;
  border-radius: 12px;
`

export default function Paper({ children, className, ...rest }: any): JSX.Element {
  return (
    <RoundedDiv className={`${className}`} {...rest}>
      {children}
    </RoundedDiv>
  )
}
