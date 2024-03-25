export enum EMessageType {
	success = 'success',
	error = 'error',
	warning = 'warning',
	info = 'info',
}
let container: HTMLDivElement | null;
/**
 * @description 展示提示
 * @param msg  提示信息
 * @param type 类型
 * @param duration 时长111
 * @param callback 回调
 */
interface IMessage {
	msg: string;
	type: EMessageType;
	duration: number;
	callback?: () => void;
}

type MessageComponent = (props: IMessage) => void;
const getColor = (type: EMessageType): string => {
	switch (type) {
		case EMessageType.success:
			return 'text-green-500 bg-green-100';
		case EMessageType.error:
			return 'text-red-500 bg-red-100';
		case EMessageType.warning:
			return 'text-yellow-500 bg-yellow-100';
		case EMessageType.info:
			return 'text-blue-500 bg-blue-100';
		default:
			return 'text-green-500 bg-green-100';
	}
};
const addMessageElement = (
	{ msg, type = EMessageType.success, duration, callback }: IMessage,
	container: HTMLDivElement,
) => {
	const divElement = document.createElement('div');
	divElement.setAttribute('class', 'mt-5');
	const messageElement = document.createElement('span');
	messageElement.textContent = msg;
	messageElement.setAttribute('class', `font-semibold px-4 py-2 rounded-md  text-center ${getColor(type)}`);
	divElement.appendChild(messageElement);
	setTimeout(() => {
		divElement.remove();
		if (container.children.length === 0) {
			container?.remove();
		}
		if (typeof callback === 'function') {
			callback();
		}
	}, duration * 1000);
	container.appendChild(divElement);
};

const directiveRender: MessageComponent = ({ msg, type = EMessageType.success, duration, callback }) => {
	// 创建消息容器
	if (!container) {
		container = document.createElement('div');
		container.setAttribute('class', 'message-container fixed top-0 text-center left-0 right-0');
	}
	document.body.appendChild(container);
	addMessageElement({ msg, type, duration, callback }, container);
};
export default directiveRender;
