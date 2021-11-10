# 前端应用-SSR

> cra + react-router + react-redux + @reduxjs/toolkit + redux-saga + styled-components

````


## Build Setup

```bash
yarn install
npm start
http://localhost:7000/

npm run dev 
http://localhost:7001

# 构建
npm run build

# 服务端构建
npm run build & npm run build:server

````

## 配置 
样式配置（styled-components）

```bash
import { ServerStyleSheet } from 'styled-components';
const root = ReactDOMServer.renderToString(sheet.collectStyles(jsx)); // renderToString 渲染
const styleTags = sheet.getStyleTags();
```


store配置

```bash
const store = createStore(combineReducers({}), applyMiddleware(thunk));

SSR中不能异步注入saga和redux；需要在入口(创建)的时候添加

src/store/configureStore.ts runSaga(testSaga);

src/store/reducers.ts combineReducers({ test: testReducer}）
```

应用输出

```bash
静态文件输出  build
ssr文件输出  dist

```

其它配置
```bash
config/webpack.config.js 添加@loadable/webpack-plugin 文件区分
config/paths.js 添加ssr相关打包路径
scripts/build.server.js SSR打包命令入口
src/index.server.tsx SSR打包入口

```
  



# 项目布局

```
.
├── config                                      // 配置项
│   └── paths                       
├── internals                                   // 内部脚本
│   └── generators                              // 模板  （npm run generate）
├── public                                      // 静态打包资源
├── scripts                                     // 执行脚本
├── src                                         // 源码目录
│   │── components                              // 组件文件
│   ├── libs                                    // context
│   ├── pages                                   // 页面文件
|   |   ├── Test
│   │   └── other
│   ├── locales                               // 国际化
│   ├── types                                 // ts
│   ├── App                                   // 页面路由入口
│   ├── index.server.tsx                      // SSR打包入口
│   ├── index                                 // 项目入口
.

```
