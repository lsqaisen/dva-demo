import PropTypes from 'prop-types'
import { Link } from 'dva/router';
import { Table, Button, Popconfirm } from 'antd';
const ButtonGroup = Button.Group;
import styles from './Stack.less';


const Stack = ({ name, table }) => {
  return (
    <div className={styles.stack}>
      <div className={styles.header}>
        <h3>应用：{name}</h3>
      </div>
      <div className={styles.operate}>
        <ButtonGroup style={{ marginRight: 12 }}>
          <Button type="primary" size="large" onClick={() => { }} >添加服务</Button>
          <Button type="primary" size="large" onClick={() => { }} >添加外部服务</Button>
        </ButtonGroup>
        <Button type="primary" size="large" onClick={() => { }}>刷新</Button>
      </div>
      <Table  {...table} />
    </div>
  )
}

Stack.propTypes = {
  name: PropTypes.string.isRequired,
  table: PropTypes.object.isRequired,
}

export default Stack;