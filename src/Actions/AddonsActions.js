
import Axios from 'axios';

export function INIT_ADDONS(){
  return {
    type: 'INIT_ADDONS',
    payload: new Promise((resolve, reject) => {
      Axios.get('/data/addons/addons.json')
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

export function SET_ADDONS_ADDONS(){
  return {
    type: 'SET_ADDONS_ADDONS',
    payload: new Promise((resolve, reject) => {
      Axios.get('/data/addons/items.json')
        .then((response) => {
          resolve(response.data.items);
        })
        .catch((error) => {
          reject(error);
        });
    })
  }
}