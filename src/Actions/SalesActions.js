
import Axios from 'axios';

export function INIT_SALES(){
  return {
    type: 'INIT_SALES',
    payload: new Promise((resolve, reject) => {
      Axios.get('http://testoneone.000webhostapp.com/data.php', {
        params: {
          common: 'locale'
        }
      })
        .then((response) => {
          resolve({
            divider: response.data.divider,
            language: response.data.language
          });
        })
        .catch((error) => {
          reject(error);
        });
    })
  }
}

export function SET_SALES_ITEMS(){
  return {
    type: 'SET_SALES_ITEMS',
    payload: new Promise((resolve, reject) => {
      Axios.get('http://testoneone.000webhostapp.com/data.php', {
        params: {
          products: 'sales_real'
        }
      })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        })
    })
  }
}