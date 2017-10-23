import request from '../utils/request';

export function profile({ admin = '', current = '' }) {
    return request(`/api/profile?admin=${admin}&current=${current}`);
}

export function plugin() {
    return request(`/api/api/plugin`);
}