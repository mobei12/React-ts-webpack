import { FC } from 'react';
import { TodoProvider } from 'src/context/Todo';
import AddTodo from './component/AddTodo';
import ToDoList from './component/ToDolist';
import './index.scss';

const ToDoListContainer: FC = () => {
	return (
		<div className="ToDo-container">
			<h1>ToDoList</h1>
			<TodoProvider>
				<div>
					<AddTodo />
					<ToDoList />
				</div>
			</TodoProvider>
		</div>
	);
};
export default ToDoListContainer;
