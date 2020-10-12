/* eslint-disable no-async-promise-executor */
import axios from 'axios';

const url = 'http://localhost:80';

class LoginService {
    //get droplets
    static login(username, password) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(url + '/login', {
                    username: username,
                    password: password
                });
                const data = res.data;
                console.log(data);
                resolve(
                    data
                );
            } catch (err) {
                reject(err);
            }
        })
    }
}

export default LoginService;