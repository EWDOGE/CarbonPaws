import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
`

export const CardsWrapper = styled.div`
  background-color: black;
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  width: 100%;
  justify-content: center;

  @media (min-width: 1600px) {
    width: 1600px;
  }
`

export const Card = styled.div`
  margin: 18px;
  width: 260px;
  justify-self: flex-start;
  cursor: pointer;
`
