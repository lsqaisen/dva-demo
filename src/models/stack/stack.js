import * as stackService from '../../services/stack';
import { routerRedux } from 'dva/router';
import config from '../../utils/config';
import { Icon } from 'antd';

export default {
    namespace: 'stack',
    state: {
        loading: true,
        list: [],
    },
    subscriptions: {
        setup({ history, dispatch }) {
            return history.listen(location => {
                dispatch({ type: 'query' });
                if (location.pathname.indexOf('/stack') != -1) {
                    let key = history.location.pathname.replace(/\/stack\/(\w+)(\/)*.*/, '$1');
                    dispatch({ type: 'updateSelectKeys', payload: { selectedKeys: [key] } });
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
            const { menudata, profile } = yield select(_ => _.app);
            console.log(profile)
            const data = yield call(stackService.list, { current: profile.current })
            console.log(data, 23423)
            let list = [];
            if (data.data) {
                list = data.data.stacks;
            }
            yield put({
                type: 'updateState',
                payload: {
                    list,
                    loading: false
                }
            })
        }
    },
    reducers: {
        updateState(state, { payload }) {
            return {
                ...state,
                ...payload,
            }
        },
        updateSelectKeys(state, { payload: selectedKeys }) {
            return {
                ...state,
                ...selectedKeys,
            }
        }
    },
}