
import Axios from 'axios';

export function SET_NAVIGATION(){
  return {
    type: 'SET_NAVIGATION',
    payload: new Promise((resolve, reject) => {
      Axios.all([
        Axios.get('http://zurasiprashvilitwo.000webhostapp.com/index.php', {
          params: {
            common: 'locale'
          }
        }),
        Axios.get('http://zurasiprashvilitwo.000webhostapp.com/index.php', {
          params: {
            categories: 'list'
          }
        })
      ])
        .then(Axios.spread((nav, list) => {
          resolve({
            ...nav.data,
            list: list.data
          });
        }))
        .catch((error) => {
          reject(error);
        });
    })
  };
}
export function SET_NAVIGATION_CURRENT_PAGE(slag){
  return {
    type: 'SET_NAVIGATION_CURRENT_PAGE',
    payload: slag
  };
}