import React from 'react';
import requireAuth from 'app/views/components/middleware/RequireAuth';
import requireAdminAuth from 'app/views/components/middleware/RequireAdminAuth';
// Component for
// Lazy load Components
const LandingPage = React.lazy(() => import('app/views/pages/LandingPage'));
const ErrorsPage = React.lazy(() => import('app/views/pages/ErrorsPage'));
const LogoutPage = React.lazy(() => import('app/views/pages/LogoutPage'));
// Auth
const AuthPage = React.lazy(() => import('app/views/pages/AuthPage/Injectable'));
const ConfirmMailPage = React.lazy(() => import('app/views/pages/ConfirmEmail'));
// Dashboard
const DashboardPage = React.lazy(() => import('app/views/pages/Dashboard'));
const UserManagementPage = React.lazy(() => import('app/views/pages/UsersManagementPage'));

// USER
const UserProfile = React.lazy(() => import('app/views/pages/UserProfile'));

// Routes
const routesConfig = [
	// Is not affected by layout
	{
		path: '/',
		hasLayout: true,
		exact: true,
		name: 'Landing Page',
		hasLayout: false,
		hasFooter: true,
		hasHeader: true,
		component: LandingPage,
	},
	{ path: '/auth', exact: false, hasLayout: false, name: 'Auth Page', component: AuthPage },
	{
		path: '/email/verify/:emailToken',
		exact: false,
		hasLayout: false,
		name: 'Auth Page',
		component: ConfirmMailPage,
	},
	{ path: '/logout', exact: true, hasLayout: false, name: 'Logout Page', component: LogoutPage },
	{
		path: '/400',
		extraProps: { code: '400' },
		exact: true,
		hasLayout: false,
		hasFooter: false,
		hasHeader: false,
		name: '400 Page',
		component: ErrorsPage,
	},
	{
		path: '/401',
		extraProps: { code: '401' },
		exact: true,
		hasLayout: false,
		hasFooter: false,
		hasHeader: false,
		name: '401 Page',
		component: ErrorsPage,
	},
	{
		path: '/403',
		extraProps: { code: '403' },
		exact: true,
		hasLayout: false,
		hasFooter: false,
		hasHeader: false,
		name: '404 Page',
		component: ErrorsPage,
	},
	{
		path: '/404',
		extraProps: { code: '404' },
		exact: true,
		hasLayout: false,
		hasFooter: false,
		hasHeader: false,
		name: '404 Page',
		component: ErrorsPage,
	},
	{
		path: '/500',
		exact: true,
		extraProps: { code: '500' },
		hasLayout: false,
		hasHeader: false,
		hasFooter: false,
		name: '500 Page',
		component: ErrorsPage,
	},
	// Affected by layout
	{
		path: '/dashboard',
		hasLayout: true,
		exact: true,
		name: 'Dashboard',
		component: requireAdminAuth(DashboardPage),
	},
	{
		path: '/admin/users',
		hasLayout: true,
		exact: true,
		name: 'User Management',
		component: requireAdminAuth(UserManagementPage),
	},
	{
		path: '/user/:userId',
		hasLayout: true,
		hasHeader: true,
		exact: true,
		name: 'User Profile',
		component: UserProfile,
	},
];

export default routesConfig;
