import { connect } from 'dva';
import PropTypes from 'prop-types'
import { Row, Col } from 'antd';
import { Metric, SysStatus, Plugin } from './comps/';
import styles from './index.less';

const Dashboard = ({ metric, dashboard }) => {
    const { plugins, sys_status } = dashboard;
    return (
        <div className={styles.dashboard}>
            <Row gutter={24} className={styles.gutter_row}>
                <Col span="24"><Metric {...metric} /></Col>
            </Row>
            <Row gutter={24} className={styles.gutter_row}>
                <Col span="24"><SysStatus data={sys_status} /></Col>
            </Row>
            <Row gutter={24} className={styles.gutter_row}>
                <Col span="24"><Plugin plugins={plugins} /></Col>
            </Row>
        </div >
    )
}

Dashboard.propTypes = {

}

export default connect(props => ({ ...props }))(Dashboard);