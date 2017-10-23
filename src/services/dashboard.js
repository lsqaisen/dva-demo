import request from '../utils/request';

export function dashboard(requestData) {
    return request(`/api/service/node/api/statistics/dashboard`);
}

export function plugin() {
    return request(`/api/api/plugin`);
}
