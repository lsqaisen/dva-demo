
import {Component} from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'dva/router'
import dynamic from 'dva/dynamic'
import Layout from './Layout'

// class StackRoutes extends Component {
// 	constructor(props) {
// 		super(props);
// 		console.log(234234)
// 	}

// 	render() {
// 		const { app } = this.props;
// 		const error = dynamic({
// 			app,
// 			component: () => import('../Error/'),
// 		});
// 		return (
// 			<Layout key='xxxxx'>
// 				<Switch>
// 					<Route exact path="/stack" render={() => (<Redirect push to={`/stack/list`} />)} />
// 					<Route exact path="/stack/list" component={dynamic({
// 						app,
// 						models: () => [require('../../models/stack/list')],
// 						component: () => require('./StackList'),
// 					})} />
// 					<Route exact path="/stack/list/:stackname" component={dynamic({
// 						app,
// 						models: () => [require('../../models/stack/stack')],
// 						component: () => require('./Stack'),
// 					})} />
// 					<Route exact path="/stack/list/:stackname/:servicename" component={dynamic({
// 						app,
// 						models: () => [require('../../models/stack/service')],
// 						component: () => require('./Service'),
// 					})} />
// 					<Route component={error} />
// 				</Switch>
// 			</Layout>
// 		)
// 	}
// }

const StackRoutes = function({ app }){
	const error = dynamic({
		app,
		component: () => import('../Error/'),
	});
	return (
		<Layout>
			<Switch>
				<Route exact path="/stack" render={() => (<Redirect push to={`/stack/list`} />)} />
				<Route exact path="/stack/list" component={dynamic({
					app,
					models: () => [require('../../models/stack/list')],
					component: () => require('./StackList'),
				})} />
				<Route exact path="/stack/list/:stackname" component={dynamic({
					app,
					models: () => [require('../../models/stack/stack')],
					component: () => require('./Stack'),
				})} />
				<Route exact path="/stack/list/:stackname/:servicename" component={dynamic({
					app,
					models: () => [require('../../models/stack/service')],
					component: () => require('./Service'),
				})} />
				<Route component={error} />
			</Switch>
		</Layout>
	)
}

StackRoutes.propTypes = {
	app: PropTypes.object.isRequired,
}

export default StackRoutes;
