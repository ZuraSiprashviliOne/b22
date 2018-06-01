
import Axios from 'axios';

export function INIT_COLLECTIONS(){
  return {
    type: 'INIT_COLLECTIONS',
    payload: new Promise((resolve, reject) => {
      Axios.get('/data/collections/collections.json')
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

export function SET_COLLECTIONS_ITEMS(){
  return {
    type: 'SET_COLLECTIONS_ITEMS',
    payload: new Promise((resolve, reject) => {
      Axios.get('/data/collections/items.json')
        .then((response) => {
          resolve(response.data.items);
        })
        .catch((error) => {
          reject(error);
        });
    })
  }
}