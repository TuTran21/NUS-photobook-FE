import React, { useEffect, useState } from 'react';
import PhotoItemSkeleton from 'app/views/components/Skeletons/PhotoItemSkeleton';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';

const SkeletonWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;
const numberOfSkeletons = 2;

function PhotosSkeleton(props) {
	const skeletons = [];

	for (var i = 0; i < numberOfSkeletons; i++) {
		skeletons.push({ id: i });
	}

	return (
		<React.Fragment>
			{skeletons.map(skeleton => (
				<Grid item xs={12} sm={6} key={skeleton.id}>
					<PhotoItemSkeleton key={skeleton.id} />
				</Grid>
			))}
		</React.Fragment>
	);
}

export default PhotosSkeleton;
