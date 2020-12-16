import React from 'react';
import Header from './components/Header';

const Layout = props => {
	const { children, hasHeader } = props;

	return (
		<>
			{hasHeader && <Header />}
			<div id="body__content">{children}</div>
		</>
	);
};

export default Layout;
