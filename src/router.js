import { Router, Switch, Route, Redirect } from 'dva/router';
import dynamic from 'dva/dynamic';
import App from './routes/App';
import StackRoutes from './routes/Stack/';
import Layout from './routes/Stack/Layout';

function RouterConfig({ history, app }) {
	const error = dynamic({
		app,
		component: () => import('./routes/Error/'),
	})
	return (
		<Router history={history}>
			<App>
				<Switch>
					<Route path="/stack" >
						{StackRoutes({ app })}
						{/* <Layout>
							<Switch>[
				<Route exact path="/stack" render={() => (<Redirect push to={`/stack/list`} />)} />
								<Route exact path="/stack/list" component={dynamic({
									app,
									models: () => [require('./models/stack/list')],
									component: () => require('./routes/Stack/StackList'),
								})} />
								<Route component={error} />
							</Switch>
						</Layout> */}
					</Route>
					<Route exact path="/dashboard" component={dynamic({
						app,
						models: () => [require('./models/dashboard/dashboard'), require('./models/dashboard/metric')],
						component: () => require('./routes/Dashboard/'),
					})} >
					</Route>
					<Route exact path="/login" component={require('./routes/Login/')} >
					</Route>
					{/* <Route exact path="/stack/list" component={dynamic({
						app,
						models: () => [require('./models/stack/list')],
						component: () => require('./routes/Stack/StackList'),
					})} /> */}
				</Switch>
			</App>
		</Router>
	);
}

export default RouterConfig;