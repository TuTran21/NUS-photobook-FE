import React from 'react';
import typeMenu from '../constants';
import { Grid } from '@material-ui/core';
import styled from 'styled-components';

const Title = styled.p`
	margin-bottom: 0px;
	text-align: center;
	&:hover {
		cursor: pointer;
	}
	${props => props.isActive && `color: #4abb94;`}
`;

const TypeSelector = props => {
	const { setType, currentType } = props;
	return (
		<Grid container>
			{typeMenu.map(item => {
				return (
					<Grid item xs={4} onClick={() => setType(item.name)}>
						<Title isActive={currentType === item.name}>{item.title}</Title>
					</Grid>
				);
			})}
		</Grid>
	);
};

export default TypeSelector;
