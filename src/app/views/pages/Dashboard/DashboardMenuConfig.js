export default {
	header: {
		self: {},
		items: [
			{
				title: 'Dashboards',
				root: true,
				alignment: 'left',
				page: 'dashboard',
				translate: 'MENU.DASHBOARD',
			},
			{
				title: 'Tests',
				root: true,
				alignment: 'left',
				toggle: 'click',
				submenu: [
					{
						title: 'Test list',
						icon: 'flaticon2-list',
						page: 'admin/tests',
					},
					{
						title: 'Create',
						icon: 'flaticon2-plus',
						page: 'admin/test/create',
					},
				],
			},
			{
				title: 'Users',
				root: true,
				alignment: 'left',
				toggle: 'click',
				submenu: [
					{
						title: 'User list',
						icon: 'flaticon2-list',
						page: 'admin/users',
					},
				],
			},
			{
				title: 'Blogs',
				root: true,
				alignment: 'left',
				toggle: 'click',
				submenu: [
					{
						title: 'Blog list',
						icon: 'flaticon2-list',
						page: 'admin/blogs',
					},
				],
			},
		],
	},
	aside: {
		self: {},
		items: [
			{
				title: 'Dashboard',
				root: true,
				icon: 'flaticon2-architecture-and-city',
				page: 'dashboard',
				translate: 'MENU.DASHBOARD',
				bullet: 'dot',
			},
			{
				title: 'User Management',
				translate: 'MENU.USER_MANAGEMENT',
				root: true,
				icon: 'flaticon2-user',
				page: 'admin/users',
			},
		],
	},
};
