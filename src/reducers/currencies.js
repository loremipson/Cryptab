export default function(state = [], action) {
  switch (action.type) {
    case 'UPDATE_CURRENCY':
      if (state.hasOwnProperty(action.short)) {
        const newState = {
          ...state,
          [action.short]: {
            ...state[action.short],
            cap24hrChange: action.cap24hrChange,
            mktcap: action.mktcap,
            perc: action.perc,
            price: action.price,
            supply: action.supply,
            usdVolume: action.usdVolume,
          },
        };

        return newState;
      } else {
        return state;
      }

    default:
      return state;
  }
}
