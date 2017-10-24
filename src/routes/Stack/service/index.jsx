import { connect } from 'dva';
import PropTypes from 'prop-types'
import { Link, Route, Redirect } from 'dva/router';
//antd
import { Menu, Icon, Button } from 'antd';

//less
import styles from './index.less';

const Service = ({ service }) => {
  console.log(service, 4343434)
  return (
    <div className={styles.service}>
      11111111
		</div >
  )
}

Service.propTypes = {

}

export default connect(({ service }) => ({ service }))(Service);