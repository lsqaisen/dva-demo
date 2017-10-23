import PropTypes from 'prop-types'
import styles from "./Basic.less";

const Basic = ({ children }) => {

    return (
        <div className={styles.loadbox}>
            {children}
        </div>
    )
}

Basic.propTypes = {
    // children: PropTypes.element.isRequired,
}

export default Basic