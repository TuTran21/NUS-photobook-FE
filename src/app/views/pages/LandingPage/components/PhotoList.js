import React, { memo } from 'react';
import styled from 'styled-components';
import { Card, Grid, Typography } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import PhotoQueries from 'graphql/queries/Photo';
import LoadingIndicator from 'app/views/components/common/LoadingIndicator';
import FeaturedTestsSkeleton from '../../../components/Skeletons/FeaturedTestsSkeleton';
import TestCardItemSkeleton from 'app/views/components/Skeletons/TestCardItemSkeleton';

const TestCardItem = React.lazy(() => import('app/views/components/Photo/PhotoCardItem'));

const Wrapper = styled(Grid)`
	width: 100%;
	background: white;
	align-items: center;
	padding: 15px;
	margin-bottom: 15px;
	margin-top: 50px;
`;

const PhotoListContainer = styled(Grid)`
	align-items: center;
`;

const ErrorText = styled(Typography)`
	text-align: center;
`;

function PhotoList(props) {
	const { lowPadding = false, wrapperStyle } = props;
	const getTestRes = useQuery(PhotoQueries.GET_PHOTOS, { variables: { offset: 0, limit: 4 } });
	const { data, error, loading } = getTestRes;

	if (error) {
		return (
			<Wrapper style={wrapperStyle} lowpadding={lowPadding.toString()} elevation={4}>
				{loading && <FeaturedTestsSkeleton></FeaturedTestsSkeleton>}
				{!data && !loading && (
					<ErrorText color="error" variant="h6" component="p">
						No photos found
					</ErrorText>
				)}
				{error && (
					<ErrorText color="error" variant="h6" component="p">
						Something went wrong, please try again later
					</ErrorText>
				)}
			</Wrapper>
		);
	}

	return (
		<Wrapper style={wrapperStyle} lowpadding={lowPadding.toString()} elevation={3}>
			<PhotoListContainer container>
				{loading && <FeaturedTestsSkeleton></FeaturedTestsSkeleton>}
				{data &&
					data.photos.map((test, idx) => (
						<Grid item xs={12} sm={6} key={idx}>
							<React.Suspense fallback={<TestCardItemSkeleton />}>
								<TestCardItem testId={test.id} title={test.title} rating={test.rating}></TestCardItem>
							</React.Suspense>
						</Grid>
					))}
			</PhotoListContainer>
		</Wrapper>
	);
}

export default memo(PhotoList);
