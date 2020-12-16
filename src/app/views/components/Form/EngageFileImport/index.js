/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable prettier/prettier */
import classnames from 'classnames';
import config from 'containers/Layout/DefaultLayout/layout/footer/node_modules/global-config';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Grid, CircularProgress } from '@material-ui/core';
import styled from 'styled-components';
import theme from 'utils/theme';

import ImportIcon from './ImportIcon.svg';
import SuccessullyImport from './SuccessullyImport.svg';

const FormGroup = styled.div``;

const Label = styled.label`
    display: inline-block;
    margin-bottom: 0 !important;
    cursor: pointer;
    line-height: 1.5;
    font-family: 'Nunito',Helvetica,Arial,sans-serif;
    font-size: 16px;
}`;

const Input = styled.input`
	display: block;
	width: 100%;
	height: calc(1.5em + 0.75rem + 2px);
	padding: 0.375rem 0.75rem;
	font-size: 1rem;
	font-weight: 400;
	line-height: 1.5;
	color: #495057;
	background-color: ${theme.ncpWhite};
	background-clip: padding-box;
	border: 1px solid #ced4da;
	border-radius: 0.25rem;

	:focus {
		color: #495057;
		background-color: #fff;
		border-color: #80bdff;
		outline: 0;
		-webkit-box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
		box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
	}
`;
const FileImportWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const UploadButton = styled(Button)`
	width: 136px;
	min-width: 136px;
	height: 36px;
	margin-left: 25px;

	img {
		height: 14px;
		width: 14px;
		padding-bottom: 1px;
	}
`;

const StyledSpinner = styled(CircularProgress)`
	width: 20px !important;
	height: 20px !important;
	border-width: 2px !important;
`;

const MsgSuccess = styled.div`
	color: ${theme.engPrimary};
	display: flex;
	font-weight: bold;
	align-items: center;
	margin-top: 15px;

	img {
		margin-right: 5px;
		margin-bottom: 3px;
	}
`;

function EngageFileImport({
	required,
	disabled,
	onChange,
	initValues,
	title,
	fileType,
	onImport,
	...restProps
	// notes,
}) {
	const [fileValue, setFileValue] = useState();
	const [choosenFile, setChoosenFile] = useState();
	const [document, setDocument] = useState();
	const [isLoading, setIsLoading] = useState(false);

	const onFileChange = useCallback(
		event => {
			setChoosenFile(_.get(event, 'target.files[0]'));
		},
		[setChoosenFile],
	);

	const onUploadFile = useCallback(async () => {
		if (!choosenFile) {
			toast.success('Please select file to upload');
			return;
		}

		if (choosenFile.size > config.maxFileSize) {
			toast.success(`The file size must be less than ${config.maxFileSize / (1024 * 1024)}MB.`);
			return;
		}

		const formData = new FormData();
		formData.append('file', choosenFile);

		if (fileType) {
			formData.append('title', fileType);
		}

		let fileUpload;
		setIsLoading(true);
		try {
			fileUpload = await onImport(formData);
			setIsLoading(false);
			if (fileUpload.data && !fileUpload.data.failed && fileUpload.data.success) {
				setDocument(fileUpload.data);
				setFileValue('');
				setChoosenFile(undefined);
				onChange(fileUpload.data);
			} else {
				setIsLoading(false);
			}
		} catch (error) {
			setIsLoading(false);
		}
		// setIsLoading(true);
		// const fileUpload = await uploadFile(`${config.apiUrl}${uploadUrl}`, {
		//   method: 'POST',
		//   body: formData,
		// })

		// setIsLoading(false);
	}, [choosenFile]);

	return (
		<Grid item xs={12}>
			<FormGroup className="eng-input--primary">
				<Label
					className={classnames('eng-label--input-title', {
						'eng-label--required': required,
					})}
				>
					{title}
				</Label>
				<FileImportWrapper>
					<Input type="file" disabled={disabled} value={fileValue} onChange={onFileChange} {...restProps} />
					<UploadButton color="eng--primary-bg" onClick={onUploadFile} disabled={isLoading}>
						{isLoading ? (
							<StyledSpinner />
						) : (
							<React.Fragment>
								<img src={ImportIcon} alt="" />
								<span>UPLOAD</span>
							</React.Fragment>
						)}
					</UploadButton>
				</FileImportWrapper>

				{!!document && (
					<MsgSuccess>
						<img src={SuccessullyImport} alt="" />
						<span>Successfully uploaded</span>
					</MsgSuccess>
				)}
			</FormGroup>
		</Grid>
	);
}

EngageFileImport.propTypes = {
	required: PropTypes.any,
	disabled: PropTypes.any,
	onChange: PropTypes.func,
	initValues: PropTypes.any,
	title: PropTypes.any,
	isMulti: PropTypes.any,
	hideDocumentList: PropTypes.any,
	colWidth: PropTypes.any,
	fileType: PropTypes.any,
	onImport: PropTypes.any,
	// notes: PropTypes.any,
};

export default EngageFileImport;
