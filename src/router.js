import React from 'react';
import { Router, Switch, Route, Redirect } from 'dva/router';
import dynamic from 'dva/dynamic';
import App from './routes/App';
import Stack from './routes/Stack/';

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
    {
      path: '/stack',
      breadcrumbName: '应用管理',
      models: () => [require('./models/stack/stack'), require('./models/stack/service')],
      component: () => require('./routes/Stack/'),
    },
  ];
  return (
    <Router history={history}>
      <App>
        <Switch>
          <Route key="stack" path="/stack" >
            <Stack>
              <Switch>
                <Route exact path="/stack" render={() => (<Redirect push to={`/stack/list`} />)} />
                <Route exact path="/stack/list" component={dynamic({
                  app,
                  models: () => [require('./models/stack/stack')],
                  component: () => require('./routes/Stack/List'),
                })} />
                <Route exact path="/stack/list/:servicename" component={dynamic({
                  app,
                  models: () => [require('./models/stack/service')],
                  component: () => require('./routes/Stack/service/'),
                })} />
                <Route component={error} />
              </Switch>
            </Stack>
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