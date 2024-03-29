import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';

import User from 'src/pages/User';
import Login from 'src/pages/User/Login';
import Register from 'src/pages/User/Register';

import NotFind from 'src/pages/404';
import Home from 'src/pages/Layout';
import PageTemplate from 'src/pages/Layout/PageTemplate';
import ToDoList from 'src/pages/Layout/ToDoList';
import { Tools } from 'src/utils';
import Welcome from 'src/pages/Layout/Welcome';
import AuthorityManagement from 'src/pages/Layout/UserManagement/AuthorityManagement';
import { ExtendedRouteObject } from './type';

/* ---HomeEnd---*/
export default function routesWithGuard(): ExtendedRouteObject[] {
	const isLogin = !!Tools.cacheUserInfo();
	return [
		{
			path: '/home',
			element: isLogin ? <Home /> : <Navigate to="/user/login" />,
			children: [
				{
					path: 'PageTemplate',
					element: <PageTemplate />,
				},
				{
					path: 'ToDoList',
					element: <ToDoList />,
				},
				{
					path: 'Welcome',
					element: <Welcome />,
				},
				{
					path: 'UserManagement',
					children: [
						{
							path: 'AuthorityManagement',
							element: <AuthorityManagement />,
						},
					],
				},
				{
					path: '',
					element: <Navigate to="Welcome" replace />,
				},
			],
		},
		{
			path: '/user',
			element: <User />,
			children: [
				{
					path: 'login',
					element: <Login />,
				},
				{
					path: 'register',
					element: <Register />,
				},
				{
					path: '',
					element: <Navigate to="login" replace />,
				},
			],
		},
		{
			path: '*',
			element: <NotFind />,
		},
	];
}
