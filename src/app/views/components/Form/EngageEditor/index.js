/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import 'react-quill/dist/quill.snow.css';

import React from 'react';
import ReactQuill from 'react-quill';
import styled from 'styled-components';
import theme from 'utils/theme';

const EditorWrapper = styled(ReactQuill)`
	display: flex;
	flex-direction: column;
	min-height: 280px;

	.ql-disabled {
		background-color: ${theme.engDisabledBackground};
		cursor: not-allowed !important;
		opacity: 0.9;
	}

	.ql-container,
	.ql-editor {
		min-height: 400px;
	}
`;

const modules = {
	toolbar: [
		[{ header: [1, 2, 3, 4, 5, 6, false] }],
		['bold', 'italic', 'underline', 'strike', 'blockquote'],
		[{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
		['link', 'image'],
		['blockquote', 'code-block'],
		[{ script: 'sub' }, { script: 'super' }],
		[{ indent: '-1' }, { indent: '+1' }],
		[{ direction: 'rtl' }],
		[{ color: [] }, { background: [] }],
		[{ font: [] }],
		[{ align: [] }],
		['clean'],
	],
};

export default function({ disabled, value, onChange, ...restProps }) {
	return (
		<EditorWrapper
			theme="snow"
			modules={modules}
			readOnly={disabled}
			name="content"
			value={value}
			onChange={onChange}
			{...restProps}
		/>
	);
}
