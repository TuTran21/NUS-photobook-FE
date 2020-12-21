import React, { memo, useEffect } from 'react';
import styled from 'styled-components';
import { Card, Grid, Typography } from '@material-ui/core';
import { useQuery, useLazyQuery } from '@apollo/client';
import PhotoQueries from 'graphql/queries/Photo';
import LoadingIndicator from 'app/views/components/common/LoadingIndicator';
import PhotosSkeleton from '../../../components/Skeletons/PhotosSkeleton';
import TestCardItemSkeleton from 'app/views/components/Skeletons/PhotoItemSkeleton';

const PhotoCardItem = React.lazy(() => import('app/views/components/Photo/PhotoCardItem'));

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
	const { lowPadding = false, wrapperStyle, query } = props;

	const [getPhotos, getPhotosRes] = useLazyQuery(PhotoQueries.GET_PHOTOS, {
		fetchPolicy: 'network-only',
		variables: { ...query, offset: 0, limit: 5 },
	});
	const { data, error, loading } = getPhotosRes;

	useEffect(() => {
		getPhotos();
	}, [query]);

	if (error) {
		return (
			<Wrapper style={wrapperStyle} lowpadding={lowPadding.toString()} elevation={4}>
				{loading && <PhotosSkeleton></PhotosSkeleton>}
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
				{loading && <PhotosSkeleton></PhotosSkeleton>}
				{data &&
					data.photos.length > 0 &&
					data.photos.map((photo, idx) => (
						<Grid item xs={12} sm={6} key={idx}>
							<React.Suspense fallback={<TestCardItemSkeleton />}>
								<PhotoCardItem
									id={photo.id}
									likes={photo.likes}
									testId={photo.id}
									title={photo.title}
									image={photo.image}
									description={photo.description}
									user={photo.user}
									createdAt={photo.createdAt}
								></PhotoCardItem>
							</React.Suspense>
						</Grid>
					))}
			</PhotoListContainer>
		</Wrapper>
	);
}

export default memo(PhotoList);
