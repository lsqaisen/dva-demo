import request from '../utils/request';

export function list({ current, page = 1, itemsPerPage = 1000000 }) {
    return request(`/api/service/stack/api/stack?namespace=${current}&page=${page}&itemsPerPage=${itemsPerPage}`);
}

export function detail({ current, name }) {
    return request(`/api/service/stack/api/stack/detail?namespace=${current}&name=${name}`);
}


export function metric({ current, podname = "" }) {
    return request(`/api/service/stack/api/namespace/metric?namespace=${current}&name=${podname}`)
}