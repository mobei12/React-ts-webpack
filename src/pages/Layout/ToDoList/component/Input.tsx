import { forwardRef, InputHTMLAttributes } from 'react';
/* forwardRef 允许组件使用 ref 将 DOM 节点暴露给父组件。 */
const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(({ ...rest }, ref) => {
	return <input {...rest} type="text" ref={ref} />;
});

export default Input;
