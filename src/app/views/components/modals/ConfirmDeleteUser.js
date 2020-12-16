import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';
import { useState, useEffect } from 'react';
import LoadingIndicator from '../common/LoadingIndicator';

function ConfirmDeleteTestDialog(props) {
	const { open, handleClose, handleConfirm, loading } = props;
	const [confirmText, setConfirmText] = useState('');

	useEffect(() => {
		setConfirmText('');
	}, [open]);

	return (
		<div>
			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Delete User</DialogTitle>
				<DialogContent>
					<DialogContentText>
						You are going to delete user(s), this action cannot be undone. Please type "confirm" in the box
						below to proceed.
					</DialogContentText>
					<TextField
						onChange={e => setConfirmText(e.target.value)}
						value={confirmText}
						autoFocus
						margin="dense"
						id="confirmDelete"
						label="Confirm delete"
						type="text"
						fullWidth
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button
						disabled={confirmText.toLowerCase() !== 'confirm' || loading}
						onClick={handleConfirm}
						color="primary"
					>
						Confirm {loading && <LoadingIndicator width="10px" height="10px"></LoadingIndicator>}
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default ConfirmDeleteTestDialog;
