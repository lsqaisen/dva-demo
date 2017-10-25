import PropTypes from 'prop-types'
import { Badge } from 'antd';
import styles from './Status.less';

const Status = ({ status, text }) => {
  let className = 'info';
  switch ((status+'').toLocaleLowerCase()) {
    case 'running': className = styles.success; break;
    default: className = styles.warning; break;
  }
  return <Badge className={className} status="processing" text={text} />
}

Status.propTypes = {
  status: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

export default Status;