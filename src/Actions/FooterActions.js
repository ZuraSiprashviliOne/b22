
import Axios from 'axios';

export function INIT_FOOTER(){
  return {
    type: 'INIT_FOOTER',
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
          })
        })
        .catch((error) => {
          reject(error);
        });
    })
  }
}

export function SET_FOOTER(){
  return {
    type: 'SET_FOOTER',
    payload: new Promise((resolve, reject) => {
      Axios.get('http://testoneone.000webhostapp.com/data.php', {
        params: {
          footer: 'data'
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