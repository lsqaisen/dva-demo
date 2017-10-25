import PropTypes from 'prop-types'
import { Card, Badge } from 'antd';
import { Link } from 'dva/router';
import styles from './StackList.less';
import Status from '../Status';

const StackList = ({ stacklist, dispatch }) => {
    const { list, loading } = stacklist;
    return (
        <div className={styles.stacklist}>
            {list.map(v => <Card key={v.name} title={<p>应用：<Link to={`/stack/list/${v.name}`}>{`${v.name}`}</Link></p>} className={styles.stack} noHovering>
                {(v.apps || []).map(app => <Link key={`${v.name}_${app.name}`} to={`/stack/list/${v.name}/${app.name}`}>
                    <Card.Grid className={styles.service}><Status status={app.status} text={app.name} /></Card.Grid>
                </Link>)}
            </Card>)}
        </div>
    )
}

StackList.propTypes = {
    stacklist: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
}

export default StackList;