import PropTypes from 'prop-types'
import { connect } from 'dva';
import { Card, Badge } from 'antd';
import { Link } from 'dva/router';
import { Loading } from '../../components/Loading';
import { Stack as StackComps } from '../../components/Stack';
import styles from './Stack.less';


const Stack = ({ stack, dispatch, ...props }) => {
    const { list, loading } = stack;
    function dotColor(status) {
        switch (status) {
            case 'running': return styles.success;
            default: return styles.warning;
        }
        return '';
    }
    return (
        <div className={styles.stack}>
            {loading ? <Loading loading={loading} /> : ''}
            <StackComps stack={stack} dispatch={dispatch} />
        </div>
    )
}

Stack.propTypes = {
    stack: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
}

export default connect(props => props)(Stack);
