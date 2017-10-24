import * as appService from '../services/app';
import { delay } from '../utils/index';
import config from '../utils/config';
import { routerRedux } from 'dva/router';

export default {
	namespace: 'app',
	state: {
		loading: true,
		profile: null,
		plugins: [],
		menudata: [
			{
				active: false,
				name: '系统总览',
				path: '/dashboard',
				user: true,
			}, {
				active: false,
				name: '主机管理',
				path: '/node',
				user: true,
			}, {
				active: false,
				name: '应用管理',
				path: '/stack',
				user: true,
			}, {
				active: false,
				name: '应用市场',
				path: '/appstore',
				user: true,
			}, {
				active: false,
				name: '存储管理',
				path: '/storage',
				user: true,
			}, {
				active: false,
				name: '镜像管理',
				path: '/registry',
				user: true,
			}, {
				active: false,
				name: '网络管理',
				path: '/network',
				user: true,
			}, {
				active: false,
				name: '系统日志',
				path: '/logging',
				user: true,
			}, {
				active: false,
				name: '监控告警',
				path: '/monitor',
				user: true,
			}, {
				active: false,
				name: '认证授权',
				path: '/auth',
				user: true,
			}, {
				active: false,
				name: '多租户',
				path: '/tenant',
				user: false,
			}
		],
		selectedKeys: [],
		locationPathname: '',
	},
	reducers: {
		profileSuccess(state, { payload }) {
			return {
				...state,
				...payload,
			}
		},
		pluginSuccess(state, { payload }) {
			return {
				...state,
				...payload,
			}
		},
		updateMenuData(state, { payload }) {
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
	effects: {
		*profile({ payload }, { call, select, put }) {
			const { menudata, profile } = yield select(_ => _.app);
			const { pathname, admin, current } = payload;
			let requestData = { admin, current };
			if (!!profile) {
				if (!admin) requestData.admin = profile.admin ? 'on' : 'off';
				if (!current) requestData.current = profile.current || '';
			}
			const data = yield call(appService.profile, requestData);
			yield put({
				type: 'updateMenuData',
				payload: {
					menudata: menudata.map(v => {
						if (pathname.indexOf(v.path) != -1) v.active = true;
						else v.active = false;
						return v;
					}),
				}
			});
			if (!data.data) {
				if (pathname != '/login') {
					yield put(routerRedux.push({
						pathname: '/login',
						search: '',
					}))
				}
			} else {
				config.setProfile(data.data);
				yield put({
					type: 'profileSuccess',
					payload: {
						profile: data.data,
						selectedKeys: [pathname.replace(/\/.*\/(.*)(\/)*/, '$1')]
					}
				});
				if (pathname === '/login' || pathname === '/') {
					yield put(routerRedux.push({
						pathname: '/dashboard',
					}));
				}
			}
		},
		*plugin({ payload }, { call, select, put }) {
			const data = yield call(appService.plugin);
			if (!!data.data) {
				yield put({
					type: 'pluginSuccess',
					payload: {
						plugins: data.data.plugins || [],
					}
				});
			}
		},
	},
	subscriptions: {
		setup({ dispatch, history }, done) {
			dispatch({ type: 'plugin' });
			let timehandle = null;
			history.listen(({ pathname }) => {
				clearInterval(timehandle);
				dispatch({ type: 'profile', payload: { pathname } });
				if (pathname != "/login") {
					timehandle = setInterval(() => {
						dispatch({ type: 'profile', payload: { pathname } });
					}, 60000)
				}
			})
		},
	},
};