import { connect } from 'dva';
import PropTypes from 'prop-types'
import Sider from '../../components/Sider/Sider';
import styles from './Layout.less';

const Stack = ({ app, children, dispatch }) => {
	const { selectedKeys } = app;
	const sider = {
		selectedKeys,
		menu: [
			{
				"key": "list",
				"title": "我的应用",
				"submenu": "/stack/list",
			}, {
				"key": "lblist",
				"title": "负载均衡",
				"submenu": "/stack/lblist"
			}, {
				"key": "imex",
				"title": "导入导出",
				"submenu": "/stack/imex"
			}, {
				"key": "topology",
				"title": "拓扑图",
				"submenu": "/stack/topology"
			}, {
				"key": "secretlist",
				"title": "证书列表",
				"submenu": "/stack/secretlist"
			}, {
				"key": "configmap",
				"title": "配置管理",
				"submenu": "/stack/configmap"
			}
		],
		dispatch,
	}
	return (
		<div className={styles.layout}>
			<Sider {...sider} />
			<div className={styles.content}>{children}</div>
		</div >
	)
}

Stack.propTypes = {
	app: PropTypes.object.isRequired,
	children: PropTypes.element.isRequired,
	dispatch: PropTypes.func.isRequired,
}

export default connect(props => ({ ...props }))(Stack);