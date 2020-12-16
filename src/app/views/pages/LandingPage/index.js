/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/pages/auth/AuthPage`, `src/pages/home/HomePage`).
 */

import React, { Suspense, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import LoadingIndicator from 'app/views/components/common/LoadingIndicator';
import typeMenu from './constants';
import TypeSelector from './components/TypeSelector';
const PhotoList = React.lazy(() => import('./components/PhotoList'));

export default function LandingPage(props) {
	const [type, setType] = useState(typeMenu[0].name);
	return (
		<Grid container fluid style={{ justifyContent: 'center' }}>
			<Grid item xs={12}>
				<TypeSelector currentType={type} setType={setType}></TypeSelector>
			</Grid>

			<Grid item xs={8}>
				<React.Suspense fallback={<LoadingIndicator hasSpacing />}>
					<PhotoList></PhotoList>
				</React.Suspense>
			</Grid>
		</Grid>
	);
}
