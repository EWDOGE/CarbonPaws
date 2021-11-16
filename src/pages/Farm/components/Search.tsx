import React from 'react'
import { Search as SearchIcon } from 'react-feather'
import styled from 'styled-components'

const BackGroundInput = styled.input`
  background: ${({ theme }) => theme.bg3};
  color: ${({ theme }) => theme.text2};
  border-radius: 12px;
  border:1px solid #1f2f40;

  :focus {
    border: none;
  }
`

export default function Search({ term, search }: any) {
  return (
    <div style={{ width: '100%' }} className="relative w-full sm:max-w-xl flex-end">
      <BackGroundInput
        className="py-3 pl-4 pr-14 w-full"
        onChange={e => search(e.target.value)}
        value={term}
        placeholder="Search by name, symbol, address"
      />
      <div className="absolute inset-y-0 right-0 pr-6 flex items-center pointer-events-none">
        <SearchIcon size={16} />
      </div>
    </div>
  )
}
