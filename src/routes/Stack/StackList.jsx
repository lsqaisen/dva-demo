import PropTypes from 'prop-types'
import { connect } from 'dva';
import { Card, Badge, Button, Modal } from 'antd';
import { Link } from 'dva/router';
import { Loading } from '../../components/Loading';
import { StackList as StackListComps, AddStack } from '../../components/Stack';
import styles from './StackList.less';


const StackList = ({ stacklist, dispatch }) => {
    console.log(styles.stacks, 323232)
    const { list, loading } = stacklist;
    function dotColor(status) {
        switch (status) {
            case 'running': return styles.success;
            default: return styles.warning;
        }
        return '';
    }
    return (
        <div className={styles.stacks}>
            {loading ? <Loading loading={loading} /> : ''}
            <div className={styles.operate}>
                <Button type="primary">添加应用</Button>
            </div>
            <StackListComps stacklist={stacklist} dispatch={dispatch} />
            <Modal
                key="2323"
                maskClosable={false}
                wrapClassName="vertical-center-modal"
                title="添加应用"
                visible={true}
                confirmLoading={false}
                onOk={() => { }}
                onCancel={() => { }}
            >
                {Math.random()}
            </Modal>
        </div>
    )
}

StackList.propTypes = {
    stacklist: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
}

export default connect(({ stacklist, dispatch }) => ({ stacklist, dispatch }))(StackList);
