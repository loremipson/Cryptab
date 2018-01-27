import React, { Component } from 'react';
import './Currency.css';

class Currency extends Component {
  constructor(props) {
    super(props);

    this.state = { status: 'none' };
  }
  componentWillReceiveProps(newProps) {
    const oldPrice = this.props.currencies[this.props.short].price;
    const newPrice = newProps.currencies[this.props.short].price;

    if (newPrice > oldPrice) {
      this.setState({ status: 'up' });
    } else if (newPrice < oldPrice) {
      this.setState({ status: 'down' });
    }
  }
  render() {
    const numFormat = num => {
      const thousand = 1000;
      const million = 1000000;
      const billion = 1000000000;

      if (num / billion > 1) {
        return (num / billion).toFixed(2) + 'B';
      } else if (num / million > 1) {
        return (num / million).toFixed(2) + 'M';
      } else if (num / thousand > 100) {
        return (num / thousand).toFixed(2) + 'K';
      } else {
        return (num / 1).toFixed(2);
      }
    };

    const roundPrice = price => {
      if (price < 1) {
        return (price / 1).toFixed(5);
      }
      return (price / 1).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };
    const { cap24hrChange, mktcap, price, long, usdVolume, short } = this.props.currencies[this.props.short];

    // const rank = this.props.index + 1;
    return (
      <div className={`currency ${cap24hrChange > 0 ? 'up' : 'down'} price_${this.state.status}`}>
        <div className="rank">{<h2>{this.props.rank}</h2>}</div>
        <div className="logo">
          <img
            src={`https://files.coinmarketcap.com/static/img/coins/128x128/${long.replace(' ', '-').toLowerCase()}.png`}
          />
        </div>
        <div className="name">
          <h2 className="full">
            <a href={`https://coinmarketcap.com/currencies/${short}/`} target="_blank">
              {long}
            </a>
          </h2>
          <span className="short">{short}</span>
        </div>
        <div className="price">
          <a href={`https://coinmarketcap.com/currencies/${short}/#markets`} target="_blank">
            <h2>${roundPrice(price)}</h2>
          </a>
        </div>
        <div className="change">
          <span className="label">Change (24h)</span>
          <a href={`https://coinmarketcap.com/currencies/${short}/#charts`} target="_blank">
            <h2>
              <img id="trend" src="//:0" />
              {cap24hrChange}%
            </h2>
          </a>
        </div>
        <div className="market">
          <span className="label">Market Cap</span>
          <a href={`https://coinmarketcap.com/currencies/${short}/`} target="_blank">
            <h2>${numFormat(mktcap)}</h2>
          </a>
        </div>
        <div className="volume">
          <span className="label">Volume (24h)</span>
          <a href={`https://coinmarketcap.com/currencies/${short}/#markets`} target="_blank">
            <h2>${numFormat(usdVolume)}</h2>
          </a>
        </div>
      </div>
    );
  }
}

export default Currency;
