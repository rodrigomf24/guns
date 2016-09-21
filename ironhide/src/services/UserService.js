import axios from 'axios';

const UserService = function(endpoint) {
    this.endpoint = endpoint+'appusers/';
};

UserService.prototype.getUser = function(userId, accessToken) {
    const that = this;
    return new Promise(function(resolve, reject) {
        axios.get(that.endpoint+userId+'?access_token='+accessToken,
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

UserService.prototype.login = function(email, password) {
    const that = this;
    return new Promise(function(resolve, reject) {
        axios.post(that.endpoint+'login',
            {email, password},
            {withCredentials:true}
        ).then((response) => {
            if(response.status === 200) {
                var finalResponse = Object.assign({}, response.data, {userInfo:{}});
                that.getUser(finalResponse.userId, finalResponse.id).then(function(response) {
                    finalResponse = Object.assign({}, finalResponse, {userInfo:response});
                    resolve(finalResponse);
                }, function(err) {
                    reject(err);
                });
            } else {
                reject(response);
            }
        })
        .catch((error) => {
            reject(error);
        });
    });
};

// UserService.prototype.validateToken = function(token, userId) {
//     const that = this;
//     return new Promise(function(resolve, reject) {
//         axios.get(that.endpoint+userId+'?access_token='+token,
//             {withCredentials:true}
//         ).then((response) => {
//             if(response.status === 200) {
//                 resolve(response.data);
//             } else {
//                 reject(response);
//             }
//         })
//         .catch((error) => {
//             reject(error);
//         });
//     });
// };


export default UserService;