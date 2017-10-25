//dva
import { Icon } from 'antd'
import PropTypes from 'prop-types'
import styles from './Error.less'

const Error = ({ message }) => {
  return (
    <div className="content-inner">
      <div className={styles.error}>
        <Icon type="frown-o" />
        <h1>{message}</h1>
      </div>
    </div>
  )
}

Error.propTypes = {
  message: PropTypes.string.isRequired,
}

export default Error; 
