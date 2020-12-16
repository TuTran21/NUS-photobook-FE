import React, { useEffect, useState } from 'react';
import CreateUserModal from 'app/views/components/modals/CreateUserModal';
import { DataGrid } from '@material-ui/data-grid';
import UserQueries from 'graphql/queries/User';
import { useLazyQuery, useMutation } from '@apollo/client';
import { withSnackbar } from 'notistack';
import { Typography, IconButton, Button } from '@material-ui/core';
import { Close, Delete, Done, Edit } from '@material-ui/icons';
import moment from 'moment';
import EditUserModal from 'app/views/components/modals/EditUserModal';
import ConfirmDeleteUserDialog from 'app/views/components/modals/ConfirmDeleteUser';
import UserMutations from 'graphql/mutations/User';
import { FormattedMessage, injectIntl } from 'react-intl';
import { getMessage } from 'utils/messageConvert';

const RenderColumns = props => {
	const { handleOpenEditModal, handleOpenDeleteModal } = props;
	return [
		{ field: 'id', headerName: 'ID', width: 200 },
		{ field: 'username', headerName: 'Username', width: 250 },
		{ field: 'email', headerName: 'Email', width: 250 },
		{ field: 'firstName', headerName: 'First name', width: 130 },
		{ field: 'lastName', headerName: 'Last name', width: 130 },
		{
			field: 'isVerified',
			headerName: 'Verified',
			description: "Whether or not the user's email has been verified",
			width: 90,
			renderCell: params => (
				<div>{params.value ? <Done color="primary"></Done> : <Close color="error"></Close>}</div>
			),
		},
		{
			field: 'userType',
			headerName: 'User role',
			width: 90,
		},
		{
			field: 'lastLogin',
			headerName: 'Last login',
			width: 150,
			valueFormatter: params => moment(params.value).format('DD-MM-YYYY'),
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

const UsersManagementPage = props => {
	const { intl } = props;
	const [userSelectedForDelete, setUserSelectedForDelete] = useState([]);
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
	const [editUserData, setEditUserData] = useState({});
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [data, setData] = useState([]);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [selectedUsers, setSelectedUsers] = useState([]);
	// GET USERS
	const [getUsers, usersData] = useLazyQuery(UserQueries.GET_USERS, {
		fetchPolicy: 'network-only',
		onCompleted: () => handleGetUsersSuccess(),
		onError: err => handleGetUserError(err),
	});
	useEffect(() => {
		getUsers();
	}, []);

	const handleGetUsersSuccess = () => {
		setData(usersData.data.users);
	};

	const handleGetUserError = err => {
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
	const [updateUser, updateUserRes] = useMutation(UserMutations.ADMIN_UPDATE_USER, {
		onCompleted: () => handleUpdateSuccess(),
		onError: err => handleUpdateFailure(err),
	});

	const handleUpdateSuccess = () => {
		getUsers();
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
	const [deleteUsers, deleteUsersRes] = useMutation(UserMutations.DELETE_MANY, {
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
		getUsers();
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

	const handleDeleteUsers = () => {
		let idArray = [];
		if (userSelectedForDelete.length > 0) {
			return deleteUsers({ variables: { users: userSelectedForDelete } });
		}

		selectedUsers.forEach(user => idArray.push(user.id));
		deleteUsers({ variables: { users: idArray } });
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
					<Button variant="contained" color="secondary" className="ml-2" onClick={() => getUsers()}>
						Refresh
					</Button>
					<Button
						className="ml-2"
						variant="contained"
						disabled={selectedUsers.length < 1}
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
						loading={usersData.loading}
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
					handleConfirm={handleDeleteUsers}
					loading={deleteUsersRes.loading}
				></ConfirmDeleteUserDialog>
				<EditUserModal
					open={isEditModalOpen}
					onClose={handleCloseEditModal}
					userData={editUserData}
					updateUser={updateUser}
					updateUserRes={updateUserRes}
					handleCreateUserPromise={handleCreateUserPromise}
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
				></EditUserModal>
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

export default injectIntl(withSnackbar(UsersManagementPage));
