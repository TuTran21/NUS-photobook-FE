import React, { useEffect, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import BlogQueries from 'graphql/queries/Blog';
import { useHistory, useParams } from 'react-router-dom';
import { withSnackbar } from 'notistack';
import { FormattedMessage, injectIntl } from 'react-intl';
import moment from 'moment';
import BlogListItemSkeleton from 'app/views/components/Skeletons/BlogListItemSkeleton';

function BlogList(props) {
	const history = useHistory();
	const params = useParams();
	const [data, setData] = useState([]);

	// GET BLOGS
	const [getBlogs, blogsData] = useLazyQuery(BlogQueries.GET_BLOGS, {
		variables: { limit: 10 },
		fetchPolicy: 'network-only',
		onCompleted: res => handleGetBlogsSuccess(res),
		onError: err => handleGetBlogsError(err),
	});
	useEffect(() => {
		getBlogs();
	}, []);

	const handleGetBlogsSuccess = res => {
		setData(res.posts);
	};

	const handleGetBlogsError = err => {
		// let message = getMessage(err.message);
		setData([]);
	};

	const handleRouteBlog = id => {
		history.push(`/blog/${id}`);
	};

	const handleRouteUser = id => {
		history.push(`/user/${id}`);
	};

	console.log(data);
	return (
		<div className="kt-portlet kt-portlet--height-fluid mt-xs-4 mt-md-0">
			<div className="kt-portlet__head">
				<div className="kt-portlet__head-label">
					<h3 className="kt-portlet__head-title">Trending blogs</h3>
				</div>
			</div>
			<div className="kt-portlet__body">
				<div className="kt-widget4">
					{blogsData.loading && <BlogListItemSkeleton></BlogListItemSkeleton>}
					{data.map(blog => {
						return (
							<div key={blog.id} className="kt-widget4__item ">
								<div className="kt-widget4__pic kt-widget4__pic--pic ">
									<img alt="Blog image" style={{ width: '7.5rem' }} src={blog.image} />
								</div>
								<div className="kt-widget4__info">
									<a
										style={{ fontSize: '1.2rem' }}
										className="kt-widget4__username"
										onClick={() => handleRouteBlog(blog.id)}
									>
										{blog.title}
									</a>
									<a className="kt-widget4__text" onClick={() => handleRouteBlog(blog.id)}>
										{moment(blog.createdAt).format('DD-MMM-YYYY')}{' '}
									</a>
									<a className="kt-widget4__text" onClick={() => handleRouteUser(blog.author._id)}>
										{blog.author.username}
									</a>
								</div>
								{/* <a className="btn btn-sm btn-label-dark">Follow</a> */}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default injectIntl(withSnackbar(BlogList));
