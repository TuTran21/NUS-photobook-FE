import React, { Component, PropTypes, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getToken } from 'utils/utils';
import authActions from 'state/ducks/auth/actions';
import { useLazyQuery } from '@apollo/client';
import AuthQueries from 'graphql/queries/Auth';
import { Backdrop, Card, CardContent, Dialog, Button } from '@material-ui/core';
import styled from 'styled-components';
// import Authorize from 'containers/Auth/Loadable';
import Theme from 'app/themes/styles';
import { useHistory } from 'react-router-dom';

import LoadingIndicator from '../common/LoadingIndicator';
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

const LoginOverlay = props => {
	const { isOpen, onLogin } = props;
	const history = useHistory();

	const handleGoHome = () => {
		history.push('/');
	};
	return (
		<StyledBackdrop
			open={isOpen}
			// onClick={}
		>
			<StyledCard>
				<StyledCardContent>
					This feature requires you to{' '}
					<Button size="large" onClick={() => onLogin(true)} color="primary">
						Login
					</Button>
				</StyledCardContent>
				<Button size="large" onClick={() => handleGoHome()} color="primary">
					Nah, take me back home
				</Button>
			</StyledCard>
		</StyledBackdrop>
	);
};

export default function(ComposedComponent) {
	function Authentication(props) {
		const [isLoginModalOpen, setOpenLoginModal] = React.useState(false);
		const { auth } = props;
		const { authenticated } = auth;

		const handleOpenLoginModal = value => {
			return setOpenLoginModal(value);
		};

		if (authenticated && isLoginModalOpen) {
			setOpenLoginModal(false);
		}

		return (
			<React.Fragment>
				{!authenticated && (
					<React.Fragment>
						<Dialog
							onClose={() => handleOpenLoginModal(false)}
							aria-labelledby="login-modal-in-authorize-popup"
							open={isLoginModalOpen}
						>
							<React.Suspense fallback={LoadingIndicator}>
								<AuthPage isModal={true}></AuthPage>
							</React.Suspense>
						</Dialog>

						<LoginOverlay isOpen={!authenticated} onLogin={handleOpenLoginModal}></LoginOverlay>
					</React.Fragment>
				)}
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
		return {
			dispatch,
		};
	}

	return connect(mapStateToProps, mapDispatchToProps)(Authentication);
}
