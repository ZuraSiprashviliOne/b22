
import Axios from 'axios';

export function INIT_SALES(){
  return {
    type: 'INIT_SALES',
    payload: new Promise((resolve, reject) => {
      Axios.get('/data/sales/sales.json')
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
      Axios.get('/data/sales/items.json')
        .then((response) => {
          resolve(response.data.items);
        })
        .catch((error) => {
          reject(error);
        })
    })
  }
}