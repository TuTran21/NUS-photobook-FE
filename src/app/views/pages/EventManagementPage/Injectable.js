import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
// import reducer from 'state/ducks/userManage/reducer';
import EventManagementPage from '.';

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
	return {
		dispatch,
	};
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

// const withReducer = injectReducer({ key: 'userManageReducer', reducer });

export default compose(withConnect)(EventManagementPage);
