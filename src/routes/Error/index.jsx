//dva
import { connect } from 'dva';
import React from 'react'
import { Icon } from 'antd'
import styles from './index.less'

// const Error = () => (<div className="content-inner">
// 	<div className={styles.error}>
// 		<Icon type="frown-o" />
// 		<h1>404 Not Found</h1>
// 	</div>
// </div>)

const Error = (props) => {
	return (
		<div className="content-inner">
			<div className={styles.error}>
				<Icon type="frown-o" />
				<h1>404 Not Found</h1>
			</div>
		</div>
	)
}

export default connect(props => ({ ...props }))(Error); 
