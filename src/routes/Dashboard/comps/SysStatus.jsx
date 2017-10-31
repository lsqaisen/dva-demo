//dva
import { connect } from 'dva';
//
import PropTypes from 'prop-types'
import { Card, Row, Col } from 'antd';
import { AreaChart, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Area } from 'recharts';
import CountUp from 'react-countup';
//less
import styles from './SysStatus.less';

const SysStatus = ({ data }) => {
    console.log(data,123)
    return (
        <Row gutter={24}>
            <Col span="18" >
                <Row className={styles.gutter_row}>
                    <Card bodyStyle={{ padding: '24px' }}>
                        <Row gutter={24}>
                            <Col span="8" className={styles.main}>
                                <div className={styles.icon}>
                                    <i className='iconfont icon-node '></i>
                                </div>
                                <div className={styles.info}>
                                    <p className={styles.name}>主机总量</p>
                                    <p className={styles.data}>
                                        <CountUp
                                            start={0}
                                            end={data.nodes}
                                            duration={2.75}
                                            useEasing
                                            useGrouping
                                            separator=","
                                        />
                                    </p>
                                </div>
                                <span className={styles.line}></span>
                            </Col>
                            <Col span="16" className={styles.main}>
                                <Row className={styles.subinfo}>
                                    <Col span="8">
                                        <p className={styles.name}>公共主机（个）</p>
                                        <p className={styles.data}>
                                            <CountUp
                                                start={0}
                                                end={data.publicNode}
                                                duration={2.75}
                                                useEasing
                                                useGrouping
                                                separator=","
                                            />
                                        </p>
                                    </Col>
                                    <Col span="8">
                                        <p className={styles.name}>私有主机（个）</p>
                                        <p className={styles.data}>
                                            <CountUp
                                                start={0}
                                                end={data.privateNode}
                                                duration={2.75}
                                                useEasing
                                                useGrouping
                                                separator=","
                                            />
                                        </p>
                                    </Col>
                                    <Col span="8">
                                        <p className={styles.name}>可调度主机（个）</p>
                                        <p className={styles.data}>
                                            <CountUp
                                                start={0}
                                                end={data.scheduleNode}
                                                duration={2.75}
                                                useEasing
                                                useGrouping
                                                separator=","
                                            />
                                        </p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Card>
                </Row>
                <Row gutter={24} className={styles.gutter_row}>
                    <Col span="12" >
                        <Card className={styles.service}>
                            <Row>
                                <div className={styles.icon}>
                                    <i className='iconfont icon-node '></i>
                                </div>
                                <div className={styles.info}>
                                    <Row>
                                        <p className={styles.name}>运行中的服务</p>
                                        <p className={styles.data}>
                                            <CountUp
                                                start={0}
                                                end={data.appsRunning}
                                                duration={2.75}
                                                useEasing
                                                useGrouping
                                                separator=","
                                            />
                                        </p>
                                    </Row>
                                    <Row>
                                        <p className={styles.name}>已停止的服务</p>
                                        <p className={styles.data}>
                                            <CountUp
                                                start={0}
                                                end={data.appsNotRunning}
                                                duration={2.75}
                                                useEasing
                                                useGrouping
                                                separator=","
                                            />
                                        </p>
                                    </Row>
                                </div>
                            </Row>
                        </Card>
                    </Col>
                    <Col span="12">
                        <Card className={styles.cntr}>
                            <Row>
                                <div className={styles.icon}>
                                    <i className='iconfont icon-node '></i>
                                </div>
                                <div className={styles.info}>
                                    <Row>
                                        <p className={styles.name}>运行中的副本</p>
                                        <p className={styles.data}>
                                            <CountUp
                                                start={0}
                                                end={data.podRunning}
                                                duration={2.75}
                                                useEasing
                                                useGrouping
                                                separator=","
                                            />
                                        </p>
                                    </Row>
                                    <Row>
                                        <p className={styles.name}>已停止的副本</p>
                                        <p className={styles.data}>
                                            <CountUp
                                                start={0}
                                                end={data.podNotRuning}
                                                duration={2.75}
                                                useEasing
                                                useGrouping
                                                separator=","
                                            />
                                        </p>
                                    </Row>
                                </div>
                            </Row>
                        </Card>
                    </Col>
                </Row>
                <Row className={styles.gutter_row} style={{ marginBottom: 0 }}>
                    <Card className={styles.ceph} >
                        <Row gutter={24}>
                            <Col span="8" className={styles.main}>
                                <div className={styles.icon}>
                                    <i className='iconfont icon-node '></i>
                                </div>
                                <div className={styles.info}>
                                    <p className={styles.name}>Ceph存储情况</p>
                                    <p className={styles.data}>
                                        <CountUp
                                            start={0}
                                            end={1231234}
                                            duration={2.75}
                                            useEasing
                                            useGrouping
                                            separator=","
                                        />
                                    </p>
                                    <p className={styles.subdata}>
                                        <span>
                                            <CountUp
                                                start={0}
                                                end={12314}
                                                duration={2.75}
                                                useEasing
                                                useGrouping
                                                separator=","
                                            />
                                            (<CountUp
                                                start={0}
                                                end={14}
                                                duration={2.75}
                                                useEasing
                                                useGrouping
                                                separator=","
                                            />%)
                                        </span>
                                        使用情况（M）
                                    </p>
                                </div>
                                <span className={styles.line}></span>
                            </Col>
                            <Col span="16" className={styles.main}>
                                <Row className={styles.subinfo}>
                                    <Col span="8">
                                        <p className={styles.name}>Ceph网关（RGW）节点数</p>
                                        <p className={styles.data}>
                                            <CountUp
                                                start={0}
                                                end={14}
                                                duration={2.75}
                                                useEasing
                                                useGrouping
                                                separator=","
                                            />
                                        </p>
                                        <p className={styles.subdata}>
                                            <span>
                                                <CountUp
                                                    start={0}
                                                    end={14}
                                                    duration={2.75}
                                                    useEasing
                                                    useGrouping
                                                    separator=","
                                                />
                                            </span>
                                            运行节点数
                                        </p>
                                    </Col>
                                    <Col span="8">
                                        <p className={styles.name}>Ceph存储（OSD）节点数</p>
                                        <p className={styles.data}>
                                            <CountUp
                                                start={0}
                                                end={14}
                                                duration={2.75}
                                                useEasing
                                                useGrouping
                                                separator=","
                                            />
                                        </p>
                                        <p className={styles.subdata}>
                                            <span>
                                                <CountUp
                                                    start={0}
                                                    end={11}
                                                    duration={2.75}
                                                    useEasing
                                                    useGrouping
                                                    separator=","
                                                />
                                            </span>
                                            运行节点数
                                        </p>
                                    </Col>
                                    <Col span="8">
                                        <p className={styles.name}>Ceph监控（MON）节点数</p>
                                        <p className={styles.data}>
                                            <CountUp
                                                start={0}
                                                end={12}
                                                duration={2.75}
                                                useEasing
                                                useGrouping
                                                separator=","
                                            />
                                        </p>
                                        <p className={styles.subdata}>
                                            <span>
                                                <CountUp
                                                    start={0}
                                                    end={14}
                                                    duration={2.75}
                                                    useEasing
                                                    useGrouping
                                                    separator=","
                                                />
                                            </span>
                                            运行节点数
                                        </p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Card>
                </Row>
            </Col>
            <Col span="6">
                <Card title="系统状态" bodyStyle={{height: '422px'}}>

                </Card>
            </Col>
        </Row>
    )
}

SysStatus.propTypes = {

}

export default SysStatus;