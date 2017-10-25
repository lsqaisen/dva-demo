import PropTypes from 'prop-types'
import Time from 'react-time-format'
import { Table, Tooltip } from 'antd'
import Status from '../Status'
import Metric from './Metric'
import styles from './Cntr.less'


const Cntr = ({ data }) => {
    const table = {
        pagination: false,
        dataSource: data.map(cntr => {
            cntr.key = cntr.name;
            return cntr;
        }),
        columns: [
            {
                title: '容器名',
                dataIndex: 'name',
                key: 'name',
                className: styles.ellipsis_tb,
                render: (text, record, index) => {
                    return <div className={styles.ellipsis_box}>
                        <Tooltip placement="topLeft" title={text}>
                            <p className="ellipsis">{text}</p>
                        </Tooltip>
                    </div>;
                }
            }, {
                title: '镜像',
                dataIndex: 'image',
                key: 'image',
                width: '20%',
                className: styles.ellipsis_tb,
                render: (text, record, index) => {
                    return <div className={styles.ellipsis_box}>
                        <Tooltip placement="topLeft" title={text}>
                            <p className="ellipsis">{text}</p>
                        </Tooltip>
                    </div>;
                }
            }, {
                title: '启动命令',
                dataIndex: 'command',
                key: 'command',
                className: styles.ellipsis_tb,
                render: (text, record, index) => {
                    return <div className={styles.ellipsis_box}>
                        <Tooltip placement="topLeft" title={text}>
                            <p className="ellipsis">{text}</p>
                        </Tooltip>
                    </div>;
                }
            }, {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                render: (t, r, i) => <Status status={t} text={t} />,
            }, {
                title: '资源占用',
                dataIndex: 'resource',
                key: 'resource',
                render: (text, record) => <span><p>CPU权重：{record.cpuPercent}%</p><p>内存占比：{record.memPercent}%</p></span>,
            }, {
                title: '健康检测',
                dataIndex: 'healthCheck',
                key: 'healthCheck',
                render: (text, record) => {
                    if (!!record.healthCheck && !!record.healthCheck.protocol && record.healthCheck.protocol != "NONE") {
                        return <p>
                            {`${record.healthCheck.protocol}:${record.healthCheck.protocol == "TCP" ?
                                record.healthCheck.tcpSocket.port : record.healthCheck.protocol == "HTTP" ?
                                    record.healthCheck.httpGet.port : ''}`}，
                            <Tooltip placement="left" title={<div>
                                <p>初始化延时：{record.healthCheck.initialDelaySeconds}秒</p>
                                <p>检测间隔：{record.healthCheck.periodSeconds}秒</p>
                                <p>响应时限：{record.healthCheck.timeoutSeconds}秒</p>
                                <p>健康阈值：{record.healthCheck.successThreshold}秒</p>
                                <p>故障阈值：{record.healthCheck.failureThreshold}秒</p>
                            </div>}>
                                <a href="javascrip:;"> 详情</a>
                            </Tooltip>
                        </p>
                    } else {
                        return '未开启';
                    }
                },
            }
        ],
    }

    return <Table className={styles.table} {...table} />;
}

Cntr.propTypes = {
    data: PropTypes.array.isRequired,
}

export default Cntr;