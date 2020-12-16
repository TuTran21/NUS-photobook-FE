import React, { useState, Suspense } from 'react';
import { Tabs, Tab, Box, Typography, TextField } from '@material-ui/core';
import styled from 'styled-components';
import Theme from 'app/themes/styles';
import RequireAuth from 'app/views/components/middleware/RequireAuth';
import LoadingIndicator from 'app/views/components/common/LoadingIndicator';
// import EditUserProfile from 'app/views/pages/UserProfile/components/EditUserProfile'

const ProfileStatusPanel = React.lazy(() => import('app/views/pages/UserProfile/components/ProfileStatusPanel'));
const EditUserProfile = React.lazy(() => import('app/views/pages/UserProfile/components/EditUserProfile'));
const TabBar = styled.div`
	background-color: ${Theme.ncpWhiteHover};
`;

const TabContent = styled.div``;

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`user-profile-tabpanel-${index}`}
			aria-labelledby={`user-profile-tab-${index}`}
			{...other}
		>
			{value === index && <React.Fragment>{children}</React.Fragment>}
		</div>
	);
}

function a11yProps(index) {
	return {
		id: `user-profile-${index}`,
		'aria-controls': `user-profile-tabpanel-${index}`,
	};
}

function ProfileTabs(props) {
	const { isOwner, refetchProfile, user, userId } = props;
	const [ActiveTab, ChangeActiveTab] = useState(0);

	const handleChangeTab = (event, newValue) => {
		ChangeActiveTab(newValue);
	};

	return (
		<React.Fragment>
			<TabBar className="card card-custom card-stretch gutter-b">
				<Tabs value={ActiveTab} onChange={handleChangeTab} indicatorColor="primary" aria-label="Profile tabs">
					<Tab label="Status" {...a11yProps(0)} />
					{/* <Tab label="History" {...a11yProps(1)} /> */}
					{isOwner && <Tab label="Account" {...a11yProps(1)} />}
				</Tabs>
			</TabBar>
			<TabContent>
				<TabPanel value={ActiveTab} index={0}>
					<Suspense fallback={<LoadingIndicator hasSpacing></LoadingIndicator>}>
						<ProfileStatusPanel userId={userId} isOwner={isOwner}></ProfileStatusPanel>
					</Suspense>
				</TabPanel>
				<TabPanel value={ActiveTab} index={2}>
					Feature under development
				</TabPanel>
				{isOwner && (
					<TabPanel value={ActiveTab} index={1}>
						<Suspense fallback={<LoadingIndicator hasSpacing></LoadingIndicator>}>
							<EditUserProfile user={user} refetchProfile={refetchProfile}></EditUserProfile>
						</Suspense>
					</TabPanel>
				)}
			</TabContent>
		</React.Fragment>
	);
}

export default RequireAuth(ProfileTabs);
