import React from 'react';
import { connect } from 'dva';
import { Card, Badge } from 'antd';
import { Link } from 'dva/router';
import { Loading } from '../../components/Loading';
import styles from './List.less';


const List = ({ stack, dispatch }) => {
    const { list, loading } = stack;
    console.log(list)
    const gridStyle = {
        width: '25%',
    };
    return (
        <div className={styles.stacks}>
            {loading ? <Loading loading={loading} /> : list.map(v => <Card key={v.name} title={<p>应用：<Link to="">{`${v.name}`}</Link></p>} className={styles.stack} noHovering>
                {(v.apps || []).map(app => <Card.Grid key={`${v.name}_${app.name}`} style={gridStyle}><Badge status="processing" text={app.name} /></Card.Grid>)}
            </Card>)}
        </div>
    )
}

export default connect(props => props)(List);
