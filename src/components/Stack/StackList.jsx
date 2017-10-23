import PropTypes from 'prop-types'
import { connect } from 'dva';
import { Card, Badge } from 'antd';
import { Link } from 'dva/router';
import { Loading } from '../../components/Loading';
import styles from './StackList.less';


const StackList = ({ stack, dispatch }) => {
    const { list, loading } = stack;
    function dotColor(status) {
        switch (status) {
            case 'running': return styles.success;
            default: return styles.warning;
        }
        return '';
    }
    return (
        <div className={styles.stacklist}>
            {loading ? <Loading loading={loading} /> : ''}
            {list.map(v => <Card key={v.name} title={<p>应用：<Link to={`/stack/list/${v.name}`}>{`${v.name}`}</Link></p>} className={styles.stack} noHovering>
                {(v.apps || []).map(app => <Link key={`${v.name}_${app.name}`} to="">
                    <Card.Grid className={styles.service}><Badge className={dotColor(app.status)} status="processing" text={app.name} /></Card.Grid>
                </Link>)}
            </Card>)}
        </div>
    )
}

StackList.propTypes = {
    stack: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
}

export default StackList;