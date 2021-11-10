/*
 * @Description: redux saga toolkit
 * 注意： SSR中不能动态注入，此处需要添加saga；reducers 中需要添加reducer
 * @Author: shaojia
 * @Date: 2021-11-09 17:37:22
 * @LastEditTime: 2021-11-10 11:10:56
 * @LastEditors: shaojia
 */
import {
  configureStore,
  getDefaultMiddleware,
  StoreEnhancer,
} from '@reduxjs/toolkit';
import { createInjectorsEnhancer } from 'redux-injectors';
import createSagaMiddleware from 'redux-saga';

import { createReducer } from './reducers';

import { testSaga } from '../pages/Test/slice/saga';

export function configureAppStore() {
  const reduxSagaMonitorOptions = {};
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
  const { run: runSaga } = sagaMiddleware;

  // Create the store with saga middleware
  const middlewares = [sagaMiddleware];

  const enhancers = [
    createInjectorsEnhancer({
      createReducer,
      runSaga,
    }),
  ] as StoreEnhancer[];

  const store = configureStore({
    reducer: createReducer(),
    middleware: [...getDefaultMiddleware(), ...middlewares],
    devTools:
      /* istanbul ignore next line */
      process.env.NODE_ENV !== 'production' ||
      process.env.PUBLIC_URL.length > 0,
    enhancers,
  });

  // saga添加
  runSaga(testSaga);

  return store;
}
