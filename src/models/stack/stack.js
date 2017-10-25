import * as stackService from '../../services/stack';

export default {
	namespace: 'stack',
	state: {
		loading: true,
		data: null,

		selectStack: '',
	},
	subscriptions: {
		setup({ history, dispatch }) {
			return history.listen(location => {
				if (/^\/stack\/list\/[\w-_]+(\/)*$/.test(location.pathname)) {
					dispatch({ type: 'query', payload: { stackname: location.pathname.split('\/')[3] || '' } });
				}
			});
		},
	},
	effects: {
		*query({ payload }, { call, select, put }) {
			yield put({
				type: 'updateState',
				payload: {
					selectStack: payload.stackname,
					loading: true
				}
			})
			const { profile: { current } } = yield select(_ => _.app);
			const data = yield call(stackService.detail, { current, name: payload.stackname });
			let _data = null;
			if (!data.error) {
				_data = data.data;
			}
			yield put({
				type: 'updateState',
				payload: {
					data: _data,
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