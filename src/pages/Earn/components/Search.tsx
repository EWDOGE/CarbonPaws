import React from 'react'
import { Search as SearchIcon } from 'react-feather'
import styled from 'styled-components'
import { TYPE } from '../../../theme'

const SearchInput = styled.input`
  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-direction: column;
  `}
  background: ${({ theme }) => theme.primary5};
  color: ${({ theme }) => theme.text1};
  flex-grow: 2;
`

const SearchBar = styled.div`
  background: ${({ theme }) => theme.primary5};
  display: flex;
  flex-direction: row;
  flex-flow: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
`

export default function Search({ term, search, title }: any) {
  return (
    <SearchBar>
      <TYPE.mediumHeader>{title}</TYPE.mediumHeader>
      <SearchInput onChange={e => search(e.target.value)} value={term} placeholder="Search by name, symbol, address" />
      <SearchIcon size={16} />
    </SearchBar>
  )
}
