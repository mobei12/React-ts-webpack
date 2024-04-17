import { LazyExoticComponent, Suspense, ReactNode } from 'react';

export const elementSuspenseWrapper = (
	Child: LazyExoticComponent<() => JSX.Element>,
	customFallback?: ReactNode
) => {
	return (
		<Suspense fallback={customFallback || <h2 className='dark:text-bg-gray-200 text-bg-dark-300 text-4xl '>页面加载中请稍候...</h2>}>
			<Child/>
		</Suspense>)
};

export const a = 1
