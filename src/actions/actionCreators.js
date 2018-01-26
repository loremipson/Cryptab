export const updateCurrency = (cap24hrChange, mktcap, perc, price, supply, usdVolume, short) => {
  return {
    type: 'UPDATE_CURRENCY',
    short,
    cap24hrChange,
    mktcap,
    perc,
    price,
    supply,
    usdVolume,
  };
};
