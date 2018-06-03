
import Axios from 'axios';

export function INIT_FLOWER(){
  return {
    type: 'INIT_FLOWER',
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

export function SET_FLOWER_FLOWER(id){
  return {
    type: 'SET_FLOWER_FLOWER',
    payload: new Promise((resolve, reject) => {
      Axios.get('http://localhost/index.php', {
        params: {
          product: id
        }
      })
        .then((response) => {
          if (response.data.length !== 0) {
            resolve(response.data[0]);
          }else{
            resolve(null);
          }
        })
        .catch((error) => {
          reject(error);
        });
    })
  }
}