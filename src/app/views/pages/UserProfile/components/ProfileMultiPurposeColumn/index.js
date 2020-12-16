import React from 'react';
import ProfileTabs from 'app/views/pages/UserProfile/components/ProfileTabs';

function ProfileMultiPurposeColumn(props) {
	const { isOwner } = props;
	return (
		<div>
			<ProfileTabs {...props}></ProfileTabs>
		</div>
	);
}

export default ProfileMultiPurposeColumn;
