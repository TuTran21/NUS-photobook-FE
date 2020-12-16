import React from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { Directions, DirectionsOutlined } from '@material-ui/icons';
import { Typography } from '@material-ui/core';

function iconStyles() {
	return {
		featureIcon: {
			color: `rgb(59, 153, 120)`,
			height: '100px',
			width: '100px',
		},
	};
}

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 300px;
`;

const Title = styled(Typography)`
	margin-top: 25px !important;
	font-weight: 600 !important;
	text-align: center;
`;

const Description = styled(Typography)`
	margin-top: 10px !important;
	padding: 0 15px !important;
	text-align: center;
`;

function SingleFeature(props) {
	const classes = makeStyles(iconStyles)();
	const { title, description, Icon } = props;
	return (
		<Wrapper>
			<Icon className={classes.featureIcon}></Icon>
			<Title variant="h5" component="p">
				{title}
			</Title>
			<Description>{description}</Description>
		</Wrapper>
	);
}

export default SingleFeature;
