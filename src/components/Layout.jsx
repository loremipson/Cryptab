import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { css, Global } from '@emotion/core'
import { ThemeProvider } from 'emotion-theming'

import 'typeface-rubik'

import AssetList from './AssetList'

const darkTheme = {
  background: 'linear-gradient(149deg,#4a4863 35%,#aa6c88)',
  rankBackground: 'linear-gradient(#5b6bc6,#c85fb2)',
  assetBackground: 'rgba(31,33,39,.4)',
  assetShadow: '0 0 15px 0 rgba(0,0,0,.21)',
  assetNameColor: 'white',
}

const Wrapper = styled.div`
  background: ${({ theme }) => theme.background};
  background-attachment: fixed;
  padding: 0 calc((100% - 1000px) / 2);
`

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <Wrapper>
        <Global
          styles={css`
            *,
            *::before,
            *::after {
              box-sizing: border-box;
            }

            body {
              margin: 0;
              padding: 0;
              font-family: 'Rubik', sans-serif;
            }
          `}
        />
        <AssetList />
      </Wrapper>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
