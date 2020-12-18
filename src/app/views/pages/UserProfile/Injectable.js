import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import UserProfile from '.';

const mapStateToProps = createStructuredSelector({
	auth: authSelectors.selectAuthDomain(),
});

function mapDispatchToProps(dispatch) {
	return {
		dispatch,
	};
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(UserProfile);
