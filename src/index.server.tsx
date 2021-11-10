import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import express, { Request, Response, NextFunction } from 'express';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import path from 'path';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import {
  applyMiddleware,
  createStore,
  combineReducers,
} from '@reduxjs/toolkit';
import PreloadContext from './libs/PreloadContext';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';

import { ServerStyleSheet } from 'styled-components';

// asset-manifest.json 文件路径
// const manifest = JSON.parse(
//   fs.readFileSync(path.resolve('./build/asset-manifest.json'), 'utf8')
// )

// const chunks = Object.keys(manifest.files)
//   .filter(key => /chunk\.js$/.exec(key))
//   .map(key => `<script src=${manifest.files[key]}></script>`)
//   .join('')

const statsFile = path.resolve('./build/loadable-stats.json');

// styled-components 服务端渲染
const sheet = new ServerStyleSheet();

function createPage(root: string, tags: any): string {
  return `
  <!DOCTYPE html>
  <html lang="ko">
    <head>
      <meta charset="utf-8" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <meta name="theme-color" content="#000000" />
      <title>cra-express-ssr</title>
      ${tags.styles}
      ${tags.links}
    </head>
    <body>
      <noscript>You need to enable JavaScript to run this app.</noscript>
      <div id="root">
        ${root}
      </div>
      ${tags.scripts}
    </body>
  </html>
  
  `;
}

const app = express();

// SSR 渲染处理
const serverRender = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const context = {};
  const store = createStore(combineReducers({}), applyMiddleware(thunk));
  const preloadContext = {
    done: false,
    promises: [],
  };

  const extractor = new ChunkExtractor({ statsFile });

  const jsx = (
    // <ChunkExtractorManager extractor={extractor}> ChunkExtractorManager 导致useState不能使用
    <PreloadContext.Provider value={preloadContext}>
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </StaticRouter>
      </Provider>
    </PreloadContext.Provider>
    // </ChunkExtractorManager>
  );

  ReactDOMServer.renderToStaticMarkup(jsx);

  try {
    await Promise.all(preloadContext.promises);
  } catch (error) {
    return res.status(500);
  }
  preloadContext.done = true;
  const root = ReactDOMServer.renderToString(sheet.collectStyles(jsx)); // renderToString 渲染
  const styleTags = sheet.getStyleTags();

  // JSON -> 字符串处理
  // 脚本替换
  const stateString = JSON.stringify(store.getState()).replace(/</g, '\\u003c');
  const stateScript = `
    <script>__REDUX_STATE__=${stateString}</script>
  `;

  const tags = {
    scripts: stateScript + extractor.getScriptTags(), // 插入
    links: extractor.getLinkTags(),
    styles: extractor.getStyleTags() + styleTags,
  } as any;

  res.send(createPage(root, tags)); // 输出
};

const serve = express.static(path.resolve('./build'), {
  index: false,
});

app.use(serve);
app.use(serverRender);

app.listen(7001, () => {
  console.log('Running on http://localhost:7001');
});
