
import Axios from 'axios';

export function INIT_ORDER(){
  return {
    type: 'INIT_ORDER',
    payload: new Promise((resolve, reject) => {
      Axios.get('http://testoneone.000webhostapp.com/data.php', {
        params: {
          common: 'locale'
        }
      })
        .then((response) => {
          resolve({
            language: response.data.language,
            divider: response.data.divider
          });
        })
        .catch((error) => {
          reject(error);
        });
    })
  }
}

export function SET_ORDER(product){
  return {
    type: 'SET_ORDER',
    payload: product
  };
}


export function SET_ORDER_COUNT(num){
  return {
    type: 'SET_ORDER_COUNT',
    payload: num
  }
}

export function SET_ORDER_SIZE(id) {
  return {
    type: 'SET_ORDER_SIZE',
    payload: id
  }
}

export function UNSET_ORDER(){
  return {
    type: 'UNSET_ORDER',
    payload: null
  };
}

