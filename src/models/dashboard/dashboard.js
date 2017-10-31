import * as dashboardService from '../../services/dashboard';
import { routerRedux } from 'dva/router';

export default {
    namespace: 'dashboard',
    state: {
        plugins: [],
        sys_status: {
            apps: 0,
            appsNotRunning: 0,
            appsRunning: 0,
            nodes: 0,
            podNotRuning: 0,
            podRunning: 0,
            pods: 0,
            privateNode: 0,
            publicNode: 0,
            scheduleNode: 0,
        },
    },
    subscriptions: {
        setup({ history, dispatch }) {
            history.listen(location => {
                dispatch({ type: 'query', payload: {} });
                dispatch({ type: 'plugin', payload: {} });
            });
        },
    },
    effects: {
        *query({ payload }, { call, select, put }) {
            const data = yield call(dashboardService.dashboard);
            console.log(data, 1)
            if(!data.error) {
                yield put({
                    type: 'updateState',
                    payload: {
                        sys_status: data.data,
                    }
                })
            }
        },
        *plugin({ payload }, { call, select, put }) {
            const data = yield call(dashboardService.plugin);
            console.log(data, 3223)
            if (!data.error) {
                yield put({
                    type: 'updateState',
                    payload: {
                        plugins: data.data.plugins,
                    }
                })
            }
        }
    },
    reducers: {
        updateState(state, { payload }) {
            return {
                ...state,
                ...payload,
            }
        }
    },
}