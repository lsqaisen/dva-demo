import * as stackService from '../../services/stack';
import { routerRedux } from 'dva/router';
import config from '../../utils/config';
import { Icon } from 'antd';

export default {
    namespace: 'stack',
    state: {
        loading: true,
        list: [],

        selectStack: '',
    },
    subscriptions: {
        setup({ history, dispatch }) {
            dispatch({
                type: 'updateState',
                payload: {
                    selectStack: location.pathname.split('\/')[3] || '',
                }
            });
            return history.listen(location => {
                const pathArr = location.pathname.split('\/');
                console.log(pathArr)
                if (pathArr[1] === 'stack' && pathArr[2] === 'list') {
                    dispatch({ type: 'query', payload: { stackname: pathArr[3] || '' } });
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
            const data = payload.stackname ? yield call(stackService.detail, { current: profile.current, name: payload.stackname }) :
                yield call(stackService.list, { current: profile.current });
            let list = [], selectStack = payload.stackname || '';
            if (data.data) {
                list = payload.stackname ? [data.data] : data.data.stacks;
            }
            yield put({
                type: 'updateState',
                payload: {
                    list,
                    selectStack,
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