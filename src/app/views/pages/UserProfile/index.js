import React from 'react';
import { Grid } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import UserQueries from 'graphql/queries/User';
import LoadingIndicator from 'app/views/components/common/LoadingIndicator';

const InfoColumn = React.lazy(() => import('app/views/pages/UserProfile/components/ProfileInfoColumn'));
const ProfileMultiPurposeColumn = React.lazy(() => import('./components/ProfileMultiPurposeColumn'));

function UserProfile(props) {
	const { auth } = props;

	const userId = props.match.params.userId;
	const profileRes = useQuery(UserQueries.GET_USER, {
		variables: { id: userId },
		pollInterval: 10000,
	});

	if (profileRes.loading) {
		return <LoadingIndicator hasSpacing={true}></LoadingIndicator>;
	}

	if (profileRes.error) {
		return <div>Something went wrong, please try again later.</div>;
	}

	if (!profileRes.data && !profileRes.loading) {
		return <div>Something went wrong, please try again later.</div>;
	}

	const user = profileRes.data.user.user;
	const isOwner = profileRes.data.user.isOwner;
	return (
		<Grid container>
			<Grid item xs={12} md={4}>
				<React.Suspense fallback={<LoadingIndicator wrapperStyle={{ marginTop: '30px' }}></LoadingIndicator>}>
					<InfoColumn user={user} refetchProfile={profileRes.refetch} isOwner={isOwner}></InfoColumn>
				</React.Suspense>
			</Grid>
			<Grid item xs={12} md={8}>
				<React.Suspense fallback={<LoadingIndicator></LoadingIndicator>}>
					<ProfileMultiPurposeColumn
						refetchProfile={profileRes.refetch}
						userId={userId}
						user={user}
						isOwner={isOwner}
					></ProfileMultiPurposeColumn>
				</React.Suspense>
			</Grid>
		</Grid>
	);
}

export default UserProfile;
