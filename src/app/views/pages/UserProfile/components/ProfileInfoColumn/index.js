import React from 'react';
import styled from 'styled-components';
import AvatarUploadAndEdit from 'app/views/pages/UserProfile/components/AvatarUploadAndEdit';
import LoadingIndicator from 'app/views/components/common/LoadingIndicator';

const UserStatistic = React.lazy(() => import('app/views/components/UserProfile/UserStatistic'));

const AvatarBlock = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 20px 0px;
`;

function InfoColumn(props) {
	const { user, overallScoreRes, isOwner, refetchProfile } = props;
	return (
		<React.Fragment>
			<AvatarUploadAndEdit refetchProfile={refetchProfile} isOwner={isOwner} user={user}></AvatarUploadAndEdit>
			<React.Suspense fallback={<LoadingIndicator />}>
				<UserStatistic
					loading={overallScoreRes.loading}
					error={overallScoreRes.error}
					data={overallScoreRes.data}
					refetch={overallScoreRes.refetch}
				></UserStatistic>
			</React.Suspense>
		</React.Fragment>
	);
}

export default InfoColumn;
