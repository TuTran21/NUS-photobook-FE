import React, { useEffect, useState } from 'react';
import TestListItemSkeleton from 'app/views/components/Skeletons/TestListItemSkeleton';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';

const SkeletonWrapper = styled.div`
	margin-top: 20px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
const numberOfSkeletons = 4;

function TestListSkeleton(props) {
	const skeletons = [];

	for (var i = 0; i < numberOfSkeletons; i++) {
		skeletons.push({ id: i });
	}

	return (
		<SkeletonWrapper>
			{skeletons.map(skeleton => (
				<TestListItemSkeleton key={skeleton.id} />
			))}
		</SkeletonWrapper>
	);
}

export default TestListSkeleton;
