//dva
import { connect } from 'dva';
//
import PropTypes from 'prop-types'
//antd
import { Card, Row, Col } from 'antd';
//recharts
import { AreaChart, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Area } from 'recharts';
//less
import styles from './Metric.less';

const Metric = ({ data }) => {
    const tipCpu = (props) => {
        const { label, payload } = props;
        return <div>
            <p> 时间：<span>{`${label ? (new Date(label * 1000)).toLocaleDateString() : label}`}</span></p>
            <p> CPU使用：<span>{`${(payload[0] || { value: 0 }).value / 1000} 核`}</span></p>
        </div>
    }

    const tipMem = (props) => {
        const { label, payload } = props;
        return <div>
            <p> 时间：<span>{`${label ? (new Date(label * 1000)).toLocaleDateString() : label}`}</span></p>
            <p> 内存使用：<span>{`${(payload[0] || { value: 0 }).value} M`}</span></p>
        </div>
    }

    return (
        <Card className={styles.resoure} title={<p>系统资源使用情况</p>}>
            <Row gutter={24}>
                <Col span="8" className={styles.resoure_col}>
                    <Row className={styles.title} >
                        <p>CPU使用核数（核）</p>
                        <h3>{`${(data.cpu.slice(-1)[0] || [{ x: 0, y: 0 }]).y / 1000}`}</h3>
                    </Row>
                    <Row>
                        <ResponsiveContainer height={152}>
                            <AreaChart data={data.cpu} >
                                <Tooltip content={tipCpu} />
                                <XAxis dataKey="x" hide />
                                <Area type='monotone' dataKey='y' stroke='#2DB7F5' fill='#DAEEFB' />
                            </AreaChart>
                        </ResponsiveContainer>
                    </Row>
                    <span className={styles.line}></span>
                </Col>
                <Col span="8" className={styles.resoure_col}>
                    <Row className={styles.title} >
                        <p>内存使用情况（M）</p>
                        <h3>{`${(data.mem.slice(-1)[0] || [{ x: 0, y: 0 }]).y}`}</h3>
                    </Row>
                    <Row>
                        <ResponsiveContainer height={152}>
                            <AreaChart data={data.mem} >
                                <Tooltip content={tipMem} />
                                <XAxis dataKey="x" hide />
                                <Area type='monotone' dataKey='y' stroke='#7DC856' fill='#E5F4DD' />
                            </AreaChart>
                        </ResponsiveContainer>
                    </Row>
                    <span className={styles.line}></span>
                </Col>
                <Col span="8" className={styles.resoure_col}>
                    <Row className={styles.title} >
                        <p>磁盘使用情况（核）</p>
                        <h3>0.75</h3>
                    </Row>
                    <Row>
                        <ResponsiveContainer height={152}>
                            <AreaChart data={data.cpu} >
                                <Tooltip />
                                <Area type='monotone' dataKey='y' stroke='#FFD76D' fill='#FFF7E2' />
                            </AreaChart>
                        </ResponsiveContainer>
                    </Row>
                </Col>
            </Row>
        </Card>
    )
}

Metric.propTypes = {

}

export default Metric;