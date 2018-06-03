
const flowerReducer = (state = {
  divider: null,
  language: null,
  flower: null
}, action) => {
  switch(action.type){

    case 'INIT_FLOWER_FULFILLED': {
      state = {
        ...state,
        divider: action.payload.divider,
        language: action.payload.language
      };
      break;
    }

    case 'SET_FLOWER_FLOWER_FULFILLED': {
      state = {
        ...state,
        flower: action.payload
      };
      break;
    }

    default: {

      break;
    }
  }

  return state;
};

export default flowerReducer;