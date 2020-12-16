import React from 'react';
import { Typography } from '@material-ui/core';
import Theme from 'app/themes/styles';
import styled from 'styled-components';

const GenerateAvatarFromName = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
	background-color: ${Theme.ncpPrimary};
	color: ${Theme.ncpWhite};
`;

const Text = styled(Typography)`
	font-size: ${props => props.fontsize} !important;
`;

function AvatarHolder(props) {
	const { username, firstName, lastName, fontSize = '3.75rem' } = props;
	// const displayName = firstName && lastName ? firstName + ' ' + lastName : username;
	const displayName = username;
	return (
		<GenerateAvatarFromName {...props}>
			<Text variant="h2" component="p" fontsize={fontSize}>
				{displayName.charAt(0)}
			</Text>
		</GenerateAvatarFromName>
	);
}

export default AvatarHolder;
