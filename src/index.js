import dva from 'dva';
import { browserHistory } from 'dva/router';
import createLoading from 'dva-loading';
import { message } from 'antd';
import './index.less';

const ERROR_MSG_DURATION = 3; // 3 秒

// 1. Initialize
const app = dva({
  history: browserHistory,
  onError(e) {
    message.error(e.message, ERROR_MSG_DURATION);
  },
});

// 2. Plugins
app.use(createLoading({
  effects: true,
}));

// 3. Model
app.model(require('./models/app'));

app.model(require('./models/login'));

// app.model(require("./models/stack/stack"));


// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
