import * as stackService from '../../services/stack';
import { routerRedux } from 'dva/router';
import config from '../../utils/config';
import { Icon } from 'antd';

export default {
    namespace: 'service',
    state: {
      loading: true,
    },
    subscriptions: {
        setup({ history, dispatch }) {
            console.log('service')
        },
    },
    effects: {
      *query({ payload }, { call, select, put }) {

      }
    },
    reducers: {
 
    },
}