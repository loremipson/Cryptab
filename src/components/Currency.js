import React, { Component } from 'react';
import './Currency.css';

export default class Currency extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.data;
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

    const roundPrice = (price = this.state.price_usd) => {
      if (price < 1) {
        return (price / 1).toFixed(6);
      }
      return (price / 1).toFixed(2);
    };
    return (
      <div className={`currency ${this.state.percent_change_24h > 0 ? 'up' : 'down'}`}>
        <div className="rank">
          <h2>{this.state.rank}</h2>
        </div>
        <div className="logo">
          <img src={`https://files.coinmarketcap.com/static/img/coins/128x128/${this.state.id}.png`} />
        </div>
        <div className="name">
          <h2 className="full">
            <a href={`https://coinmarketcap.com/currencies/${this.state.id}/`} target="_blank">
              {this.state.name}
            </a>
          </h2>
          <span className="short">{this.state.symbol}</span>
        </div>
        <div className="price">
          <a href={`https://coinmarketcap.com/currencies/${this.state.id}/#markets`} target="_blank">
            <h2>${roundPrice()}</h2>
          </a>
        </div>
        <div className="change">
          <span className="label">Change (24h)</span>
          <a href={`https://coinmarketcap.com/currencies/${this.state.id}/#charts`} target="_blank">
            <h2>
              <img id="trend" src="//:0" />
              {this.state.percent_change_24h}%
            </h2>
          </a>
        </div>
        <div className="market">
          <span className="label">Market Cap</span>
          <a href={`https://coinmarketcap.com/currencies/${this.state.id}/`} target="_blank">
            <h2>${numFormat(this.state.market_cap_usd)}</h2>
          </a>
        </div>
        <div className="volume">
          <span className="label">Volume (24h)</span>
          <a href={`https://coinmarketcap.com/currencies/${this.state.id}/#markets`} target="_blank">
            <h2>${numFormat(this.state['24h_volume_usd'])}</h2>
          </a>
        </div>
      </div>
    );
  }
}
