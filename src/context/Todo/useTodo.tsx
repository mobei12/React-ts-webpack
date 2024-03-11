import { useContext } from 'react';
import { ToDoContext } from './TodoContext';

const useTodo = () => {
	const context = useContext(ToDoContext);

	if (!context) {
		throw new Error('useTodo must be used within a TodoProvider');
	}

	return context;
};
export default useTodo;
