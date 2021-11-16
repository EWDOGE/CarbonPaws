import React from 'react'
import styled from 'styled-components'

export const BodyWrapper = styled.div`
  margin-top: 40px;
  position: relative;
  max-width: 650px;
  width: 100%;
  background: #080808;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);
  border-radius: 10px;
  /* padding: 1rem; */
  box-shadow: 0px 0px 95px 0px #337d31;
  margin-bottom:20px;
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children }: { children: React.ReactNode }) {
  return <BodyWrapper>{children}</BodyWrapper>
}
