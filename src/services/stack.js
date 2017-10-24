import request from '../utils/request';

export function list({ current }) {
    return request(`/api/service/stack/api/stack?namespace=${current}&page=1&itemsPerPage=1000000`);
}

export function metric({ current, podname = "" }) {
    return request(`/api/service/stack/api/namespace/metric?namespace=${current}&name=${podname}`)
}