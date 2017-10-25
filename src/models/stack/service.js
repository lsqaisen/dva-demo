import * as stackService from '../../services/stack'
import queryString from 'query-string'
import { routerRedux } from 'dva/router'

export default {
    namespace: 'service',
    state: {
        loading: true,
        data: null,
        selectService: '',
        activeKey: 'details',
        expandedRowKeys: [],
        metrics: {},
        history: [],
    },
    subscriptions: {
        setup({ history, dispatch }) {
            return history.listen(location => {
                if (/^\/stack\/list\/[\w-_]+\/[\w-_]+(\/)*$/.test(location.pathname)) {
                    const servicename = location.pathname.split('\/')[4];
                    dispatch({ type: 'query', payload: { servicename } });
                    dispatch({ type: 'history', payload: { servicename } })
                }
            });
        },
    },
    effects: {
        *query({ payload }, { call, select, put }) {
            let { selectService, expandedRowKeys, metrics } = yield select(_ => _.service);
            if (selectService !== payload.servicename) {
                expandedRowKeys = [];
                metrics = {};
            }
            yield put({
                type: 'updateState',
                payload: {
                    selectService: payload.servicename,
                    loading: true
                }
            })
            const { profile: { current } } = yield select(_ => _.app);
            const data = yield call(stackService.serviceDetail, { current, name: payload.servicename });
            let _data = null;
            if (!data.error) {
                _data = data.data || null;
            }
            yield put({
                type: 'updateState',
                payload: {
                    data: _data,
                    expandedRowKeys,
                    metrics,
                    loading: false
                }
            })
        },
        *history({ payload }, { call, select, put }) {
            const { profile: { current } } = yield select(_ => _.app);
            const data = yield call(stackService.history, { current, name: payload.servicename });
            if (!data.error) {
                yield put({
                    type: 'updateState',
                    payload: {
                        history: data.data.historys || [],
                    }
                })
            }
        },
        *podMetric({ payload }, { call, select, put }) {
            const { expandedRowKeys, metrics } = yield select(_ => _.service);
            const index = expandedRowKeys.indexOf(payload.podname);
            if (index != -1) {
                payload.expanded ? '' : expandedRowKeys.splice(index);
            } else {
                payload.expanded ? expandedRowKeys.push(payload.podname) : ''
            }
            metrics[payload.podname] = {
                cpu: [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }],
                mem: [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }],
            }
            yield put({
                type: 'updateState',
                payload: {
                    expandedRowKeys,
                    metrics,
                }
            })
            if (payload.expanded) {
                const { profile: { current } } = yield select(_ => _.app);
                const data = yield call(stackService.podMetric, { current, podname: payload.podname });
                // : metrics[payload.podname] = data.data || []
                metrics[payload.podname] = {
                    cpu: [],
                    mem: [],
                }
                if (!data.error) {
                    yield put({
                        type: 'updateState',
                        payload: {
                            metrics,
                        }
                    })
                }
            }
        },
        *clickTabPane({ payload }, { call, select, put }) {
            console.log(payload)
            yield put(routerRedux.push({
                pathname: '/stack/list/xxxx/xxxx',
                search: queryString.stringify({
                    table: payload.activeKey,
                }),
            }))
        }
    },
    reducers: {
        updateState(state, { payload }) {
            return {
                ...state,
                ...payload,
            }
        },
    },
}