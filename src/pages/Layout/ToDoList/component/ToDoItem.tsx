import { Todo } from 'src/context/Todo';

const ToDoItem = ({ todo: { id, text, finished } }: { todo: Todo }) => {
	return (
		<div id={id} >
			{text},{`finished：${finished}`}
		</div>
	);
};
export default ToDoItem;
