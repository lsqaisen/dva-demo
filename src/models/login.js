import * as loginService from '../services/login';
import { routerRedux } from 'dva/router';

export default {
    namespace: 'login',
    state: {
        loading: false,
        list: [],
    },
    subscriptions: {
        setup({ history, dispatch }) {
            history.listen(location => {
                if (location.pathname == "/login") {
                    dispatch({
                        type: 'query',
                        payload: {
                        },
                    })
                }
            });
        },
    },
    effects: {
        *query({ payload }, { select, call, put }) {
            const data = yield call(loginService.list, ...payload);
            yield put({
                type: 'updateState',
                payload: {
                    list: Object.keys(data.data || {}).map(key => (data.data || {})[key]).filter(v => !!v),
                }
            });
        },
        *login({ payload }, { select, call, put }) {
            const { locationPathname } = yield select(_ => _.app);
            yield put({ type: 'updateState', payload: { loading: true } });
            const data = yield call(loginService.login, payload);
            if (!data.error) {
                yield put({
                    type: 'app/profile',
                    payload: { pathname: '/dashboard' } 
                });
                yield put(routerRedux.push('/dashboard'));
            }
            yield put({ type: 'updateState', payload: { loading: false } });
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