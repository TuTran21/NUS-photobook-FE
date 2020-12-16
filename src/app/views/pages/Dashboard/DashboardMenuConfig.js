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
					// 	{
					// 		title: 'Utils',
					// 		bullet: 'dot',
					// 		submenu: [
					// 			{
					// 				title: 'Click Away Listener',
					// 				bullet: 'line',
					// 				page: 'google-material/utils/click-away-listener',
					// 			},
					// 			{
					// 				title: 'Modal',
					// 				bullet: 'line',
					// 				page: 'google-material/utils/modal',
					// 			},
					// 			{
					// 				title: 'No SSR',
					// 				bullet: 'line',
					// 				page: 'google-material/utils/no-ssr',
					// 			},
					// 			{
					// 				title: 'Popover',
					// 				bullet: 'line',
					// 				page: 'google-material/utils/popover',
					// 			},
					// 			{
					// 				title: 'Popper',
					// 				bullet: 'line',
					// 				page: 'google-material/utils/popper',
					// 			},
					// 			{
					// 				title: 'Portal',
					// 				bullet: 'line',
					// 				page: 'google-material/utils/portal',
					// 			},
					// 			{
					// 				title: 'Transitions',
					// 				bullet: 'line',
					// 				page: 'google-material/utils/transitions',
					// 			},
					// 			{
					// 				title: 'useMediaQuery',
					// 				bullet: 'line',
					// 				page: 'google-material/utils/use-media-query',
					// 			},
					// 		],
					// 	},
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
