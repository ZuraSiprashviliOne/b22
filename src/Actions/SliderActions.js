
import Axios from 'axios';

export function INIT_SLIDER(){
  return {
    type: 'INIT_SLIDER',
    payload: new Promise((resolve, reject) => {
      Axios.get('/data/slider/slider.json')
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

export function SET_SLIDER_SLIDES(){
  return {
    type: 'SET_SLIDER_SLIDES',
    payload: new Promise((resolve, reject) => {
      Axios.get('/data/slider/slides.json')
        .then((response) => {
          resolve(response.data.slides);
        })
        .catch((error) => {
          reject(error);
        });
    })
  }
}