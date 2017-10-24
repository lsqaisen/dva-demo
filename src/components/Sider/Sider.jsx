import PropTypes from 'prop-types';
import { Link } from 'dva/router';
//antd
import { Menu, Icon, Button } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
//less
import styles from './Sider.less';

const Sider = ({ selectedKeys, menu, children, dispatch }) => {
	function handleClick(e) {
		dispatch({
			type: 'app/updateSelectKeys',
			payload: {
				selectedKeys: [e.key]
			}
		})
	}
	function setMenu(menudata) {
		let data = menudata.map(data => {
			if (data.submenu instanceof Array) {
				return <SubMenu key={data.key}
					title={data.title}>
					{setMenu(data.submenu)}
				</SubMenu>;
			} else {
				return <Menu.Item key={data.key}>
					<Link to={data.submenu}>{data.title}</Link>
				</Menu.Item>
			}
		});
		return data;
	}
	return (
		<div className={styles.sider}>
			<Menu className={styles.menu}
				onClick={handleClick}
				defaultSelectedKeys={selectedKeys}
				selectedKeys={selectedKeys}
				defaultOpenKeys={['list']}
				mode="inline"
			>
				{setMenu(menu)}
			</Menu>
		</div >
	)
}

Sider.propTypes = {

}

export default Sider;