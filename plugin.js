class FileListPlugin {
	static defaultOptions = { outputFileName: 'fileList.md', };

	constructor(options) {
		this.options = { ...FileListPlugin.defaultOptions, ...options };
	}

	apply(compiler) {
		const pluginName = FileListPlugin.name;
		const { webpack } = compiler;
		const { Compilation } = webpack;
		const { RawSource } = webpack.sources;
		compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {
			const tabArg = { name: pluginName, stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE }
			compilation.hooks.processAssets.tap(tabArg, (assets) => {
				const content = `# In this build:\n\n${Object.keys(assets).map((fileName) => { return `- ${fileName}` }).join(
					'\n'
				)}`;
				compilation.emitAsset(
					this.options.outputFileName,
					new RawSource(content),
				);
			},);
		});
	}
}
module.exports = { FileListPlugin }
