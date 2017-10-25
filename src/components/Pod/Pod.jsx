import PropTypes from 'prop-types'
import Time from 'react-time-format'
import { Table, Popconfirm } from 'antd'
import Status from '../Status'
import Metric from './Metric'
import Cntr from './Cntr'
import styles from './Pod.less'


const Pod = ({ data, expandedRowKeys, podMetric, metrics }) => {
	const table = {
		pagination: {
			total: 0,
			showSizeChanger: true,
			showQuickJumper: true,
			showTotal: total => `共 ${total} 条`
		},
		dataSource: data.map(pod => {
			pod.key = pod.name;
			return pod;
		}),
		expandedRowRender: (record) => {
			return <span>
				<Metric data={metrics[record.name]} />
				{<Cntr data={record.containers || []} />}
			</span>
		},
		expandedRowKeys,
		columns: [
			{
				title: '副本名称',
				dataIndex: 'name',
				key: 'name',
			}, {
				title: 'IP地址',
				dataIndex: 'podip',
				key: 'podip',
			}, {
				title: '容器数量',
				dataIndex: 'containers',
				key: 'containers',
				render: text => text && text.length ? text.length : 0,
			}, {
				title: '重启次数',
				dataIndex: 'restartCount',
				key: 'restartCount',
			}, {
				title: '启动时间',
				dataIndex: 'startTime',
				key: 'startTime',
				render: (t, r, i) => t ? <Time value={new Date(t)} format="YYYY-MM-DD  HH:mm" /> : <p>--</p>
			}, {
				title: '状态',
				dataIndex: 'status',
				key: 'status',
				render: (t, r, i) => <Status status={t} text={t} />,
			}, {
				title: '主机IP',
				dataIndex: 'hostip',
				key: 'hostip'
			}, {
				title: '操作',
				key: 'action',
				render: (text, record) => (
					<div>
						{/* <Event name={record.name} namespace={this.props.ekos.current} /> */}
						<span className="ant-divider" />
						{/* <Popconfirm
						placement="topLeft"
						title={`是否确认删除副本${record.name}`}
						onConfirm={() => this.deletePod(record.name)}
						okText="确认"
						cancelText="取消">
						<a href="javascript:;">删除</a>
					</Popconfirm> */}
					</div>
				),
			}
		],
	}

	return <Table className={styles.table} {...table} onExpand={(expanded, record) => { podMetric(expanded, record.name); }} />;
}

Pod.propTypes = {
	data: PropTypes.array.isRequired,
	expandedRowKeys: PropTypes.array.isRequired,
	podMetric: PropTypes.func.isRequired,
	metrics: PropTypes.object.isRequired,
}

export default Pod;