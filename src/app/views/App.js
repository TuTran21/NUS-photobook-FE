import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet-async';

import Router from 'app/views/router/';
import { Snackbar } from '@material-ui/core';

const Layout = React.lazy(() => import('app/views/components/layout'));

class App extends Component {
	componentDidMount() {
		const token = localStorage.getItem('token');
		if (token) {
			this.handleAppMount(token);
			// this.props.getConfig();
			// this.props.getUserConfig();
		}
	}

	handleCheckWindowClose = () => {
		window.addEventListener('beforeunload', function(e) {});
	};

	handleAppMount = async token => {
		await this.handleCheckToken(token);
		await this.getLayout();
		this.handleCheckWindowClose();
	};

	handleCheckToken = async token => {
		return;
	};

	getLayout = activeLayout => {
		return;
	};

	render() {
		return (
			<React.Fragment>
				<Helmet titleTemplate="NUS - Photobook" defaultTitle="NUS - Photobook">
					<meta name="description" content="NUS - Photobook" />
				</Helmet>
				<Router Layout={Layout}></Router>
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => ({
	userState: state.user,
});

const mapDispatchToProps = dispatch => {
	return {
		// dispatching plain actions
		// increment: () => dispatch({ type: 'INCREMENT' }),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
