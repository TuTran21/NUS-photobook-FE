/* eslint-disable camelcase */
import _ from 'lodash';
import { configure, authorize } from '@shoutem/fetch-token-intercept';
import config from '../global-config';
import { setStorage, getStorage } from './utils';

configure({
	shouldIntercept: requestObj =>
		!_.includes(requestObj.url, '/api/v1/auth/login') &&
		// !_.includes(requestObj.url, '/api/v1/user/refresh-token') &&
		// !_.includes(requestObj.url, '/api/v1/user/app-login') &&
		_.includes(requestObj.url, '/api/v1/'),

	authorizeRequest: (_request, _accessToken) => {
		_request.headers.set('Authorization', `Bearer ${_accessToken}`);
		return _request;
	},

	createAccessTokenRequest: _refreshToken =>
		// eslint-disable-next-line no-undef
		new Request(`${config.apiUrl}/user/refresh-token`, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'X-REFRESH-TOKEN': _refreshToken,
			},
			method: 'POST',
			body: JSON.stringify({}),
		}),

	parseAccessToken: response =>
		response
			.clone()
			.json()
			.then(json => {
				const { access_token, refresh_token } = json;
				const dataStr = localStorage.getItem('persist:token');
				const data = JSON.parse(dataStr);
				data.accessToken = `"${access_token}"`;
				data.refreshToken = `"${refresh_token}"`;

				localStorage.setItem('persist:token', JSON.stringify(data));
				setAccessToken(access_token);
				setRefreshToken(refresh_token);
				return access_token;
			}),
});

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
	if (response.status === 204 || response.status === 205) {
		return null;
	}

	return response.json();
}

let accessToken = '';
let refreshToken = '';

// if (accessToken) {
//   accessToken = accessToken.access_token;
// }

/**
 * Store token to memory
 *
 * @return {string|undefined} Returns either the token or empty string
 */
export function setAccessToken(token) {
	accessToken = token;
	authorize(refreshToken, accessToken);
	setStorage('persist:token', token);
}

export function getAccessToken() {
	const token = getStorage('persist:token');
	accessToken = token;
	if (!token) {
		accessToken = '';
	}

	return accessToken;
}

/**
 * Store token to memory
 *
 * @return {string|undefined} Returns either the token or empty string
 */
export function setRefreshToken(token) {
	refreshToken = token;
	authorize(refreshToken, accessToken);
	setStorage('persist:token', token);
}

export function getRefreshToken() {
	return refreshToken;
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
async function checkStatus(response) {
	if (response.status >= 200 && response.status < 300) {
		return response;
	}

	// if (response.status >= 500) {
	// 	return response;
	// 	// toast.error('INTERNAL SERVER ERROR');
	// }
	// const error = new Error(response.status);
	// error.response = response;
	throw await response.json();
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url, options) {
	const parsedOptions = Object.assign(
		{
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${getAccessToken()}`,

				// 'Device-Type': 'web',
			},
		},
		options,
	);

	return fetch(url, parsedOptions)
		.then(checkStatus)
		.then(parseJSON);
}

export function uploadFile(url, options) {
	return fetch(url, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
		...options,
	})
		.then(checkStatus)
		.then(parseJSON);
}
