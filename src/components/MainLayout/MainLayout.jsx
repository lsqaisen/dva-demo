import React from 'react';
import Header from './Header';
import Sider from './Sider';
import styles from './MainLayout.css';

function MainLayout({ profile, routes, params, menudata, children, dispatch }) {
	const header = { routes, params, profile, dispatch };
	const sider = { profile, menudata, dispatch };
	return (
		<div>
			<Header {...header} />
			<Sider {...sider} />
			<div className={styles.content}>
				{children}
			</div>
		</div>
	);
}

export default MainLayout;
