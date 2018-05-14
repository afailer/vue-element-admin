import Cookies from 'js-cookie'

const TokenKey = 'token';
const UserKey = 'user';

export function getToken() {
    return Cookies.get(TokenKey);
}
export function getUser() {
    var user = Cookies.get(UserKey);
    return JSON.parse(user ? user : "{}");
}

export function setToken(token, user) {
    Cookies.set(TokenKey, token);
    Cookies.set(UserKey, user);
}

export function removeToken() {
    Cookies.remove(TokenKey);
    Cookies.remove(UserKey);
    return;
}