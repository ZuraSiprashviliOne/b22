
import Axios from 'axios';

export function SET_NAVIGATION(){
  return {
    type: 'SET_NAVIGATION',
    payload: new Promise((resolve, reject) => {
      Axios.all([
        Axios.get('/data/navigation/nav.json'),
        Axios.get('/data/navigation/list.json')
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