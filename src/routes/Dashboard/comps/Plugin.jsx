import { connect } from 'dva';
import PropTypes from 'prop-types'
import { Card, Row, Col } from 'antd';
import { AreaChart, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Area } from 'recharts';
import CountUp from 'react-countup';
//less
import styles from './Plugin.less';

const Plugin = ({ plugins }) => {
    let ep = [{
        name: '已激活插件（个）',
        length: plugins.filter(v => v.status === "active").length,
    }, {
        name: '未激活插件（个）',
        length: plugins.filter(v => v.status === "inactive").length,
    }, {
        name: '正在激活插件（个）',
        length: plugins.filter(v => v.status === "installing").length,
    }, {
        name: '正在卸载插件（个）',
        length: plugins.filter(v => v.status === "uninstalling").length,
    }, {
        name: '异常插件（个）',
        length: plugins.filter(v => v.status !== "active" &&
            v.status !== "inactive" &&
            v.status !== "installing" &&
            v.status !== "uninstalling").length,
    }]
    return (
        <div className={styles.plugin}>
            <Row className={styles.gutter_row}>
                <Card >
                    <Row gutter={24}>
                        <Col span="5" className={styles.main}>
                            <div className={styles.icon}>
                                <i className='iconfont icon-node '></i>
                            </div>
                            <div className={styles.info}>
                                <p className={styles.name}>Ceph存储情况</p>
                                <p className={styles.data}>
                                    <CountUp
                                        start={0}
                                        end={plugins.length}
                                        duration={.6}
                                        useEasing
                                        useGrouping
                                        separator=","
                                    />
                                </p>
                            </div>
                            <span className={styles.line}></span>
                        </Col>
                        <Col span="19">
                            <Row className={styles.subinfo}>
                                {ep.map((v, i) => <Col key={i} span={ep.length === i + 1 ? 4 : 5}>
                                    <p className={styles.name}>{v.name}</p>
                                    <p className={styles.data}>
                                        <CountUp
                                            start={0}
                                            end={v.length}
                                            duration={.6}
                                            useEasing
                                            useGrouping
                                            separator=","
                                        />
                                    </p>
                                </Col>)}
                            </Row>
                        </Col>
                    </Row>
                </Card>
            </Row>
            <Row gutter={24} className={styles.gutter_row}>
                {plugins.map(v => <Col key={v.spec.id} className={styles.gutter_col} xs={20} sm={16} md={12} lg={8} xl={6}>
                    <Card title={<p className={styles.plugin_title}>
                        <i className={`iconfont icon-${v.spec.id} ${styles.plugin_icon}`}></i>
                        <span className={styles.plugin_name}>{v.spec.name}</span>
                    </p>}>
                        {v.spec.intro}
                    </Card>
                </Col>)}
            </Row>
        </div>

    )
}

Plugin.propTypes = {

}

export default Plugin;