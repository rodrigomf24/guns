import { SET_EMAIL, SET_PASSWORD, GET_CREDENTIALS } from '../constants';

export function setEmail(email) {
  return {
    type: SET_EMAIL,
    email
  };
};

export function setPassword(password) {
  return {
    type: SET_PASSWORD,
    password
  };
};
