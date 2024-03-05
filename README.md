### 技术栈 [React](https://react.docschina.org/)(18)+[TypeScript](https://www.typescriptlang.org/zh/)(5.3.3)+[Webpack](https://webpack.docschina.org/)(5.90.3)

一个 基础的antd react ts 模版，添加了reactRouter6,封装了axios请求

### `yarn start`

### `yarn build`

### `yarn lint` 运行eslint检测

````text
+--- README.md                 说明文档
\--- build                     webpack相关配置
    +--- webpack.prod.js       生产环境配置
    +--- webpack.dev.js        开发环境配置
    +--- webpack.dll.conf.js   dll生成配置，用于生成dll
    +--- webpack.base.js       基础配置  
+--- package.json            依赖说明文件
+--- public                  基础配置文件
+---build webpack相关配置
\---src 主要开发文件
    +---api                 axios 请求封装
    +---component           功能组件
    +---hooks               自定义钩子
    +---pages               页面组件
    +---router              路由配置，（新增页面，需要在这进行配置,
    +---utils               一些工具方法
+---.prettierrc             格式化配置
+---.eslintrc               代码检测配置
+---.gitignore              git忽略
+---tsconfig.json           ts配置
+---.env                    基础环境变量
+---dev.env                 开发环境变量
+---prod.env                生产环境变量
````
