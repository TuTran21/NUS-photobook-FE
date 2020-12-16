import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { bindPromiseCreators } from 'redux-saga-routines';
import DashboardPage from '.';

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
	return {
		dispatch,
	};
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

// const withReducer = injectReducer({ key: 'userManageReducer', reducer });
// const withSaga = injectSaga({ key: 'userManageReducer', saga });

export default compose(withConnect)(DashboardPage);
