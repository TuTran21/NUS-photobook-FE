import React from 'react';
import PropTypes from 'prop-types';
import { WithContext as ReactTags } from 'react-tag-input';

const KeyCodes = {
	comma: 188,
	enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];
class NcpAutoTagInput extends React.Component {
	render() {
		const { values, suggestions, onChange, onDelete, ...restProps } = this.props;
		return (
			<div>
				<ReactTags
					tags={values}
					suggestions={suggestions}
					handleDelete={onDelete}
					handleAddition={onChange}
					handleDrag={this.handleDrag}
					delimiters={delimiters}
					{...restProps}
				/>
			</div>
		);
	}
}

NcpAutoTagInput.propTypes = {
	values: PropTypes.any,
	suggestions: PropTypes.any,
	onChange: PropTypes.any,
	maxLength: PropTypes.any,
	onDelete: PropTypes.any,
};
export default NcpAutoTagInput;
