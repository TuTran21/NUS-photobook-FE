import React, { useState } from 'react';
import { Modal, Slide, IconButton, Button, TextField, Switch, MenuItem, FormControlLabel } from '@material-ui/core';
import styled, { css } from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';
import clsx from 'clsx';
import { Formik } from 'formik';
import { FormattedMessage, injectIntl } from 'react-intl';
import { withSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import UserMutations from 'graphql/mutations/User/';
import { useMutation } from '@apollo/client';
import { getMessage } from 'utils/messageConvert';

const ModalWrapper = styled.div``;

const ModalSlide = styled(Slide)`
	margin-left: auto;
	height: 100%;
	min-width: 330px;
	max-width: 600px;
	background-color: white;
`;

const CloseButton = styled(IconButton)`
	position: absolute !important;
	top: 5px;
	right: 10px;
`;

const Title = styled.h5`
	padding-left: 50px;
	padding-top: 50px;
`;

const ModalHeader = styled.div`
	padding: 0 !important;
	min-height: 50px;
	border: none !important;
	display: flex;
	align-items: center;
	position: relative;
`;

const ModalBody = styled.div`
	padding: 0 50px;
	padding-top: 10px;
`;

const FormActions = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	margin-top: 10px;
`;

const SubmitButton = styled.button`
	${props =>
		props.isLoading === 'true' &&
		css`
			padding-right: 2.5rem;
		`};
`;

function EditPhotoModal(props) {
	const { open, onClose, intl, photoData, updateUser, updatePhotoRes } = props;

	let title, submitButtonText;

	if (!photoData) {
		onClose();
	}

	title = 'Edit Photo';
	submitButtonText = 'Submit';
	return (
		<Modal
			open={open}
			onClose={onClose}
			aria-labelledby="simple-modal-title"
			aria-describedby="simple-modal-description"
			style={{ outline: 'none' }}
		>
			<ModalSlide direction="left" in={open} mountOnEnter unmountOnExit>
				<ModalWrapper>
					<ModalHeader>
						<Title>{title}</Title>
						<CloseButton onClick={onClose}>
							<CloseIcon></CloseIcon>
						</CloseButton>
					</ModalHeader>
					<ModalBody>
						<Formik
							initialValues={photoData}
							validate={values => {
								const errors = {};

								if (!values.title) {
									// https://github.com/formatjs/react-intl/blob/master/docs/API.md#injection-api
									errors.title = intl.formatMessage({
										id: 'AUTH.VALIDATION.REQUIRED_FIELD',
									});
								}

								if (!values.description) {
									errors.description = intl.formatMessage({
										id: 'AUTH.VALIDATION.REQUIRED_FIELD',
									});
								}

								if (!values.isPublic) {
									errors.isPublic = intl.formatMessage({
										id: 'AUTH.VALIDATION.REQUIRED_FIELD',
									});
								}

								if (!values.image) {
									errors.firstName = intl.formatMessage({
										id: 'AUTH.VALIDATION.REQUIRED_FIELD',
									});
								}

								return errors;
							}}
							onSubmit={(values, { setStatus, setSubmitting }) => {
								const photo = {
									id: values.id,
									title: values.title,
									description: values.description,
									isPublic: values.firstName,
									image: values.image,
								};

								updateUser({
									variables: {
										photo: photo,
									},
								});
								return;
							}}
						>
							{({ values, status, errors, touched, handleChange, handleBlur, handleSubmit }) => (
								<form noValidate={true} autoComplete="off" className="kt-form" onSubmit={handleSubmit}>
									<div>
										<TextField
											type="text"
											label="Title"
											margin="normal"
											className="kt-width-full"
											name="title"
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.title}
											helperText={touched.title && errors.title}
											error={Boolean(touched.title && errors.title)}
										/>
									</div>

									<div>
										<TextField
											type="text"
											label="Description"
											margin="normal"
											className="kt-width-full"
											name="description"
											onBlur={handleBlur}
											onChange={handleChange}
											value={values.description}
											helperText={touched.description && errors.description}
											error={Boolean(touched.description && errors.description)}
										/>
									</div>

									<div>
										<FormControlLabel
											control={
												<Switch
													name="isPublic"
													checked={values.isPublic}
													onChange={handleChange}
													name="isPublic"
													color="primary"
												/>
											}
											label="Is public ?"
										/>
									</div>

									<FormActions>
										<SubmitButton
											id="kt_update_user_submit"
											type="submit"
											disabled={updatePhotoRes.loading}
											isLoading={updatePhotoRes.loading.toString()}
											className={`btn btn-primary mt-3 btn-elevate kt-login__btn-primary ${clsx({
												'kt-spinner kt-spinner--right kt-spinner--md kt-spinner--light':
													updatePhotoRes.loading,
											})}`}
										>
											{submitButtonText}
										</SubmitButton>
									</FormActions>
								</form>
							)}
						</Formik>
					</ModalBody>
				</ModalWrapper>
			</ModalSlide>
		</Modal>
	);
}

EditPhotoModal.propTypes = {
	open: PropTypes.bool.isRequired,
	// Favorite: PropTypes.function.isRequired,
	onClose: PropTypes.func.isRequired,
	intl: PropTypes.object.isRequired,
};

export default injectIntl(withSnackbar(EditPhotoModal));
