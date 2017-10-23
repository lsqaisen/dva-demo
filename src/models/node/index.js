import * as loginService from '../../services/login';
import { routerRedux } from 'dva/router';

export default {
    namespace: 'node',
    state: {
    },
    subscriptions: {
        setup({ history, dispatch }) {
            history.listen(location => {
                dispatch({ type: 'query', payload: {} });
            });
        },
    },
    effects: {
        *query({ payload }, { call, select, put }) {

        }
    },
    reducers: {
    },
}