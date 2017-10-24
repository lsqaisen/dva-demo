import { connect } from 'dva';
import PropTypes from 'prop-types'
import { Route, Redirect, Switch, Link } from 'dva/router';
import dynamic from 'dva/dynamic';
//antd
import { Menu, Icon, Button } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

import Error from '../Error';
//
import Sider from '../../components/Sider/Sider';
//less
import styles from './index.less';
import Service from './service';

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
		<div className={styles.stack}>
			<Sider {...sider} />
			<div className={styles.content}>{children}</div>
		</div >
	)
}

Stack.propTypes = {

}

export default connect(props => ({ ...props }))(Stack);