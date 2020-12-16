/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/pages/auth/AuthPage`, `src/pages/home/HomePage`).
 */

import React, { useEffect } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { shallowEqual, useSelector, connect } from 'react-redux';
import authActions from 'state/ducks/auth/actions';
import AuthQueries from 'graphql/queries/Auth';

import routesConfig from 'app/views/router/config';
import { useLazyQuery } from '@apollo/client';
import { withSnackbar } from 'notistack';

const Router = withRouter(({ Layout, history, loginSuccess, loginFailed, enqueueSnackbar, intl }) => {
	// mapStateToProps
	const [verifyToken, authRes] = useLazyQuery(AuthQueries.VERIFY_ACCESS_TOKEN, {
		onCompleted: () => {
			if (authRes.data) {
				return loginSuccess(authRes.data.verifyAccessToken);
			}
		},
		onError: () => {
			return loginFailed();
		},
	});
	// Verify token and login if valid
	useEffect(() => {
		verifyToken();
	}, []);
	return (
		// Pages that have hasLayout set to true will be wrapped with headers, body and footer of configured layout
		<Switch>
			{routesConfig.map((route, idx) => {
				return route.component ? (
					<Route
						key={idx}
						path={route.path}
						exact={route.exact}
						name={route.name}
						render={props => (
							<Layout hasLayout={route.hasLayout} hasFooter={route.hasFooter} hasHeader={route.hasHeader}>
								<route.component {...route.extraProps} {...props} />
							</Layout>
						)}
					/>
				) : (
					<Redirect to="/500" />
				);
			})}
			<Redirect to="/404" />
		</Switch>
	);
});

function mapStateToProps(state) {
	return {
		auth: state.auth,
	};
}

function mapDispatchToProps(dispatch) {
	const loginSuccess = payload => dispatch(authActions.loginSuccess(payload));
	const loginFailed = () => dispatch(authActions.loginFailed());

	return {
		dispatch,
		loginSuccess,
		loginFailed,
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(Router));
