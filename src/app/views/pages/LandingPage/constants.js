const menu = [
	{
		id: 0,
		title: 'Feeds',
		name: 'feeds',
		query: {
			isPublic: true,
		},
	},
	{
		id: 1,
		title: 'My Photos',
		name: 'myPhotos',
		query: {
			isOwner: true,
		},
	},
	{
		id: 2,
		title: 'My Albums',
		name: 'myAlbums',
	},
];

export default menu;
