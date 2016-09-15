import { LOGIN, LOGOUT } from '../constants';

export function login(token, id) {
  return {
    type: LOGIN,
    status:true,
    token,
    id
  };
};

export function logout() {
  return {
    type: LOGOUT,
    status:false,
    token:void(0),
    id:void(0)
  };
};