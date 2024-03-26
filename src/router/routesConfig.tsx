import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

import User from 'src/pages/User';
import Login from 'src/pages/User/Login';

import NotFind from 'src/pages/404';
import Home from 'src/pages/Layout';
import PageTemplate from 'src/pages/Layout/PageTemplate';
import { ExtendedRouteObject } from './type';

const Register = lazy(() => import('src/pages/User/Register'));
const ToDoList = lazy(() => import('src/pages/Layout/ToDoList'));
/* ---HomeEnd---*/
export default function routesWithGuard(): ExtendedRouteObject[] {
	const isLogin = !!localStorage.getItem('user_token');
	return [
		{
			path: '/home',
			element: isLogin ? <Home /> : <Navigate to="/user/login" />,
			children: [
				{
					path: 'PageTemplate',
					title: '页面模板',
					element: <PageTemplate />,
				},
				{
					path: 'ToDoList',
					title: 'TodoList',
					element: <ToDoList />,
				},
				{
					path: '',
					element: <Navigate to="PageTemplate" replace />,
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
