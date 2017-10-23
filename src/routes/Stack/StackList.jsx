import PropTypes from 'prop-types'
import { connect } from 'dva';
import { Card, Badge } from 'antd';
import { Link } from 'dva/router';
import { Loading } from '../../components/Loading';
import { StackList as StackListComps } from '../../components/Stack';
import styles from './StackList.less';


const List = ({ stack, dispatch }) => {
    const { list, loading } = stack;
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
            <StackListComps stack={stack} dispatch={dispatch} />
        </div>
    )
}

List.propTypes = {
    stack: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
}

export default connect(props => props)(List);
