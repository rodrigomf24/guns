import axios from 'axios';

const UserService = function(endpoint) {
    this.endpoint = endpoint;
};

UserService.prototype.login = function(email, password) {
    const that = this;
    return new Promise(function(resolve, reject) {
        axios.post(that.endpoint+'appusers/login',
            {email, password},
            {withCredentials:true}
        ).then((response) => {
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


export default UserService;