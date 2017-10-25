import { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'dva/router';
import { Menu, Icon, Button } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
//less
import styles from './Sider.less';

class Sider extends Component {
	constructor(props) {
		super(props);
	}
	handleClick(e) {
		this.props.dispatch({
			type: 'app/updateSelectKeys',
			payload: {
				selectedKeys: [e.key]
			}
		})
	}
	setMenu(menudata) {
		let data = menudata.map(data => {
			if (data.submenu instanceof Array) {
				return <SubMenu key={data.key}
					title={data.title}>
					{this.setMenu(data.submenu)}
				</SubMenu>;
			} else {
				return <Menu.Item key={data.key}>
					<Link to={data.submenu}>{data.title}</Link>
				</Menu.Item>
			}
		});
		return data;
	}
	render() {
		let { selectedKeys, menu } = this.props;
		return (
			<div className={styles.sider}>
				<Menu className={styles.menu} style={{minHeight: 'calc(100% - 24px)'}}
					onClick={this.handleClick.bind(this)}
					defaultSelectedKeys={selectedKeys}
					selectedKeys={selectedKeys}
					defaultOpenKeys={['list']}
					mode="inline"
				>
					{this.setMenu(menu)}
				</Menu>
			</div >
		)
	}
}

export default Sider;