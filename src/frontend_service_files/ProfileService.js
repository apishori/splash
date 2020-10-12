/* eslint-disable no-async-promise-executor */
import axios from 'axios';

const url = 'http://localhost:80';

class ProfileService {
    //get droplets
    static getProfile(user_id){
        return new Promise(async (resolve, reject) => {
            try{
                const res = await axios.post(url + '/profile', {
                    user_id: user_id
                });
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
    // //droplets
    // static postDroplets(text, username, fname, lname,){
    //     return axios.post(url +'/droplet',{
    //         text: text,
    //         username: username,
    //         fname: fname,
    //         lname: lname
    //     });
    // }
    // //delete droplets?
}

export default ProfileService;