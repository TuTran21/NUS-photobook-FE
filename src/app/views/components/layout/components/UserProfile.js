/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { connect } from 'react-redux';
import { useLazyQuery } from '@apollo/client';
import UserQueries from 'graphql/queries/User';
import { CircularProgress, Button, Dialog, Avatar } from '@material-ui/core';
import history from 'utils/history';
import authActions from 'state/ducks/auth/actions';
import LoadingIndicator from '../../common/LoadingIndicator';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const AuthPage = React.lazy(() => import('app/views/pages/AuthPage/Injectable'));

function UserProfile(props) {
	const { showHi, showAvatar, showBadge, activeUser, logout } = props;
	const [loginModalState, setOpenLoginModal] = React.useState({ isOpen: false, formType: 'login' });
	const [getProfileId, profileIdRes] = useLazyQuery(UserQueries.GET_MY_PROFILE, {
		onCompleted: () => history.push(`/user/${profileIdRes.data.getMyProfile.userId}`),
		fetchPolicy: 'network-only',
	});

	const handleOpenLoginModal = (isOpen, formType) => {
		return setOpenLoginModal({ isOpen: isOpen, formType: formType });
	};

	const [profileMenuOpen, setProfileMenuOpen] = React.useState(null);

	const handleOpenProfileMenu = event => {
		setProfileMenuOpen(event.currentTarget);
	};

	const handleCloseProfileMenu = () => {
		setProfileMenuOpen(null);
	};
	const user = activeUser;

	if (user.username) {
		const welcomeName =
			user.firstName && user.lastName
				? user.firstName + ' ' + user.lastName
				: user.username
				? user.username
				: 'Undefined';
		return (
			<Dropdown className="kt-header__topbar-item kt-header__topbar-item--user" drop="down" alignRight>
				<Button
					className="text-white"
					aria-controls="simple-menu"
					aria-haspopup="true"
					onClick={handleOpenProfileMenu}
				>
					{showAvatar && !user.avatar ? (
						<Avatar>{welcomeName.charAt(0)}</Avatar>
					) : (
						<Avatar alt="" src={user.avatar}></Avatar>
					)}
					{showHi && <span>Hi,</span>}

					<span style={{ marginLeft: '15px' }}>{welcomeName}</span>
				</Button>
				<Menu
					id="simple-menu"
					anchorEl={profileMenuOpen}
					keepMounted
					open={Boolean(profileMenuOpen)}
					onClose={handleCloseProfileMenu}
				>
					<MenuItem onClick={() => getProfileId()}>
						<div>My Profile</div>

						{profileIdRes.loading && <CircularProgress color="primary" size="40px"></CircularProgress>}
					</MenuItem>
					<MenuItem onClick={() => logout()}>Logout</MenuItem>
				</Menu>
			</Dropdown>
		);
	}

	return (
		<React.Fragment>
			<React.Fragment>
				<Dialog
					onClose={() => handleOpenLoginModal(false)}
					aria-labelledby="login-modal-in-authorize-popup"
					open={loginModalState.isOpen}
				>
					<React.Suspense fallback={<LoadingIndicator hasSpacing />}>
						<AuthPage isModal={true} formTypeDefault={loginModalState.formType}></AuthPage>
					</React.Suspense>
				</Dialog>
			</React.Fragment>
			<Button
				className="text-white"
				color="default"
				size="large"
				onClick={() => handleOpenLoginModal(true, 'login')}
			>
				Login
			</Button>
			<Button
				className="text-white"
				color="default"
				size="large"
				onClick={() => handleOpenLoginModal(true, 'register')}
			>
				Sign up
			</Button>
		</React.Fragment>
	);
}

const mapStateToProps = ({ auth: { activeUser } }) => ({
	activeUser,
});

const mapDispatchToProps = dispatch => {
	const logout = () => dispatch(authActions.logout());

	return {
		logout,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
