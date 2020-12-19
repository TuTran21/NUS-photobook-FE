import React from 'react';
import styled from 'styled-components';
import AvatarUploadAndEdit from 'app/views/pages/UserProfile/components/AvatarUploadAndEdit';
import LoadingIndicator from 'app/views/components/common/LoadingIndicator';

const AvatarBlock = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 20px 0px;
`;

function InfoColumn(props) {
	const { user, isOwner, refetchProfile } = props;
	return (
		<React.Fragment>
			<AvatarUploadAndEdit refetchProfile={refetchProfile} isOwner={isOwner} user={user}></AvatarUploadAndEdit>
		</React.Fragment>
	);
}

export default InfoColumn;
