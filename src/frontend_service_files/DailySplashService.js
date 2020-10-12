/* eslint-disable no-async-promise-executor */
import axios from 'axios';

const url = 'http://localhost:80';

class DailySplashService {
    //get droplets
    static getSplishySplashy(){
        return new Promise(async (resolve, reject) => {
            try{
                const res = await axios.get(url + '/dailysplash');
                const data = res.data;
                console.log(data);
                resolve(
                    data
                );
            } catch (err){
                reject(err);
            }
        })
    }

    //delete droplets?
}

export default DailySplashService;