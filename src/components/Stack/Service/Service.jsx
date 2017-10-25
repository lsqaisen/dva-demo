import PropTypes from 'prop-types'
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;
import Header from '../../Header';
import styles from './Service.less';
import Status from '../../Status';
import { Basic, History } from './'
import Pod from '../../Pod/Pod'

const Service = ({ data, selectService, podMetric, expandedRowKeys, metrics, history }) => {
	const pod = {
		data: data.pods,
		podMetric,
		expandedRowKeys,
		metrics,
	}
	return (
		<div className={styles.service}>
			<div className={styles.header}>
				<Header
					icon={<i className={`iconfont menu-icon icon-service`}></i>}
					name={selectService}
					status={<Status status={data.status} text={data.status} />} />
			</div>

			<Tabs defaultActiveKey={"details"} animated={false} className={styles.tabsinfo}>
				<TabPane tab="详细信息" key="details">
					<div className={styles.details}>
						<h3 className={styles.title}>基础信息</h3>
						<Basic service={data} />
						<h3 className={styles.title}>副本信息</h3>
						<Pod {...pod} />
						<h3 className={styles.title}>历史版本</h3>
						<History data={history} service={data} />
					</div>
				</TabPane>
				<TabPane tab="配置信息" key="config">
					2222
				</TabPane>
				<TabPane tab="导出端口" key="ports">
					3333
				</TabPane>
				<TabPane tab="网络存储" key="newwork">
					4444
				</TabPane>
				<TabPane tab="动态伸缩" key="autoscale">5555</TabPane>
				{/* <TabPane tab="服务事件" key="event">6666</TabPane>
				<TabPane tab="系统日志" key="logs">7777</TabPane>
				<TabPane tab="Yaml文件" key="yaml">88888</TabPane> */}
			</Tabs>
		</div>
	)
}

Service.propTypes = {
	data: PropTypes.object.isRequired,
	selectService: PropTypes.string.isRequired,
	expandedRowKeys: PropTypes.array.isRequired,
	podMetric: PropTypes.func.isRequired,
	metrics: PropTypes.object.isRequired,
	history: PropTypes.array.isRequired,
}

export default Service;