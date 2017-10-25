import PropTypes from 'prop-types'
import Time from 'react-time-format'
import { Row, Col, Button } from 'antd'
import { AreaChart, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Area } from 'recharts'
import Status from '../Status'
import styles from './Metric.less'


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
        <Row gutter={16} style={{ marginTop: 12, paddingBottom: 12, borderBottom: '1px solid #ccc' }}>
            <Col span="24"><Button size="small" type="primary" icon="reload" style={{ float: 'right' }} onClick={() => { }}>刷新</Button></Col>
            <Col span="12">
                <ResponsiveContainer height={152}>
                    <AreaChart data={data.cpu} >
                        <Tooltip />
                        <XAxis dataKey="x" />
                        <Area type='monotone' dataKey='y' stroke='#2DB7F5' fill='#DAEEFB' />
                    </AreaChart>
                </ResponsiveContainer>
            </Col>
            <Col span="12">
                <ResponsiveContainer height={152}>
                    <AreaChart data={data.cpu} >
                        <Tooltip />
                        <XAxis dataKey="x" />
                        <Area type='monotone' dataKey='y' stroke='#2DB7F5' fill='#DAEEFB' />
                    </AreaChart>
                </ResponsiveContainer>
            </Col>
        </Row>
    );
}

Metric.propTypes = {
    data: PropTypes.object.isRequired,
}

export default Metric;