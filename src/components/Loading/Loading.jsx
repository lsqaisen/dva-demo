import PropTypes from 'prop-types'
import Basic from './Basic';
import styles from './Loading.less';

const Loading = ({ loading }) => {
    return (
        <div className={`${styles.loadbox} ${loading ? '' : styles.hide}`}>
            <div className={styles.loading}>
                <div className={styles.sk_circle}>
                    <div className={`${styles.sk_circle1} ${styles.sk_child}`}></div>
                    <div className={`${styles.sk_circle2} ${styles.sk_child}`}></div>
                    <div className={`${styles.sk_circle3} ${styles.sk_child}`}></div>
                    <div className={`${styles.sk_circle4} ${styles.sk_child}`}></div>
                    <div className={`${styles.sk_circle5} ${styles.sk_child}`}></div>
                    <div className={`${styles.sk_circle6} ${styles.sk_child}`}></div>
                    <div className={`${styles.sk_circle7} ${styles.sk_child}`}></div>
                    <div className={`${styles.sk_circle8} ${styles.sk_child}`}></div>
                    <div className={`${styles.sk_circle9} ${styles.sk_child}`}></div>
                    <div className={`${styles.sk_circle10} ${styles.sk_child}`}></div>
                    <div className={`${styles.sk_circle11} ${styles.sk_child}`}></div>
                    <div className={`${styles.sk_circle12} ${styles.sk_child}`}></div>
                </div>
            </div>
        </div>
    )
}

Loading.propTypes = {
}

export default Loading