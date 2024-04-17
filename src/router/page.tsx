import { lazy } from 'react';

export const User = lazy(() => import('src/pages/User'))
export const Login = lazy(() => import('src/pages/User/Login'))
export const Register = lazy(() => import('src/pages/User/Register'))
export const Home = lazy(() => import('src/pages/Layout'))
export const Welcome = lazy(() => import('src/pages/Layout/Welcome'))
export const PageTemplate = lazy(() => import('src/pages/Layout/PageTemplate'))
export const ToDoList = lazy(() => import('src/pages/Layout/ToDoList'))
export const AuthorityManagement = lazy(() => import('src/pages/Layout/UserManagement/AuthorityManagement'))
export const NotFind = lazy(() => import('src/pages/404'))
