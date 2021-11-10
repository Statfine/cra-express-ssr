/*
 * @Description: SSR build
 * @Author: shaojia
 * @Date: 2021-11-09 11:11:29
 * @LastEditTime: 2021-11-09 11:11:29
 * @LastEditors: shaojia
 */
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

process.on('unhandledRejection', error => {
  throw error;
});

require('../config/env');
const fs = require('fs-extra');
const webpack = require('webpack');
const config = require('../config/webpack.config.server');
const paths = require('../config/paths');

function build() {
  console.log('Creating server build');
  fs.emptyDirSync(paths.ssrBuild);
  let compiler = webpack(config);
  return new Promise((resolve, reject) => {
    compiler.run((error, stats) => {
      if (error) {
        console.log(error);
        return;
      }
      console.log(stats.toString());
    });
  });
}

build();
