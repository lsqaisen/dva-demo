import PropTypes from 'prop-types'
import Time from 'react-time-format'
import { Table, Popconfirm, Tag } from 'antd'
import styles from './History.less'

const History = ({ data, service }) => {
	const table = {
		pagination: {
			total: 0,
			showSizeChanger: true,
			showQuickJumper: true,
			showTotal: total => `共 ${total} 条`
		},
		dataSource: data.map(history => {
			history.key = history.revision;
			return history;
		}),
		columns: [
            {
                title: '版本',
                dataIndex: 'revision',
                key: 'revision',
                render: text => {
                    return <a href="javascript:;">{service.revision == text ? <Tag color="#2db7f5">当前版本</Tag> : ''} #{text} </a>;
                },
            },
            {
                title: '信息',
                dataIndex: 'changeCause',
                key: 'changeCause',
                width: '40%',
            },
            {
                title: '更新时间',
                dataIndex: 'creationTimestamp',
                key: 'creationTimestamp',
                render: (t, r, i) => <Time value={new Date(t)} format="YYYY-MM-DD  HH:mm" />
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <span>
                        <Popconfirm
                            placement="topLeft"
                            title={`是否将服务${service.name}回滚到版本#${record.revision}`}
                            onConfirm={()=>{}}
                            okText="确认"
                            cancelText="取消">
                            <a href="javascript:;" disabled={service.revision == record.revision}> 回滚</a>
                        </Popconfirm>
                    </span>
                ),
            }
		],
	}

	return <Table className={styles.table} {...table} onExpand={(expanded, record) => { podMetric(expanded, record.name); }} />;
}

History.propTypes = {
    service: PropTypes.object.isRequired,
	data: PropTypes.array.isRequired,
}

export default History;