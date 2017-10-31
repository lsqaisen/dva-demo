import * as stackService from '../../services/stack'
import { message } from 'antd'

export default {
    namespace: 'stacklist',
    state: {
        loading: true,
        list: [],

        addstack_visible: false,
        addstack_confirmLoading: false,
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
        *addstack({ payload }, { call, select, put }) {
            yield put({
                type: 'updateState',
                payload: {
                    addstack_confirmLoading: true
                }
            })
            const { profile: { current } } = yield select(_ => _.app);
            const data = yield call(stackService.addstack, { ...payload.data, namespace: current });
            if (!data.error) {
                message.success('应用创建成功！');
                yield put({ type: 'query' });
                yield put({
                    type: 'updateState',
                    payload: {
                        addstack_visible: false,
                        addstack_confirmLoading: false,
                    }
                });
                yield call(payload.resetFields);
            }
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