
import Axios from 'axios';

export function SET_THEME_SRC(){
    return {
        type: 'SET_THEME_SRC',
        payload: new Promise((resolve, reject) => {
            Axios.get('http://testoneone.000webhostapp.com/data.php', {
                params: {
                    theme: true
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