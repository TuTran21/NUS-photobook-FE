import history from './history';

const signOut = client => {
	localStorage.removeItem('accessToken');
	if (client) {
		client.resetStore();
	}
};

export { signOut };
