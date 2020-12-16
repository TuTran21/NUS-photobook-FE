import React, { useEffect, useState } from 'react';
import CreateUserModal from 'app/views/components/modals/CreateUserModal';
import { DataGrid } from '@material-ui/data-grid';
import BlogQueries from 'graphql/queries/Blog';
import { useLazyQuery, useMutation } from '@apollo/client';
import { withSnackbar } from 'notistack';
import { Typography, IconButton, Button, Tooltip } from '@material-ui/core';
import { Close, Delete, Done, Edit } from '@material-ui/icons';
import moment from 'moment';
import EditUserModal from 'app/views/components/modals/EditUserModal';
import ConfirmDeletePostDialog from 'app/views/components/modals/ConfirmDeletePosts';
import UserMutations from 'graphql/mutations/User';
import { FormattedMessage, injectIntl } from 'react-intl';
import { getMessage } from 'utils/messageConvert';
import { useHistory } from 'react-router-dom';
import BlogsMutation from 'graphql/mutations/Blog';

const RenderColumns = props => {
	const { handleEdit, handleOpenDeleteModal } = props;
	return [
		{ field: 'id', headerName: 'ID', width: 200 },
		{ field: 'title', headerName: 'Title', width: 250 },
		{
			field: 'isPublished',
			headerName: 'Is published',
			description: 'Whether or not the blog is published and displayed publicly',
			width: 120,
			renderCell: params => (
				<div>{params.value ? <Done color="primary"></Done> : <Close color="error"></Close>}</div>
			),
		},
		{
			field: 'author',
			headerName: 'Author',
			width: 100,
			description: 'Username of the person who created this blog',
			width: 250,
			renderCell: params => (
				<div>
					{params.value ? (
						<p className="m-0">{params.value.username}</p>
					) : (
						<Tooltip
							title="This user has been removed and is no longer available"
							aria-label="removed user"
						>
							<Typography variant="body2">Removed user</Typography>
						</Tooltip>
					)}
				</div>
			),
		},
		{
			field: 'createdAt',
			headerName: 'Created at',
			width: 120,
			valueFormatter: params => moment(params.value).format('DD-MM-YYYY'),
		},
		{
			field: 'updatedAt',
			headerName: 'Updated at',
			width: 120,
			valueFormatter: params => moment(params.value).format('DD-MM-YYYY'),
		},
		{
			field: 'actions',
			headerName: 'Actions',
			description: "Edit user's information",
			width: 130,
			disableClickEventBubbling: true,
			renderCell: params => (
				<React.Fragment>
					<IconButton onClick={() => handleEdit(params.data.id)}>
						<Edit></Edit>
					</IconButton>

					<IconButton onClick={() => handleOpenDeleteModal(params.data.id)}>
						<Delete></Delete>
					</IconButton>
				</React.Fragment>
			),
		},
	];
};

