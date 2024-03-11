import { useTodo } from 'src/context/Todo';
import ToDoItem from './ToDoItem';

const ToDoList = () => {
	const { toDos } = useTodo();
	if (toDos.length === 0) {
		return <div>暂无数据</div>;
	}
	return (
		<div>
			{toDos.map((item) => {
				return <ToDoItem todo={item} key={item.id} />;
			})}
		</div>
	);
};
export default ToDoList;
