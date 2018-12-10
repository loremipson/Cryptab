import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import Price from './Price'

const StyledAsset = styled('div')`
  display: grid;
  grid-template-columns: 1fr 5fr 5fr 3fr 3fr 3fr;
  grid-gap: 1rem;
  font-size: 1.3rem;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.assetBackground};
  box-shadow: ${({ theme }) => theme.assetShadow};
  margin-bottom: 1rem;

  &::before {
    align-self: center;
    justify-self: stretch;
    padding: .8em 0;
    color: white;
    background-image: ${({ theme }) => theme.rankBackground};
    background-attachment: fixed;
    font-size: 1.5rem;
    text-align: center;
    content: counter(rank);
    counter-increment: rank;
  }

  dl {
    margin: 0;
    padding: .5rem 0;
    text-align: center;

    dt {
      color: #797990;
      font-size: .8rem;
    }

    dd {
      margin: 0;
      color: #5b6bc6;
    }
  }

  .asset {
    &__labels {
      display: flex;
      align-items: center;

      img {
        margin-right: 1rem;
      }

      dl {
        text-align: left;

        dt {
          color: ${({ theme }) => theme.assetNameColor};
          font-size: 1rem;
        }

        dd {
          color: #797990;
        }
      }
    }

    &__changePercent {
      dd {
        color: ${({ changePercent }) => changePercent >= 0 ? '#38e86c' : '#ff3f57'};
      }
    }

    &__price {
      &--is-primary {
        color: #f1a044;
      }
    }
  }
`

const Asset = ({ name, symbol, price, marketCap, changePercent, volume, icon }) => (
  <StyledAsset changePercent={changePercent}>
    <div className="asset__labels">
      <img src={icon} alt={`${symbol} Icon`} />
      <dl>
        <dt>{name}</dt>
        <dd>{symbol}</dd>
      </dl>
    </div>
    <Price className="asset__price--is-primary" amount={price} />
    <dl className="asset__changePercent">
      <dt>Change (24h)</dt>
      <dd>{`${changePercent.toFixed(2)}%`}</dd>
    </dl>
    <dl className="asset__marketCap">
      <dt>Market Cap</dt>
      <dd><Price amount={marketCap} shorten /></dd>
    </dl>
    <dl className="asset__volumePercent">
      <dt>Volume (24h)</dt>
      <dd><Price amount={volume} shorten /></dd>
    </dl>
  </StyledAsset>
)

Asset.propTypes = {
  name: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  marketCap: PropTypes.number.isRequired,
  changePercent: PropTypes.number.isRequired,
  volume: PropTypes.number.isRequired,
}

export default Asset
