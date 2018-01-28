export default (state = {}, action) => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      const newState = {
        ...state,
        enabled: !state.enabled,
      };
      return newState;
    default:
      return state;
  }
};
