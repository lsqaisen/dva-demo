import * as stackService from '../../services/stack';
import { routerRedux } from 'dva/router';


export default {
    namespace: 'metric',
    state: {
        data: {
            cpu: [{ x: 0, y: 0 }],
            mem: [{ x: 0, y: 0 }],
        },
    },
    subscriptions: {
        setup({ history, dispatch }, done) {
            let timeHandle = null;
            return history.listen(({ pathname }) => {
                if (pathname == "/dashboard") {
                    clearInterval(timeHandle);
                    dispatch({ type: 'query' });
                    timeHandle = setInterval(() => {
                        dispatch({ type: 'query' });
                    }, 3000)
                } else {
                    clearInterval(timeHandle);
                }
            })
        },
    },
    effects: {
        *query({ payload }, { call, select, put }) {
            const { profile } = yield select(_ => _.app);
            const _data = yield call(stackService.metric, { current: profile.current });
            let { data } = yield select(_ => _.metric);
            // let metric = {
            //     cpu: [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }],
            //     mem: [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }],
            // };
            // data.cpu.push({
            //     x: Date.now(),
            //     y: Math.random() * 1000,
            // })
            // data.mem.push({
            //     x: Math.random() * 1000,
            //     y: Date.now(),
            // })
            if (data.cpu.length >= 15) {
                data.cpu.shift();
            }
            yield put({
                type: 'updateState',
                payload: {
                    data: {
                        cpu: [...data.cpu, {
                            x: Date.now(),
                            y: Math.random() * 1000,
                        }],
                        mem: [...data.mem]
                    },
                }
            });
            // if (!data.error) {
            //     let metric = {
            //         cpu: [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }],
            //         mem: [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }],
            //     };
            //     data.data.forEach(v => {
            //         if (v.metricName === "cpu/usage_rate") {
            //             metric.cpu = v.dataPoints;
            //         } else if (v.metricName === "memory/usage") {
            //             metric.mem = v.dataPoints;
            //         }
            //     })
            //     yield put({
            //         type: 'updateState',
            //         payload: {
            //             data: metric,
            //         }
            //     });
            // }
        },
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