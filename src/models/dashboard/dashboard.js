import * as dashboardService from '../../services/dashboard';
import { routerRedux } from 'dva/router';

export default {
    namespace: 'dashboard',
    state: {
        plugins: [],
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
            console.log(data)
        },
        *plugin({ payload }, { call, select, put }) {
            const data = yield call(dashboardService.plugin);
            console.log(data, 3223)
            if (data.data) {
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