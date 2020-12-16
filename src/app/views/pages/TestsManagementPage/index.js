import React, { useEffect, useState } from 'react';
import CreateUserModal from 'app/views/components/modals/CreateUserModal';
import { DataGrid } from '@material-ui/data-grid';
import TestQueries from 'graphql/queries/Test';
import { useLazyQuery } from '@apollo/client';
import { withSnackbar } from 'notistack';
import { Typography, IconButton, Button, Tooltip } from '@material-ui/core';
import { Close, Delete, Done, Edit } from '@material-ui/icons';
import moment from 'moment';
import EditUserModal from 'app/views/components/modals/EditUserModal';
import ConfirmDeleteTestDialog from 'app/views/components/modals/ConfirmDeleteTest';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import TestMutations from 'graphql/mutations/Test';
import { roundNumberToTwoDecimals } from 'utils/utils';
import { FormattedMessage, injectIntl } from 'react-intl';
import { getMessage } from 'utils/messageConvert';

const RenderColumns = props => {
	const { handleOpenEditModal, handleOpenDeleteModal } = props;
	return [
		{ field: 'id', headerName: 'ID', width: 200 },
		{ field: 'title', headerName: 'Title', width: 250 },
		{ field: 'views', headerName: 'Views', width: 100 },
		{ field: 'testsTaken', headerName: 'Tests taken', width: 100 },
		{
			field: 'author',
			headerName: 'Author',
			description: 'Username of the person who created this test',
			width: 250,
			renderCell: params => {
				return (
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
				);
			},
		},
		{
			field: 'rating',
			headerName: 'Rating',
			description: 'Overall rating of the test coming from users',
			width: 120,
			renderCell: params => (
				<p className="m-0">
					{roundNumberToTwoDecimals(params.value.starAmount)} ({params.value.votes.length} votes)
				</p>
			),
		},
		{
			field: 'publishDate',
			headerName: 'Publish Date',
			description: 'The test will only be valid from this day on',
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
					<IconButton onClick={() => handleOpenEditModal(params.data.id)}>
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

const TestsManagementPage = props => {
	const { intl } = props;
	const [testSelectedForDelete, setTestSelectedForDelete] = useState([]);
	const [data, setData] = useState([]);

	// GET
	const [getTests, testsRes] = useLazyQuery(TestQueries.GET_TESTS, {
		fetchPolicy: 'network-only',
		onCompleted: () => setData(testsRes.data.tests),
		onError: () => {
			setData([]);
			props.enqueueSnackbar('Something went wrong, please make sure you are connected to the internet', {
				variant: 'error',
				anchorOrigin: {
					vertical: 'top',
					horizontal: 'right',
				},
			});
		},
	});
	useEffect(() => {
		getTests({ variables: { offset: 0, limit: 0 } });
	}, []);

	const [selectedTests, setSelectedTests] = useState([]);
	const history = useHistory();

	// DELETE
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [deleteTests, deleteTestsRes] = useMutation(TestMutations.DELETE_MANY, {
		onCompleted: () => handleDeleteSuccess(),
		onError: err => handleDeleteFailure(err),
	});

	const handleDeleteSuccess = () => {
		getTests();
		setDeleteModalOpen(false);
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

	const handleDeleteTest = () => {
		let idArray = [];
		if (testSelectedForDelete.length > 0) {
			return deleteTests({ variables: { tests: testSelectedForDelete } });
		}

		selectedTests.forEach(test => idArray.push(test.id));
		deleteTests({ variables: { tests: idArray } });
	};

	const handleOpenDeleteModal = id => {
		if (id) {
			setTestSelectedForDelete([id]);
		} else {
			setTestSelectedForDelete([]);
		}
		setDeleteModalOpen(true);
	};

	const handleCloseDeleteModal = () => {
		setTestSelectedForDelete([]);
		setDeleteModalOpen(false);
	};

	// EDIT
	const handleOpenEditModal = id => {
		history.push(`/admin/test/edit/${id}`);
	};

	const handleCloseEditModal = () => {};

	// CREATE
	const handleRedirectAddTest = () => {
		history.push('/admin/test/create');
	};

	return (
		<div className="kt-portlet kt-portlet--height-fluid">
			<ConfirmDeleteTestDialog
				open={deleteModalOpen}
				handleClose={handleCloseDeleteModal}
				handleConfirm={handleDeleteTest}
			></ConfirmDeleteTestDialog>
			<div className="kt-portlet__head">
				<div className="kt-portlet__head-label">
					<Typography variant="h5" className="kt-portlet__head-title">
						Test List
					</Typography>
				</div>
				<div className="kt-portlet__head-toolbar">
					<Button variant="contained" color="primary" onClick={() => handleRedirectAddTest()}>
						Add new
					</Button>
					<Button className="ml-2" variant="contained" color="secondary" onClick={() => getTests()}>
						Refresh
					</Button>
					<Button
						className="ml-2"
						variant="contained"
						disabled={selectedTests.length < 1}
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
							setSelectedTests(newSelection.rows);
						}}
						loading={testsRes.loading}
						rows={data}
						columns={RenderColumns({ handleOpenEditModal, handleOpenDeleteModal, handleDeleteTest })}
						pageSize={10}
						checkboxSelection
					/>
				</div>
			</div>
		</div>
	);
};

export default injectIntl(withSnackbar(TestsManagementPage));
