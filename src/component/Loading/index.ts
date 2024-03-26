export default class GlobalLoading {
	private static container: HTMLDivElement | null = null;

	public static showLoading = () => {
		if (this.container) {
			return;
		}
		this.container = document.createElement('div');
		this.container.setAttribute('class', ' fixed top-0 left-0 right-0 bottom-0 z-50 bg-black opacity-45');
		this.container.innerHTML = `
				<div class="loading absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl text-amber-50">加载中...</div>
		`;
		document.body.appendChild(this.container);
	};

	public static hideLoading = () => {
		if (!this.container) {
			return;
		}
		this.container.remove();
		this.container = null;
	};
}
