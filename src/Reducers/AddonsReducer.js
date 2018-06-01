
const addonsReducer = (state = {
  divider: null,
  language: null,
  addons: null
}, action) => {
  switch(action.type){
    case 'INIT_ADDONS_FULFILLED': {
      state = {
        ...state,
        divider: action.payload.divider,
        language: action.payload.language
      };
      break;
    }
    case 'SET_ADDONS_ADDONS_FULFILLED': {
      state = {
        ...state,
        addons: [...action.payload]
      };
      break;
    }
    default: {
      break;
    }
  }

  return state;
};

export default addonsReducer;