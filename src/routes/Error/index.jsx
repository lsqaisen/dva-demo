//dva
import { connect } from 'dva';
import React from 'react'
import { Icon } from 'antd'
import ErrorComp from '../../components/Error'
import styles from './index.less'

const Error = (props) => {
	return (
		<div>
			<ErrorComp message='404 Not Found' />
		</div>
	)
}

export default connect(props => ({ ...props }))(Error); 
