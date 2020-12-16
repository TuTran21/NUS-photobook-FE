import React from 'react';

class HeaderDropdownToggle extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		e.preventDefault();
		this.props.onClick(e);
	}

	render() {
		return (
			<div ref={this.props.innerRef} className="kt-header__topbar-wrapper" onClick={this.handleClick}>
				{this.props.children}
			</div>
		);
	}
}

export default React.forwardRef((props, ref) => <HeaderDropdownToggle innerRef={ref} {...props} />);
