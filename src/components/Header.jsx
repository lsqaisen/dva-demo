import PropTypes from 'prop-types'
import styles from './Header.less';

const Header = ({ icon, name, status, operate }) => {
	return (
		<div className={styles.header}>
			<div className={styles.icon}>
				{icon}
			</div>
			<div className={styles.info} style={{ width: 'calc(100% - 108px)', overflow: 'hidden' }}>
				<div className={styles.title}>
					<h3 className={`${styles.name} ellipsis`} style={{ maxWidth: 'calc(100% - 200px)' }}>{name}</h3>
					<span className={styles.status}>{status}</span>
				</div>
			</div>
			<div className={styles.operate}>
				{operate}
			</div>
		</div>
	)
}

Header.propTypes = {
	icon: PropTypes.element.isRequired,
	name: PropTypes.string.isRequired,
	status: PropTypes.element.isRequired,
	operate:  PropTypes.element
}

export default Header;