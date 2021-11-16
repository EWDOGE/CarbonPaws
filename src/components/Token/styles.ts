import styled from 'styled-components'
import { animated } from 'react-spring'

export const AnimatedTokenWrapper = styled(animated.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bg1};
  border-radius: 30px;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);
  padding: 24px;
`

export const TokenImage = styled.img`
  width: auto;
  height: 80%;
`

export const TokenName = styled.p`
  width: 100%;
  justify-self: center;
  color: ${({ theme }) => theme.text1};
  text-align: center;
`
