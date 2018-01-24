import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Currency from './Currency';
import fire, { timestamp } from '../fire';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { currencies: {} };
  }
  componentWillMount() {
    // Rely on localStorage initially to prevent annoying 1000ms delay or so from Firebase..
    if (localStorage.getItem('cachedCurrencies')) {
      // Turn the stored data back into an object..
      let cached = JSON.parse(localStorage.getItem('cachedCurrencies'));
      // For some reason, null/empty is set as the first array item when storing it here...
      cached = cached.slice(1);
      this.setState({ currencies: cached });
    }

    // Get latest data from Firebase
    // Set as both state, and update the localStorage
    fire
      .database()
      .ref('currencies')
      .on('value', snap => {
        this.setState({ currencies: snap.val() });
        localStorage.setItem('cachedCurrencies', JSON.stringify(snap.val()));
      });
  }
  componentDidMount() {
    // CMC API updates only once every 5 minutes
    // Store some date timestamps so we can know if the data is older than that or not..
    const ref = fire.database().ref('sessions');

    ref.update({
      lastChecked: timestamp,
    });

    ref.once('value', snap => {
      const val = snap.val();
      if (val.lastChecked > val.lastUpdated + 300000) {
        // Firebase data is older than 5 minutes.. let's go update it.
        this.importData();
      }
    });
  }
  importData() {
    fetch('https://api.coinmarketcap.com/v1/ticker/?')
      .then(res => res.json())
      .then(data => {
        const ref = fire
          .database()
          .ref()
          .child('currencies');

        data.map(el => {
          const obj = {};
          obj[el.rank] = el;

          console.log(obj);

          ref.update(obj);
        });
      })
      .then(() => {
        fire
          .database()
          .ref('sessions')
          .update({
            lastUpdated: timestamp,
          });
      });
  }
  buildCurrencies() {
    const items = [];
    for (const obj in this.state.currencies) {
      items.push(<Currency key={this.state.currencies[obj].id} data={this.state.currencies[obj]} />);
    }
    return items;
  }
  render() {
    return (
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
            <input type="checkbox" className="switch" id="switch-1" />
          </div>
        </div>
        <div className="container">{this.buildCurrencies()}</div>

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

        <div className="show-more">
          <a className="button" data-list="limit=500">
            Show Top 500
          </a>
        </div>

        <div className="footer">
          <p>
            Cryptab &copy; 2017 | Design by <a href="http://www.evachau.com/">Eva Chau</a> | Powered by{' '}
            <a href="https://coinmarketcap.com/">CoinMarketCap</a>
          </p>
        </div>
      </div>
    );
  }
}

export default App;
