//dva
import { connect } from 'dva';
//
import PropTypes from 'prop-types'
//antd

//less
import styles from "./index.less";

const Node = ({ dashboard }) => {

    return (
        <div>
            node
        </div>
    )
}

Node.propTypes = {

}

export default connect(props => ({ ...props }))(Node);