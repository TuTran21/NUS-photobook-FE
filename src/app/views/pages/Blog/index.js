import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import BlogQueries from 'graphql/queries/Blog';
import { useHistory } from 'react-router-dom';
import { withSnackbar } from 'notistack';
import { injectIntl } from 'react-intl';
import { getMessage } from 'utils/messageConvert';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Grid, Typography } from '@material-ui/core';
import BlogList from './BlogList';
import { Visibility, Event } from '@material-ui/icons';
import moment from 'moment';

const Rightside = styled(Grid)``;

function Blog(props) {
	const [data, setData] = useState({
		title: '',
		isPublished: false,
		content: { html: '', text: '' },
		author: { username: '' },
	});
	const { intl } = props;
	const history = useHistory();
	const params = useParams();

	const [getBlog, blogData] = useLazyQuery(BlogQueries.GET_BLOG, {
		fetchPolicy: 'network-only',
		onCompleted: res => handleGetBlogsSuccess(res),
		onError: err => handleGetBlogsError(err),
	});
	useEffect(() => {
		getBlog({ variables: { id: params.id } });
	}, [params.id]);

	const handleGetBlogsSuccess = res => {
		setData(res.post);
	};

	const handleGetBlogsError = err => {
		let message = getMessage(err.message);
		props.enqueueSnackbar(
			intl.formatMessage({
				id: message,
			}),
			{
				variant: 'error',
				anchorOrigin: {
					vertical: 'top',
					horizontal: 'right',
				},
			},
		);

		history.goBack();
	};

	const handleRouteAuthor = id => {
		history.push(`/user/${id}`);
	};
	return (
		<Grid justify="space-evenly" container>
			<Grid item xs={12} md={7}>
				<div className="kt-portlet kt-portlet--height-fluid">
					<div className="kt-portlet__body">
						<div className="mb-2">
							<Typography variant="h4" className="kt-portlet__head-title font-weight-bold">
								{data.title}
							</Typography>
							<Typography variant="h6" className="kt-portlet__head-title">
								<a
									className="kt-widget4__username"
									onClick={() => handleRouteAuthor(data.author.id)}
								></a>
								{data.author.username && `By ${data.author.username}`}
							</Typography>
						</div>
						<div className="info d-flex align-items-center mb-5">
							<div id="views">
								<Visibility className="mr-1" color="primary"></Visibility> {data.views ? data.views : 0}
							</div>
							<div id="createdAt" className="ml-2">
								<Event className="mr-1" color="primary"></Event>
								{moment(data.createdAt).format('DD-MMM-YYYY')}{' '}
							</div>
						</div>

						{data.image && (
							<div className="d-flex justify-content-center align-items-center w-80 mb-5">
								<img style={{ width: '90%' }} src={data.image} alt="Blog image"></img>
							</div>
						)}

						<ReactMarkdown>{data.content.text}</ReactMarkdown>
					</div>
				</div>
			</Grid>
			<Rightside item xs={12} md={4}>
				<BlogList></BlogList>
			</Rightside>
		</Grid>
	);
}

export default injectIntl(withSnackbar(Blog));
