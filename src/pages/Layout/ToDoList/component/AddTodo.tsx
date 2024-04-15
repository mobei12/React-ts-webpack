import React, { useEffect, useRef } from 'react';
import { EMessageType, showMessage } from 'src/utils';
import { useTodo } from 'src/context/Todo';
import Input from './Input';

const ToDoList = () => {
	const { addToDo } = useTodo();
	const inputRef = useRef<HTMLInputElement>(null);
	useEffect(() => {
		inputRef.current?.focus();
	}, []);
	const handleSub = (e: React.FormEvent) => {
		e.preventDefault();
		if (inputRef.current && inputRef.current.value.trim().length > 0) {
			addToDo(inputRef.current.value);
			inputRef.current.value = '';
			showMessage('添加成功，继续');
		} else {
			showMessage('添加失败请重试', EMessageType.warning);
		}
	};
	return (
		<form onSubmit={handleSub}>
			<Input type="text" ref={inputRef} />
			<button type="submit">添加</button>
		</form>
	);
};
export default ToDoList;
