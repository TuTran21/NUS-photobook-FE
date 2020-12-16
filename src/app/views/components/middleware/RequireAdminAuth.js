import React, { Component, PropTypes, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getToken } from 'utils/utils';
import authActions from 'state/ducks/auth/actions';
import { useLazyQuery } from '@apollo/client';
import DashboardQueries from 'graphql/queries/Dashboard';
import { Backdrop, Card, CardContent, Dialog, Button } from '@material-ui/core';
import styled from 'styled-components';
// import Authorize from 'containers/Auth/Loadable';
import Theme from 'app/themes/styles';
import { useHistory } from 'react-router-dom';

// import AuthPage from 'app/views/pages/AuthPage/Injectable';

const AuthPage = React.lazy(() => import('app/views/pages/AuthPage/Injectable'));

const StyledBackdrop = styled(Backdrop)`
	z-index: 1000 !important;
	background-color: ${Theme.ncpGrayLowOpacity};
`;

const StyledCard = styled(Card)`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	padding: 100px;
	background-color: ${Theme.ncpDefaultBackgroundLowOpacity};
`;

const StyledCardContent = styled(CardContent)`
	font-size: 18px;
	line-spacing: 5px;
	font-weight: 600;
`;

export default function(ComposedComponent) {
	function RequireAdminAuth(props) {
		const { auth, loginFailed, loginSuccess } = props;

		const history = useHistory();
		const handleGoForbidden = () => {
			history.push('/403');
		};

		const [verifyToken, authRes] = useLazyQuery(DashboardQueries.VERIFY_ADMIN_ACCESS_TOKEN, {
			onCompleted: () => {
				if (authRes.data) {
					return loginSuccess(authRes.data.verifyAdminAccessToken);
				}
			},
			onError: () => {
				loginFailed();
				return handleGoForbidden();
			},
		});
		// Verify token and login if valid
		useEffect(() => {
			verifyToken();
		}, []);
		return (
			<React.Fragment>
				<ComposedComponent {...props} />
			</React.Fragment>
		);
	}
	// Authentication.propTypes = { authenticated: PropTypes.bool };

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

	return connect(mapStateToProps, mapDispatchToProps)(RequireAdminAuth);
}
