import React, { useEffect, useState } from 'react';
import TestCardItemSkeleton from 'app/views/components/Skeletons/TestCardItemSkeleton';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';

const SkeletonWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;
const numberOfSkeletons = 4;

function FeaturedTestsSkeleton(props) {
	const skeletons = [];

	for (var i = 0; i < numberOfSkeletons; i++) {
		skeletons.push({ id: i });
	}

	return (
		<React.Fragment>
			{skeletons.map(skeleton => (
				<Grid item xs={12} sm={6} md={3} key={skeleton.id}>
					<TestCardItemSkeleton key={skeleton.id} />
				</Grid>
			))}
		</React.Fragment>
	);
}

export default FeaturedTestsSkeleton;
