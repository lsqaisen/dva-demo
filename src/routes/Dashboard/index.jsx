import { connect } from 'dva';
import PropTypes from 'prop-types'
//antd
import { Row, Col } from 'antd';
//
import { Metric, SysStatus, Plugin } from './comps/';
//less
import styles from './index.less';

const Dashboard = ({ metric, dashboard }) => {
    const { plugins} = dashboard;
    return (
        <div className={styles.dashboard}>
            <Row gutter={24} className={styles.gutter_row}>
                <Col span="24"><Metric {...metric} /></Col>
            </Row>
            <Row gutter={24} className={styles.gutter_row}>
                <Col span="24"><SysStatus /></Col>
            </Row>
            <Row gutter={24} className={styles.gutter_row}>
                <Col span="24"><Plugin plugins={plugins}/></Col>
            </Row>
            dashboard
        </div >
    )
}

Dashboard.propTypes = {

}

export default connect(props => ({ ...props }))(Dashboard);