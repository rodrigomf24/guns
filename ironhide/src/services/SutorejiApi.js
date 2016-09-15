import UserService from './UserService';

const SutorejiApi = function() {};

SutorejiApi.prototype.user = UserService;

export default new SutorejiApi();