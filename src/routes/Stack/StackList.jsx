import PropTypes from 'prop-types'
import { connect } from 'dva';
import { Card, Badge, Button } from 'antd';
import { Link } from 'dva/router';
import { Loading } from '../../components/Loading';
import { StackList as StackListComps, AddStack } from '../../components/Stack';
import styles from './StackList.less';


const StackList = ({ stacklist, dispatch }) => {
    const { list, loading, addstack_visible, addstack_confirmLoading } = stacklist;

    function showAddStackModal() {
        dispatch({
            type: 'stacklist/updateState',
            payload: {
                addstack_visible: true
            }
        })
    }
    const addstack = {
        network: [],
        addstack_visible,
        addstack_confirmLoading,
        AddStack: (data, resetFields) => {
            dispatch({
                type: 'stacklist/addstack',
                payload: {
                    data,
                    resetFields,
                },
            })
        },
        cancelAddStack: () => {
            dispatch({
                type: 'stacklist/updateState',
                payload: {
                    addstack_visible: false
                }
            })
        }
    }

    return (
        <div className={styles.stacks}>
            {loading ? <Loading loading={loading} /> : ''}
            <div className={styles.operate}>
                <Button type="primary" onClick={showAddStackModal}>添加应用</Button>
            </div>
            <StackListComps stacklist={stacklist} dispatch={dispatch} />
            <AddStack {...addstack} />
        </div>
    )
}

StackList.propTypes = {
    stacklist: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
}

export default connect(({ stacklist, dispatch }) => ({ stacklist, dispatch }))(StackList);
