import PropTypes from 'prop-types';
import { Link } from 'dva/router';
//antd
import { Icon } from 'antd';
import styles from "./Sider.less";

const Sider = ({ profile, menudata, dispatch }) => {
    menudata = menudata.filter(v => profile.admin || v.user);
    function handleClick(pathname) {
        dispatch({
            type: 'app/updateMenuData',
            payload: menudata.map((v, i) => {
                if (v.path === pathname) v.active = true;
                else v.active = false;
                return v;
            }),
        })
    }
    return (
        <div className={styles.sider}>
            <div className={styles.logobox}>
                <div className={styles.logo}><img src="/ui/oem/icon.png" alt="ekos" />EkOS</div>
            </div>
            <div className={styles.menu}>
                {menudata.map((data, index) => (
                    <div key={index} className={`${styles.menu_item} ${data.active ? styles.active : ""}`}>
                        <Link className={styles.menu_item_info} to={`${data.path}`} onClick={() => { handleClick(data.path) }}>
                            {data.path == "/dashboard" ? <Icon className={styles.icon} type="home" /> : <i className={`${styles.icon} iconfont icon-${data.path.replace('/', '')}`}></i>}
                            <span className={styles.text}>{data.name}</span>
                        </Link>
                    </div>)
                )}
            </div>
        </div>
    )
}

// App.propTypes = {
//     location: PropTypes.object,
//     dispatch: PropTypes.func,
// }

export default Sider;