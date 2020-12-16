/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable prettier/prettier */
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import theme from 'utils/theme';
import classnames from 'classnames';
import { uploadFile } from 'utils/request';
import config from 'containers/Layout/DefaultLayout/layout/footer/node_modules/global-config';

import RemoveIcon from './RemoveIcon.svg';
import { CircularProgress, Button, Grid } from '@material-ui/core';
// import UploadIcon from './UploadIcon.svg';

const FormGroup = styled.div``;

const DocumentList = styled.div``;

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
const StyledSpinner = styled(CircularProgress)`
	width: 20px !important;
	height: 20px !important;
	border-width: 2px !important;
`;

const UploadButton = styled(Button)`
	position: absolute;
	right: 0;
	cursor: pointer;
	top: 30px !important;
	background-color: transparent !important;
	border: none !important;
	padding: 0 !important;
	color: ${theme.engDarkSec} !important;

	&:focus,
	&:active,
	&:hover {
		box-shadow: none !important;
	}
`;

const DocumentItem = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px;
	color: ${theme.engDarkSec};
	font-size: 13px;
	background: rgba(235, 239, 242, 0.4);
	border: 1px solid #e9ebee;
	margin-top: 7px;
	cursor: pointer;

	&:hover {
		background-color: ${theme.engPrimaryLight};
	}
`;

function EngageFileUpload({
	required,
	disabled,
	onChange,
	initValues,
	title,
	isMulti = true,
	hideDocumentList = false,
	colWidth = 12,
	fileType = 'IMAGE',
	...restProps
	// notes,
}) {
	const [fileValue, setFileValue] = useState();
	const [choosenFile, setChoosenFile] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [listDocument, setListDocument] = useState(initValues || []);

	const onFileChange = useCallback(
		event => {
			setChoosenFile(_.get(event, 'target.files[0]'));
		},
		[setChoosenFile],
	);

	React.useEffect(() => {
		if (choosenFile) {
			onUploadFile();
		}
	}, [choosenFile, onUploadFile]);

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
		formData.append('title', fileType);

		setIsLoading(true);
		try {
			const fileUpload = await uploadFile(`${config.apiUrl}/common/document/upload`, {
				method: 'POST',
				body: formData,
			});

			if (fileUpload.data) {
				let newListDocument;
				if (!isMulti) {
					newListDocument = [fileUpload.data];
				} else {
					newListDocument = [...listDocument, fileUpload.data];
					setFileValue('');
					setFileValue(undefined);
				}
				setListDocument(newListDocument);
				onChange(newListDocument);

				setChoosenFile(undefined);

				setIsLoading(false);
			}
		} catch (error) {
			setIsLoading(false);
		}
	}, [choosenFile]);

	const removeDocument = useCallback(
		document => {
			if (disabled) {
				return false;
			}

			const filterListDocuments = _.filter(listDocument, doc => doc.id !== document.id);
			setListDocument(filterListDocuments);
			onChange(filterListDocuments);
		},
		[setListDocument],
	);

	return (
		<React.Fragment>
			<Grid item xs={colWidth}>
				<FormGroup className="eng-input--primary">
					<Label
						className={classnames('eng-label--input-title', {
							'eng-label--required': required,
						})}
					>
						{title}
					</Label>
					<Input type="file" disabled={disabled} value={fileValue} onChange={onFileChange} {...restProps} />
					{isLoading && (
						<UploadButton>
							<StyledSpinner />
						</UploadButton>
					)}
					{/* <UploadButton onClick={onUploadFile} disabled={isLoading}>
            {isLoading ? <StyledSpinner /> : (
              <React.Fragment>
                <img src={UploadIcon} alt="" />
              </React.Fragment>
            )}
          </UploadButton> */}
					{/* <UploadIconImage onClick={onUploadFile} src={UploadIcon} alt="" /> */}

					{/* <Notes>
            The file size is less than or 2MB. The file dimension is within 300x200.
          </Notes> */}
					{!hideDocumentList && (
						<DocumentList>
							{_.map(listDocument, document => (
								<DocumentItem key={_.get(document, 'id')}>
									<span>{_.get(document, 'name')}</span>
									<img src={RemoveIcon} alt="" onClick={() => removeDocument(document)} />
								</DocumentItem>
							))}
						</DocumentList>
					)}
				</FormGroup>
			</Grid>
		</React.Fragment>
	);
}

EngageFileUpload.propTypes = {
	required: PropTypes.any,
	disabled: PropTypes.any,
	onChange: PropTypes.func,
	initValues: PropTypes.any,
	title: PropTypes.any,
	isMulti: PropTypes.any,
	hideDocumentList: PropTypes.any,
	colWidth: PropTypes.any,
	fileType: PropTypes.any,
	// notes: PropTypes.any,
};

export default EngageFileUpload;
