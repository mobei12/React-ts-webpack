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
/**
 * 创建一个主题提供者组件，将其包裹的子组件包裹在一个主题上下文中。
 *
 * @param {Object} props - 组件的属性。
 * @param {React.ReactNode} props.children - 需要被包裹在主题提供者中的子组件。
 * @return {JSX.Element} 主题提供者组件。
 */
const TodoProvider = (props: { children: React.ReactNode }): JSX.Element => {
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
