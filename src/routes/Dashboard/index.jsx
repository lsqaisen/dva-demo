import { connect } from 'dva';
import PropTypes from 'prop-types'
import { Row, Col } from 'antd';
import { Metric, SysStatus, Plugin } from './comps/';
import styles from './index.less';


import { Card, Badge, Button, Modal } from 'antd';

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
                    <Modal
            key="2323"
            maskClosable={false}
            wrapClassName="vertical-center-modal"
            title="添加应用"
            visible={true}
            confirmLoading={false}
            onOk={() => { }}
            onCancel={() => { }}
        >
            {Math.random()}
        </Modal>
        </div >
    )
}

Dashboard.propTypes = {

}

export default connect(props => ({ ...props }))(Dashboard);