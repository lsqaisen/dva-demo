import { connect } from 'dva';
import PropTypes from 'prop-types'
import { Link, Route, Redirect } from 'dva/router';
import { Menu, Icon, Button } from 'antd';
import { Service as ServiceComps } from '../../components/Stack';
import { Loading } from '../../components/Loading';
import Error from '../../components/Error';
//less
import styles from './Service.less';

const Service = ({ service, dispatch }) => {
	const { loading, data, selectService, expandedRowKeys, metrics, history } = service;
	const _service = {
		data,
		selectService,
		expandedRowKeys,
		metrics,
		history,
		podMetric: (expanded, podname) => {
			dispatch({
				type: 'service/podMetric',
				payload: {
					podname,
					expanded,
				}
			})
		}
	}
	return (
		<div className={styles.service}>
			{
				loading ? <Loading loading={loading} /> :
					!data ? <Error message={`服务${selectService}不存在`} /> : <ServiceComps {..._service} />
			}
		</div >
	)
}

Service.propTypes = {
	service: PropTypes.object.isRequired,
	dispatch: PropTypes.func.isRequired,
}

export default connect(({ service, dispatch }) => ({ service, dispatch }))(Service);