import storage from 'redux-persist/lib/storage';

export const persistConfig = {
	key: 'root',
	whitelist: ['i18n'],
	storage,
};
