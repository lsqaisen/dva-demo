import PropTypes from 'prop-types'
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Loading } from '../../components/Loading';
import { Table, Button, Popconfirm } from 'antd';
const ButtonGroup = Button.Group;
import Time from 'react-time-format';
import styles from './Stack.less';


const Stack = ({ stack, dispatch }) => {
  const { list, loading, selectStack } = stack;
  const currentData = list.filter(v => v.name === selectStack)[0] || { apps: [] };
  console.log(list, currentData)
  const tableData = {
    dataSource: currentData.apps.map(v => { v.key = v.name; return v; }),
    columns: [
      {
        title: '服务名称',
        dataIndex: 'name',
        key: 'name',
        width: '15%',
        render: (text, r, i) => {
          if (r.type != 'service') {
            return <Link to={`/ui/stack/servicelist/${r.stack}/exservice/${text}`} style={{ marginRight: 12 }}><Tag color="#2db7f5">外部</Tag>{text}</Link>;
          }
          return <Link to={`/ui/stack/servicelist/${r.stack}/${text}`} style={{ marginRight: 12 }}>{text}</Link>;
        }
      }, {
        title: '镜像',
        dataIndex: 'images',
        key: 'images',
        width: '20%',
        render: (t, r, i) => {
          if (r.type != 'service') {
            return '--';
          }
          return r && r.containers && r.containers["0"] && r.containers["0"].image ? r.containers["0"].image : '未知';
        },
      }, {
        title: '服务地址',
        dataIndex: 'address',
        key: 'address',
        width: '15%',
        render: (text, record, index) => {
          if (record.type != 'service') {
            return '--';
          }
          return !!record.service.ports ? record.service.ports.map((port, i) => {
            return <p key={`${record.name}_${i}`}>{`${record.name}:${port.servicePort}`}</p>
          }) : [];
        },
      }, {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        width: '10%',
        // render: (t, r, i) => {
        //   if (r.type != 'service') {
        //     return '--';
        //   }
        //   return getStatusE(t);
        // },
      }, {
        title: '创建时间',
        dataIndex: 'creationTimestamp',
        key: 'creationTimestamp',
        width: '20%',
        render: (t, r, i) => <Time value={new Date(t)} format="YYYY-MM-DD  HH:mm" />,
      }, {
        title: '操作',
        key: 'action',
        width: '15%',
        render: (text, record) => (
          <span>
            <Popconfirm
              placement="topLeft"
              title={`是否确认删除服务${record.name}`}
              onConfirm={() => { }}
              okText="确认"
              cancelText="取消">
              <a href="javascript:;"> 删除</a>
            </Popconfirm>
          </span>
        ),
      }
    ],
  }
  return (
    <div className={styles.stack}>
      {loading ? <Loading loading={loading} /> : ''}
      <div className={styles.header}>
        <h3>应用：{selectStack}</h3>
      </div>
      <div className={styles.operate}>
        <ButtonGroup style={{ marginRight: 12 }}>
          <Button type="primary" size="large" onClick={() => { }} >添加服务</Button>
          <Button type="primary" size="large" onClick={() => { }} >添加外部服务</Button>
        </ButtonGroup>
        <Button type="primary" size="large" onClick={() => { }}>刷新</Button>
      </div>
      <Table  {...tableData} />
    </div>
  )
}

Stack.propTypes = {
  stack: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default Stack;