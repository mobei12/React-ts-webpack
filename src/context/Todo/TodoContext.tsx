import React, { createContext, useState } from 'react';

export type Todo = {
	id: string;
	text: string;
	finished: boolean;
};
type TodoContextProps = {
	toDos: Todo[];
	addToDo: (text: string) => void;
	editToDo: (prop: Todo) => void;
	deleteToDo: (id: Todo['id']) => void;
};
// 创建容器，并实现
export const ToDoContext = createContext<TodoContextProps | undefined>(undefined);
const TodoProvider = (props: { children: React.ReactNode }) => {
	const [toDos, setToDos] = useState<Todo[]>([]);
	const addToDo = (text: string) => {
		const todo: Todo = {
			text,
			id: crypto.randomUUID(),
			finished: false,
		};
		setToDos([...toDos, todo]);
	};
	const deleteToDo = (id: string) => {
		const temp = toDos.filter((item) => {
			return item.id !== id;
		});
		setToDos([...temp]);
	};
	const editToDo = (prop: Todo) => {
		const temp = toDos.map((item) => {
			if (item.id === prop.id) {
				Object.assign(item, prop);
			}
			return item;
		});
		setToDos([...temp]);
	};
	const value: TodoContextProps = {
		toDos,
		addToDo,
		deleteToDo,
		editToDo,
	};
	return <ToDoContext.Provider value={value}>{props.children}</ToDoContext.Provider>;
};
export default TodoProvider;
