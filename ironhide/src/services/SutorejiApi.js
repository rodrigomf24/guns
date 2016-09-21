import UserService from './UserService';

const API = 'http://104.236.187.60:9999/api/';

const SutorejiApi = function(endpoint) {
    this.endpoint = endpoint;
};

SutorejiApi.prototype.user = new UserService(API);

export default new SutorejiApi(API);