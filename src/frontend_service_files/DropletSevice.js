/* eslint-disable no-async-promise-executor */
import axios from 'axios';

const url = 'http://localhost:80';

class DropletService {
    //get droplets
    static getDroplets(){
        return new Promise(async (resolve, reject) => {
            try{
                const res = await axios.get(url + '/wateringhole');
                const data = res.data;
                console.log(data);
                resolve(

                    data.reverse()
                );
            } catch (err){
                reject(err);
            }
        })
    }
    //droplets
    static postDroplets(text, userid){
        return axios.post(url +'/droplet',{
            text: text,
            user_id: userid
        });
    }
    //delete droplets?
}

export default DropletService;