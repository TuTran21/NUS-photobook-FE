import { connect } from 'react-redux';
import { compose } from 'redux';
import authSelectors from 'state/ducks/auth/selectors';
import AuthPage from '.';

const mapStateToProps = state => {
	return { auth: authSelectors.selectAuthDomain(state) };
};

function mapDispatchToProps(dispatch) {
	return { dispatch };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(AuthPage);
