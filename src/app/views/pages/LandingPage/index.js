/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/pages/auth/AuthPage`, `src/pages/home/HomePage`).
 */

import React, { Suspense, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import LoadingIndicator from 'app/views/components/common/LoadingIndicator';
import typeMenu from './constants';
import PhotoQueries from 'graphql/queries/Photo';
import TypeSelector from './components/TypeSelector';
import PhotoPost from 'app/views/components/Photo/PhotoPost';
import queryString from 'query-string';
import { useLazyQuery } from '@apollo/client';

const PhotoList = React.lazy(() => import('./components/PhotoList'));
const PhotoDialog = React.lazy(() => import('app/views/components/Photo/PhotoDialog'));

export default function LandingPage(props) {
	const [type, setType] = useState(typeMenu[0]);
	const [photoDialogOpen, setPhotoDialogOpen] = React.useState(false);
	const [viewPhoto, setViewPhoto] = React.useState(undefined);
	const history = useHistory();

	let params = queryString.parse(props.location.search);
	const photoId = params.view;

	const [getPhoto, getPhotoRes] = useLazyQuery(PhotoQueries.GET_PHOTO, {
		variables: { id: photoId },
		onCompleted: res => {
			if (!res.photo) {
				history.push('/');
				return;
			}
			setPhotoDialogOpen(true);
			setViewPhoto(res.photo);
		},
	});

	const handleCloseDialog = () => {
		setPhotoDialogOpen(false);
	};

	useEffect(() => {
		getPhoto();
	}, [photoId]);

	return (
		<Grid container fluid style={{ justifyContent: 'center' }}>
			<Grid item xs={12}>
				<TypeSelector currentType={type} setType={setType}></TypeSelector>
			</Grid>

			<Grid item xs={10}>
				<PhotoPost></PhotoPost>
			</Grid>
			<Grid item xs={8}>
				<React.Suspense fallback={<LoadingIndicator hasSpacing />}>
					<PhotoList query={type.query}></PhotoList>
				</React.Suspense>
			</Grid>
			{viewPhoto && (
				<PhotoDialog
					open={photoDialogOpen}
					title={viewPhoto.title}
					image={viewPhoto.image}
					description={viewPhoto.description}
					handleClose={handleCloseDialog}
				></PhotoDialog>
			)}
		</Grid>
	);
}
