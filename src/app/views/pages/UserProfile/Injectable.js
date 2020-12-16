import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import testSelectors from 'app/state/ducks/test/selectors';

import Test from '.';

const mapStateToProps = createStructuredSelector({
	activeTest: testSelectors.makeSelectActiveTest(),
	auth: authSelectors.selectAuthDomain(),
});

function mapDispatchToProps(dispatch) {
	return {
		dispatch,
	};
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Test);
