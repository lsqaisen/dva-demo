import request from '../utils/request';

export function list({ current, page = 1, itemsPerPage = 1000000 }) {
    return request(`/api/service/stack/api/stack?namespace=${current}&page=${page}&itemsPerPage=${itemsPerPage}`);
}

export function detail({ current, name }) {
    return request(`/api/service/stack/api/stack/detail?namespace=${current}&name=${name}`);
}

export function metric({ current, name = "" }) {
    return request(`/api/service/stack/api/namespace/metric?namespace=${current}&name=${name}`)
}

export function podMetric({ current, podname = "" }) {
    return request(`/api/service/stack/api/pod/metric?namespace=${current}&name=${podname}`)
}

//service
export function serviceDetail({ current, name }) {
    return request(`/api/service/stack/api/app/detail?namespace=${current}&name=${name}`);
}

export function history({ current, name }) {
    return request(`/api/service/stack/api/app/history?namespace=${current}&name=${name}`);
}