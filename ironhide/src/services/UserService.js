import axios from 'axios';

const UserService = function() {};

UserService.prototype.login = function(email, password) {
    return new Promise(function(resolve, reject) {
        axios.post('http://0.0.0.0:3399/api/appusers/login', {email, password})
            .then((response) => {
                if(response.status === 200) {
                    resolve(response.data);
                } else {
                    reject(response);
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
};


export default new UserService();