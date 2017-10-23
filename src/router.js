import React from 'react';
import { Router, Switch, Route, Redirect } from 'dva/router';
import dynamic from 'dva/dynamic';
import App from './routes/App';
import StackLayout from './routes/Stack/Layout';

function RouterConfig({ history, app }) {
  const error = dynamic({
    app,
    component: () => import('./routes/Error/'),
  })
  const routes = [
    {
      path: '/dashboard',
      breadcrumbName: '',
      models: () => [require('./models/dashboard/dashboard'), require('./models/dashboard/metric')],
      component: () => require('./routes/Dashboard/'),
    },
    {
      path: '/login',
      breadcrumbName: '登录页面',
      models: () => [require('./models/login')],
      component: () => require('./routes/Login/'),
    },
    {
      path: '/node',
      breadcrumbName: '主机管理',
      models: () => [require('./models/node/')],
      component: () => require('./routes/Node/'),
    },
  ];
  return (
    <Router history={history}>
      <App>
        <Switch>
          <Route key="stack" path="/stack" >
            <StackLayout>
              <Switch>
                <Route exact path="/stack" render={() => (<Redirect push to={`/stack/list`} />)} />
                <Route exact path="/stack/list" component={dynamic({
                  app,
                  models: () => [require('./models/stack/stack')],
                  component: () => require('./routes/Stack/StackList'),
                })} />
                <Route exact path="/stack/list/:stackname" component={dynamic({
                  app,
                  models: () => [require('./models/stack/stack')],
                  component: () => require('./routes/Stack/Stack'),
                })} />
                <Route component={error} />
              </Switch>
            </StackLayout>
          </Route>
          <Route exact path="/dashboard" component={dynamic({
            app,
            models: () => [require('./models/dashboard/dashboard'), require('./models/dashboard/metric')],
            component: () => require('./routes/Dashboard/'),
          })} >
          </Route>
          <Route exact path="/login" component={require('./routes/Login/')} >
          </Route>
        </Switch>
      </App>
    </Router>
  );
}

export default RouterConfig;