const EventManagementPage = props => {
	const { intl } = props;
	const [postSelectedForDelete, setPostSelectedForDelete] = useState([]);
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
	const [editUserData, setEditUserData] = useState({});
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [data, setData] = useState([]);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [selectedBlogs, setSelectedBlogs] = useState([]);
	const history = useHistory();
	// GET BLOGS
	const [getEvents, eventsData] = useLazyQuery(BlogQueries.GET_BLOGS, {
		fetchPolicy: 'network-only',
		onCompleted: () => handleGetEventssSuccess(),
		onError: err => handleGetEventsError(err),
	});
	useEffect(() => {
		getEvents();
	}, []);

	const handleGetEventssSuccess = () => {
		setData(eventsData.data.posts);
	};

	const handleGetEventsError = err => {
		let message = getMessage(err.message);

		setData([]);
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
	};

	// CREATE
	const [createUser, createUserRes] = useMutation(UserMutations.ADMIN_CREATE_USER, {
		onCompleted: () => handleCreateSuccess(),
		onError: err => handleCreateFailure(err),
	});

	const handleCreateSuccess = () => {
		setIsCreateModalOpen(false);
		const messageId = 'MANAGE.USERS.EDIT.SUCCESS';
		history.push('/admin/blogs');
		props.enqueueSnackbar(
			intl.formatMessage({
				id: messageId,
			}),
			{
				variant: 'success',
				anchorOrigin: {
					vertical: 'top',
					horizontal: 'right',
				},
			},
		);
	};

	const handleCreateFailure = err => {
		if (!err) {
			return;
		}
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
	};
	// UPDATE
	const [updateBlog, updateBlogRes] = useMutation(UserMutations.ADMIN_UPDATE_USER, {
		onCompleted: () => handleUpdateSuccess(),
		onError: err => handleUpdateFailure(err),
	});

	const handleUpdateSuccess = () => {
		getEvents();
		setIsEditModalOpen(false);
		const messageId = 'MANAGE.USERS.EDIT.SUCCESS';
		props.enqueueSnackbar(
			intl.formatMessage({
				id: messageId,
			}),
			{
				variant: 'success',
				anchorOrigin: {
					vertical: 'top',
					horizontal: 'right',
				},
			},
		);
	};

	const handleUpdateFailure = err => {
		if (!err) {
			return;
		}
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
	};

	// DELETE
	const [deletePosts, deletePostsRes] = useMutation(BlogsMutation.DELETE_MANY, {
		onCompleted: () => handleDeleteSuccess(),
		onError: err => handleDeleteFailure(err),
	});

	const handleOpenDeleteModal = id => {
		if (id) {
			setPostSelectedForDelete([id]);
		} else {
			setPostSelectedForDelete([]);
		}
		setDeleteModalOpen(true);
	};

	const handleCloseDeleteModal = () => {
		setPostSelectedForDelete([]);
		setDeleteModalOpen(false);
	};

	const handleDeleteSuccess = () => {
		handleCloseDeleteModal();
		getEvents();
		props.enqueueSnackbar('Deleted successfully', {
			variant: 'success',
			anchorOrigin: {
				vertical: 'top',
				horizontal: 'right',
			},
		});
	};

	const handleDeleteFailure = err => {
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
	};

	const handledeletePosts = () => {
		let idArray = [];
		if (postSelectedForDelete.length > 0) {
			return deletePosts({ variables: { posts: postSelectedForDelete } });
		}

		selectedBlogs.forEach(user => idArray.push(user.id));
		deletePosts({ variables: { posts: idArray } });
	};

	const handleCreateBlog = () => {
		history.push('/admin/blog/create');
	};

	const handleCloseCreateModal = () => {
		setIsCreateModalOpen(false);
	};

	const handleEdit = id => {
		history.push(`/admin/blog/edit/${id}`);
	};

	const handleCloseEditModal = () => {
		setIsEditModalOpen(false);
	};

	const { handleCreateUserPromise } = props;
	return (
		<div className="kt-portlet kt-portlet--height-fluid">
			<div className="kt-portlet__head">
				<div className="kt-portlet__head-label">
					<Typography variant="h5" className="kt-portlet__head-title">
						Blog List
					</Typography>
				</div>
				<div className="kt-portlet__head-toolbar">
					<Button variant="contained" color="primary" onClick={() => handleCreateBlog()}>
						Add new
					</Button>
					<Button variant="contained" color="secondary" className="ml-2" onClick={() => getEvents()}>
						Refresh
					</Button>
					<Button
						className="ml-2"
						variant="contained"
						disabled={selectedBlogs.length < 1}
						color="default"
						onClick={() => handleOpenDeleteModal()}
					>
						Delete
					</Button>
				</div>
			</div>
			<div className="kt-portlet__body">
				<div style={{ height: 600, width: '100%', margin: '50px 0px' }}>
					<DataGrid
						onSelectionChange={newSelection => {
							setSelectedBlogs(newSelection.rows);
						}}
						loading={eventsData.loading}
						rows={data}
						columns={RenderColumns({ handleEdit, handleOpenDeleteModal })}
						pageSize={10}
						checkboxSelection
					/>
				</div>
			</div>
			<div>
				<ConfirmDeletePostDialog
					open={deleteModalOpen}
					handleClose={handleCloseDeleteModal}
					handleConfirm={handledeletePosts}
					loading={deletePostsRes.loading}
				></ConfirmDeletePostDialog>
				<CreateUserModal
					createUserRes={createUserRes}
					createUser={createUser}
					open={isCreateModalOpen}
					onClose={handleCloseCreateModal}
					handleCreateUserPromise={handleCreateUserPromise}
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
				></CreateUserModal>
			</div>
		</div>
	);
};

export default injectIntl(withSnackbar(EventManagementPage));
