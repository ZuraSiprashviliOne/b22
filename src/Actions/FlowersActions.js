
import Axios from 'axios';

export function INIT_FLOWERS(){
  return {
    type: 'INIT_FLOWERS',
    payload: new Promise((resolve, reject) => {
      Axios.get('http://localhost/index.php', {
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

export function SET_FLOWERS_CURRENT_CATEGORY(category){
  return {
    type: 'SET_FLOWERS_CURRENT_CATEGORY',
    payload: category
  }
};

export function SET_FLOWERS_FLOWERS(category){
  return {
    type: 'SET_FLOWERS_FLOWERS',
    payload: new Promise((resolve, reject) => {
      Axios.get('http://localhost/index.php', {
        params: {
          products: 'category',
          category_slag: category
        }
      })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    })
  }
}