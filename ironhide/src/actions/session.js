import { LOGIN, LOGOUT } from '../constants';

export function login(token, id, userInfo) {
  return {
    type: LOGIN,
    payload:{
      status:true,
      token,
      id,
      userInfo
    }
  };
};

export function logout() {
  return {
    type: LOGOUT,
    payload:{}
  };
};