import React, { useEffect, useState } from 'react';
import CreateUserModal from 'app/views/components/modals/CreateUserModal';
import { DataGrid } from '@material-ui/data-grid';
import PhotoQueries from 'graphql/queries/Photo';
import { useLazyQuery, useMutation } from '@apollo/client';
import { withSnackbar } from 'notistack';
import { Typography, IconButton, Button } from '@material-ui/core';
import { Close, Delete, Done, Edit } from '@material-ui/icons';
import moment from 'moment';
import EditUserModal from 'app/views/components/modals/EditUserModal';
import EditPhotoModal from 'app/views/components/modals/EditPhotoModal';
import ConfirmDeleteUserDialog from 'app/views/components/modals/ConfirmDeleteUser';
import UserMutations from 'graphql/mutations/User';
import PhotoMutations from 'graphql/mutations/Photo';
import { injectIntl } from 'react-intl';
import { getMessage } from 'utils/messageConvert';

const RenderColumns = props => {
	const { handleOpenEditModal, handleOpenDeleteModal } = props;
	return [
		{ field: 'id', headerName: 'ID', width: 200 },
		{ field: 'title', headerName: 'Title', width: 250 },
		{ field: 'description', headerName: 'description', width: 250 },
		{
			field: 'user',
			headerName: 'Owner',
			width: 130,
			renderCell: params => <div>{params.value ? params.value.username : 'deleted'}</div>,
		},
		{
			field: 'isPublic',
			headerName: 'Public',
			description: 'Whether or not the photo is public',
			width: 90,
			renderCell: params => (
				<div>{params.value ? <Done color="primary"></Done> : <Close color="error"></Close>}</div>
			),
		},
		{
			field: 'createdAt',
			headerName: 'Created at',
			width: 150,
			valueFormatter: params => moment(params.value).format('DD-MM-YYYY'),
		},
		{
			field: 'updatedAt',
			headerName: 'Updated at',
			width: 150,
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
					<IconButton onClick={() => handleOpenEditModal(params.data)}>
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

const PhotoManagementPage = props => {
	const { intl } = props;
	const [photoSelectedForDelete, setUserSelectedForDelete] = useState([]);
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
	const [editUserData, setEditUserData] = useState({});
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [data, setData] = useState([]);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [selectedPhotos, setSelectedUsers] = useState([]);
	// GET USERS
	const [getPhotos, photosData] = useLazyQuery(PhotoQueries.GET_PHOTOS, {
		fetchPolicy: 'network-only',
		onCompleted: () => handleGetPhotosSuccess(),
		onError: err => handleGetPhotoError(err),
	});
	useEffect(() => {
		getPhotos();
	}, []);

	const handleGetPhotosSuccess = () => {
		setData(photosData.data.photos);
	};

	const handleGetPhotoError = err => {
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
	const [updatePhoto, updatePhotoRes] = useMutation(PhotoMutations.ADMIN_UPDATE_PHOTO, {
		onCompleted: () => handleUpdateSuccess(),
		onError: err => handleUpdateFailure(err),
	});

	const handleUpdateSuccess = () => {
		getPhotos();
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
	const [deletePhotos, deleteUsersRes] = useMutation(UserMutations.DELETE_MANY, {
		onCompleted: () => handleDeleteSuccess(),
		onError: err => handleDeleteFailure(err),
	});

	const handleOpenDeleteModal = id => {
		if (id) {
			setUserSelectedForDelete([id]);
		} else {
			setUserSelectedForDelete([]);
		}
		setDeleteModalOpen(true);
	};

	const handleCloseDeleteModal = () => {
		setUserSelectedForDelete([]);
		setDeleteModalOpen(false);
	};

	const handleDeleteSuccess = () => {
		handleCloseDeleteModal();
		getPhotos();
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

	const handleDeletePhotos = () => {
		let idArray = [];
		if (photoSelectedForDelete.length > 0) {
			return deletePhotos({ variables: { photos: photoSelectedForDelete } });
		}

		selectedPhotos.forEach(photo => idArray.push(photo.id));
		deletePhotos({ variables: { photos: idArray } });
	};

	const handleOpenCreateModal = () => {
		setIsCreateModalOpen(true);
	};

	const handleCloseCreateModal = () => {
		setIsCreateModalOpen(false);
	};

	const handleOpenEditModal = value => {
		setIsEditModalOpen(true);
		setEditUserData(value);
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
						User List
					</Typography>
				</div>
				<div className="kt-portlet__head-toolbar">
					<Button variant="contained" color="primary" onClick={() => handleOpenCreateModal()}>
						Add new
					</Button>
					<Button variant="contained" color="secondary" className="ml-2" onClick={() => getPhotos()}>
						Refresh
					</Button>
					<Button
						className="ml-2"
						variant="contained"
						disabled={selectedPhotos.length < 1}
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
							setSelectedUsers(newSelection.rows);
						}}
						loading={photosData.loading}
						rows={data}
						columns={RenderColumns({ handleOpenEditModal, handleOpenDeleteModal })}
						pageSize={10}
						checkboxSelection
					/>
				</div>
			</div>
			<div>
				<ConfirmDeleteUserDialog
					open={deleteModalOpen}
					handleClose={handleCloseDeleteModal}
					handleConfirm={handleDeletePhotos}
					loading={deleteUsersRes.loading}
				></ConfirmDeleteUserDialog>
				<EditPhotoModal
					open={true}
					onClose={handleCloseEditModal}
					photoData={editUserData}
					updatePhoto={updatePhoto}
					updatePhotoRes={updatePhotoRes}
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
				></EditPhotoModal>
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

export default injectIntl(withSnackbar(PhotoManagementPage));
