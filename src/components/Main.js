import React, { Component } from 'react';
import './Main.css';
import Currency from './Currency';
import ThemeSwitcher from './ThemeSwitcher';
import socketClient from 'socket.io-client';

class Main extends Component {
  componentDidMount() {
    const io = socketClient('https://coincap.io');
    io.on('trades', trade => {
      const { cap24hrChange, mktcap, perc, price, supply, usdVolume, short } = trade.msg;
      this.props.updateCurrency(cap24hrChange, mktcap, perc, price, supply, usdVolume, short);
    });

    setInterval(() => {
      localStorage.setItem('cachedCurrencies', JSON.stringify(this.props.currencies));
    }, 5000);
  }
  buildCurrencies() {
    this.props.currencies.map((currency, i) => <Currency />);
  }
  render() {
    const appClasses = ['app-container'];

    if (this.props.lightTheme.enabled) {
      appClasses.push('light');
    }

    return (
      <div className={appClasses.join(' ')}>
        <div className="content">
          <div className="header">
            <div className="left">
              <a href="http://cryptab.io">
                <img className="logo light" src="icon_white_256.png" alt="Cryptab" />
                <img className="logo dark" src="icon_dark_256.png" alt="Cryptab" />
                <h1>Cryptab</h1>
              </a>
            </div>
            <div className="middle">
              <h1>
                <span className="title">Cryptocurrencies Ranked by Market Cap</span>
              </h1>
            </div>
            <div className="right">
              <ThemeSwitcher {...this.props} />
            </div>
          </div>
          <div className="container">
            {Object.keys(this.props.currencies).map((currency, i) => {
              const { short } = this.props.currencies[currency];
              return <Currency {...this.props} key={short} short={short} rank={(i = i + 1)} />;
            })}
          </div>

          <div className="ad">
            <div className="left">
              <img src="images/qr.png" width="100" alt="QR Code" />
            </div>
            <div className="right">
              <h3>Enjoying Cryptab?</h3>
              <p>Bitcoin: 1nzhgrYVnnD1fHP1WVZVBB2qxvtV4Actt</p>
              <p>Ethereum: 0x85BfB8CDba1B5b05138932BF975E4503B47Be9c1</p>
              <br />
              <p>
                <small>
                  <a href="https://www.coinbase.com/join/549320a9cfb322ab750000fb" className="underline">
                    New to Crypto? Sign up with Coinbase and receive $10 in Bitcoin when you make your first deposit!
                  </a>{' '}
                  (ad)
                </small>
              </p>
            </div>
          </div>

          <div className="footer">
            <p>
              Cryptab &copy; 2017 | Design by <a href="http://www.evachau.com/">Eva Chau</a> | Powered by{' '}
              <a href="https://coincap.com/">coincap</a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
