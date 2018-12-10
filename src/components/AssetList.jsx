import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled'

import Asset from './Asset'

const List = styled('ol')`
  margin: 0;
  padding: 0;
  list-style-type: none;
  counter-reset: rank;
`


const AssetList = () => {
  return (
    <StaticQuery
      query={graphql`
        {
          allCoinCapAsset(limit: 100) {
            edges {
              node {
                name
                symbol
                rank
                priceUsd
                marketCapUsd
                volumeUsd24Hr
                changePercent24Hr
              }
            }
          }
        }
      `}
      render={data => {

        const assets = data.allCoinCapAsset.edges.map(({ node }) => {
          const { name, symbol, priceUsd, marketCapUsd, changePercent24Hr, volumeUsd24Hr } = node
          let icon = false
          try {
            icon = require(`cryptocurrency-icons/svg/color/${symbol.toLowerCase()}.svg`)
          }
          catch (e) {
            icon = require('cryptocurrency-icons/svg/color/generic.svg')
          }
          return (
            <li key={node.symbol}>
              <Asset
                icon={icon && icon}
                name={name}
                symbol={symbol}
                price={parseFloat(priceUsd)}
                marketCap={parseFloat(marketCapUsd)}
                changePercent={parseFloat(changePercent24Hr)}
                volume={parseFloat(volumeUsd24Hr)}
              />
            </li>
          )
        })

        return <List>{assets}</List>
      }}
    />
  )
}

export default AssetList
