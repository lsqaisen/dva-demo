import PropTypes from 'prop-types'
import { Row, Col, InputNumber } from 'antd';
import Time from 'react-time-format';
import styles from './Basic.less';


const Basic = ({ service, podNum, editPodNum }) => {
	return (
		<div className={styles.basic}>
			<Row className={styles.info}>
				<Col span="2"><p>服务名称：</p></Col>
				<Col span="10"><p >{service.name}</p></Col>
				<Col span="2"><p className="di-title">创建时间：</p></Col>
				<Col span="10"><p><Time value={new Date(service.creationTimestamp)} format="YYYY-MM-DD HH:mm" /></p></Col>
			</Row>
			<Row className={styles.info}>
				<Col span="2"><p >服务IP：</p></Col>
				<Col span="10"><p>{!!service.service && !!service.service.clusterIP ? (!!service.stateful && service.stateful == "none" ? service.service.clusterIP : '有状态服务没有IP') : '未知'}</p></Col>
				<Col span="2"><p>当前副本：</p></Col>
				<Col span="10">
					{
						editPodNum ? <span>
							<span style={{ marginRight: '12' }}><InputNumber
								style={{ width: '120px' }}
								min={service.autoScale.minReplicas == 0 ? 1 : service.autoScale.minReplicas}
								max={service.autoScale.maxReplicas == 0 ? 5000 : service.autoScale.maxReplicas}
								value={podNum}
								onChange={(v) => {
									// this.setState({ podNum: v })
								}} /> 个 </span>,
						<a href="javascript:;" onClick={(v) => {
								// reqwest({
								// 	url: `/service/stack/api/app/scale`
								// 	, type: 'json'
								// 	, contentType: 'application/json'
								// 	, method: 'post'
								// 	, data: JSON.stringify({
								// 		name: service.name,
								// 		stack: service.stack,
								// 		namespace: this.ekos.current,
								// 		replicas: this.state.podNum,
								// 	}),
								// }).then((data) => {
								// 	service.replicas = this.state.podNum;
								// 	!!this.props.update && this.props.update();
								// 	this.setState({ editPodNum: false })
								// }, (err, msg) => {
								// 	console.error(err, msg)
								// });
							}}>确认</a>,
						<span className="ant-divider" />,
						<a href="javascript:;" onClick={() => {
								// this.setState({ editPodNum: false, podNum: service.replicas })
							}}>取消</a>
						</span> :
							<span>
								<span style={{ marginRight: '12' }}>{`${service.replicas}个`} </span>,
							<a href="javascript:;" onClick={() => {
									// this.setState({ editPodNum: true })
								}}>更改</a>
							</span>
					}
				</Col>
			</Row>
			{service.autoScale ? <Row className={styles.info}>
				<Col span="2">
					<p className="di-title">副本限制：</p>
				</Col>,
				<Col span="10">
					{service.autoScale.minReplicas == 0 && service.autoScale.maxReplicas == 0 ?
						"未配置动态伸缩" :
						<p>{`${service.autoScale.minReplicas} 个最小副本数，${service.autoScale.maxReplicas} 个最大副本数`}</p>}
				</Col>
			</Row> : ''}
			<Row className={styles.info}>
				<Col span="2"><p className="di-title">规格：</p></Col>
				<Col span="22"><p>
					{`${service.cpu / 1000}核 CPU，${service.memory / 1000}GB 内存，20GB本地磁盘`}
					{!!service.stateful && service.stateful != "none" ? ['，', <span>{`${service.stateful == 'share' ? '共享' : '不共享'}`}网络磁盘</span>] : ""} </p></Col>
			</Row>
		</div>
	)
}

Basic.propTypes = {
	service: PropTypes.object.isRequired,
}

export default Basic;