import { Skeleton } from '@material-ui/lab';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	margin-top: 35px;
`;

function TestListItemSkeleton(props) {
	return <Skeleton variant="rect" width="100%" height={404} style={{ marginTop: '70px' }} />;
}

export default TestListItemSkeleton;
