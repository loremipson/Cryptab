  document.addEventListener('DOMContentLoaded', function() {

    const url = 'https://api.coinmarketcap.com/v1/ticker/?';
    const marketData = 'https://api.coinmarketcap.com/v1/global/';
    const container = document.querySelector('.container');

    const trigger = document.getElementById('switch-1');
    const body = document.querySelector('body');

    trigger.addEventListener('click', function() {
      toggleClass(body, 'light');
    });

    const button = Array.from(document.querySelectorAll('.button'));

    button.forEach(function(el) {
      el.addEventListener('click', function(e) {
        const topList = e.currentTarget.dataset.list;
        container.innerHTML = '';
        list(url + topList);
      });
    });

    function toggleClass(el, className) {
      if(el.classList.contains(className)) {
        el.classList.remove(className);
      } else {
        el.classList.add(className);
      }
    }

    function roundPrice(price) {
      if(price < 1) {
        return (price/1).toFixed(4);
      }
      return (price/1).toFixed(2);
    }

    function numFormat(num) {

      const thousand = 1000;
      const million = 1000000;
      const billion = 1000000000;

      if((num/billion) > 1) {
        return (num/billion).toFixed(2) + 'B';
      } else if((num/million) > 1) {
        return (num/million).toFixed(2) + 'M';
      } else if((num/thousand) > 100) {
        return (num/thousand).toFixed(2) + 'K';
      } else {
        return (num/1).toFixed(2);
      }
    }

    function trending(percent) {
      if(percent > 0) {
        return 'up';
      } else {
        return 'down';
      }
    }

    function getMarketData() {
      fetch(marketData)
      .then((resp) => resp.json())
      .then(function(data) {
        let market = data;
        console.log(market.total_market_cap_usd);
        totalMarketCap = document.getElementsByClassName('total-market-cap');
        totalMarketCap.replace('Test', market.total_market_cap_usd);

        return;
      });
    }

    function list(num) {
      fetch(num) // Call the fetch function passing the url of the API as a parameter
      .then((resp) => resp.json()) // Transform the data into json
      .then(function(data) {
          let coins = data; // Get the results
          return coins.map(function(coin) { // Map through the results and for each run the code below
              let market = coin.market_cap_usd,
                  markup =
                  `
                    <div class="currency ${trending(coin.percent_change_24h)}">
                      <div class="rank">
                        <a href="https://coinmarketcap.com" target="_blank">
                          <h2>${coin.rank}</h2>
                        </a>
                      </div>
                      <div class="logo">
                        <a href="https://coinmarketcap.com/currencies/${coin.id}/" target="_blank">
                          <img width="60" src="https://files.coinmarketcap.com/static/img/coins/128x128/${coin.id}.png" />
                        </a>
                      </div>
                      <div class="name">
                        <h2 class="full">
                          <a href="https://coinmarketcap.com/currencies/${coin.id}/" target="_blank">
                            ${coin.name}
                          </a>
                        </h2>
                        <span class="short">${coin.symbol}</span>
                      </div>
                      <div class="price">
                        <a href="https://coinmarketcap.com/currencies/${coin.id}/#markets" target="_blank">
                          <h2>$${roundPrice(coin.price_usd)}</h2>
                        </a>
                      </div>
                      <div class="change">
                        <span class="label">Change (24h)</span>
                        <a href="https://coinmarketcap.com/currencies/${coin.id}/#charts" target="_blank">
                          <h2><img id="trend" src="//:0"/>${coin.percent_change_24h}%</h2>
                        </a>
                      </div>
                      <div class="market">
                        <span class="label">Market Cap</span>
                        <a href="https://coinmarketcap.com/currencies/${coin.id}/" target="_blank">
                          <h2>$${numFormat(coin.market_cap_usd)}</h2>
                        </a>
                      </div>
                      <div class="volume">
                        <span class="label">Volume (24h)</span>
                        <a href="https://coinmarketcap.com/currencies/${coin.id}/#markets" target="_blank">
                          <h2>$${numFormat(coin['24h_volume_usd'])}</h2>
                        </a>
                      </div>
                    </div>
                  `;
            container.insertAdjacentHTML('beforeend', markup);
          })
      })
      .catch(function(error) {
          console.log(error);
      });
    }

    list(url + 'limit=100');
    getMarketData();

  }, false);