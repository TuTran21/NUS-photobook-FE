import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!

const handleImageUpload = file => {
	return new Promise(resolve => {
		const reader = new FileReader();
		reader.onload = data => {
			// @ts-ignore
			resolve(data.target.result);
		};
		reader.readAsDataURL(file);
	});
};

const MarkdownEditor = props => {
	const { handleChange, value } = props;

	const handleEditorChange = ({ html, text }) => {
		if (handleChange) {
			handleChange(html, text);
		}
	};

	return (
		<MdEditor
			value={value}
			style={{ height: '500px' }}
			renderHTML={text => mdParser.render(text)}
			onImageUpload={handleImageUpload}
			onChange={handleEditorChange}
		/>
	);
};

export default MarkdownEditor;
