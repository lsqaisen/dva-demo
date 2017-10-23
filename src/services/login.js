import request from '../utils/request';

export function list(requestData) {
    return request(`/api/service/auth/api/ldap/domain`, {
        method: 'get',
        bady: JSON.stringify(requestData)
    });
}

export function login({ username = '', password = '' }) {
    return request(`/api/login?username=${username}&password=${password}`, {
        method: 'post'
    });
}