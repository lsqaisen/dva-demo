import PropTypes from 'prop-types';
import { Link } from 'react-router';
//antd
import { Breadcrumb, Icon, Menu, Modal } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

import styles from "./Header.less";

function itemRender(route, params, routes, paths) {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? <span>{route.breadcrumbName}</span> : <Link to={paths.join('/')}>{route.breadcrumbName}</Link>;
}

const Header = ({ profile, routes, params, dispatch }) => {
    function handleClick(v) {
        switch (v.key) {
            case 'setadmin':
                dispatch({
                    type: 'app/profile',
                    payload: {
                        pathname: `/`,
                        admin: profile.admin ? 'off' : 'on',
                        current: profile.current,
                    }
                });
                break;
            case 'logout':
                window.location.href = '/api/logout';
                break;
            case 'about':
                Modal.info({
                    title: '关于我们',
                    content: (
                        <div>
                            <div>版本: {profile.version}, build {___VERSION___}</div>
                        </div>
                    ),
                });
                break;
            case 'help':
                Modal.info({
                    title: '帮助',
                    content: (
                        <div>
                            <div>Ecos Kubernetes</div>
                        </div>
                    ),
                });
                break;
            case 'changepwd':
                // this.setState({ visible: true });
                break;
            default:
                // if (e.key.indexOf('project_') != -1 && this.ekos.current != e.key.split('project_')[1]) {
                // 	this.changeAdmin(this.ekos.admin ? 'on' : 'off', e.key.split('project_')[1]);
                // }
                break;
        };
    }
    return (
        <div className={styles.header}>
            <div className={styles.bc_box}>
                <Breadcrumb itemRender={itemRender} className={`${styles.ekos_breadcrumb}`} routes={routes} params={params} />
            </div>
            <div className={styles.right}>
                <Menu mode="horizontal" onClick={handleClick}>
                    {(profile.projects || []).length > 0 ? <SubMenu title={<span>
                        <span className={styles.icon_box}>
                            <i className={`iconfont icon-space`}></i>
                        </span>
                        {`${profile.current}`}
                    </span>}>
                        <MenuItemGroup title="工作空间">
                            {profile.projects.map(project => <Menu.Item key={`project_${project.name}`} className={profile.current == project.name ? 'ant-menu-item-selected' : ''}>
                                {project.name}
                            </Menu.Item>)}
                        </MenuItemGroup>
                    </SubMenu> : []}
                    <SubMenu title={<span className={styles.user_info}>
                        <span className={styles.icon_box}>
                            <i className={`iconfont icon-${profile.admin ? 'admin' : 'user'}`}></i>
                        </span>
                        <span className={styles.user_name}>{`${profile.username}`}</span>
                    </span>} >
                        {(profile.projects || []).length > 0 && (profile.groups || '').indexOf('ekos:system:users') != -1 ? [<Menu.Item key="setadmin">{profile.admin ? '租户控制台' : '管理控制台'}</Menu.Item>, <Menu.Divider key="divider" />] : []}
                        <Menu.Item key="changepwd"><Icon type="lock" /> 修改密码</Menu.Item>
                        <Menu.Item key="about"><Icon type="bulb" /> 关于</Menu.Item>
                        <Menu.Item key="help"><Icon type="info-circle-o" /> 帮助</Menu.Item>
                        <Menu.Divider />
                        <Menu.Item key="logout"><Icon type="logout" /> 退出</Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        </div>
    )
}

Header.propTypes = {
    profile: PropTypes.object,
    routes: PropTypes.array,
    params: PropTypes.object,
    dispatch: PropTypes.func,
}

export default Header