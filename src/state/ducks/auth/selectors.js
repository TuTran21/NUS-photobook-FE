import { createSelector } from 'reselect';
import initialState from './';

const selectAuthDomain = state => state.auth || initialState;

const makeSelectAccessToken = () => createSelector(selectAuthDomain, subState => subState.accessToken);

const makeSelectIsLogin = () => createSelector(selectAuthDomain, subState => subState.authenticated);

const makeTakeRefreshToken = () => createSelector(selectAuthDomain, subState => subState.refreshToken);

const makeSelectActiveUser = () => createSelector(selectAuthDomain, subState => subState.activeUser);

export default {
	selectAuthDomain,
	makeSelectAccessToken,
	makeSelectIsLogin,
	makeTakeRefreshToken,
	makeSelectActiveUser,
};
