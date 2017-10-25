import * as stackService from '../../services/stack';

export default {
    namespace: 'stacklist',
    state: {
        loading: true,
        list: [],

        selectStack: '',
        selectService: '',
    },
    subscriptions: {
        setup({ history, dispatch }) {
            return history.listen(location => {
                if (/^\/stack\/list(\/)*$/.test(location.pathname)) {
                    dispatch({ type: 'query' });
                }
            });
        },
    },
    effects: {
        *query({ payload }, { call, select, put }) {
            yield put({
                type: 'updateState',
                payload: {
                    loading: true
                }
            })
            const { profile: { current } } = yield select(_ => _.app);
            const data = yield call(stackService.list, { current });
            let list = [];
            if (!data.error) {
                list = data.data.stacks || [];
            }
            yield put({
                type: 'updateState',
                payload: {
                    list,
                    loading: false
                }
            })
        },
        *add({ payload }, { call, select, put }) {

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