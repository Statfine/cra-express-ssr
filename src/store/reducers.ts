/*
 * @Description: redux
 * 注意： SSR中不能动态注入，此处需要添加reducer
 * @Author: shaojia
 * @Date: 2021-11-09 17:37:22
 * @LastEditTime: 2021-11-10 11:10:56
 * @LastEditors: shaojia
 */
/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers, Reducer } from '@reduxjs/toolkit';

import testReducer from '../pages/Test/slice';

// import { InjectedReducersType } from 'utils/types/injector-typings';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export function createReducer(injectedReducers?: any) {
  // Initially we don't have any injectedReducers, so returning identity function to avoid the error
  if (!injectedReducers || Object.keys(injectedReducers).length === 0) {
    // return state => state;
    return combineReducers({
      test: testReducer,
    }) as Reducer;
  } else {
    return combineReducers({
      ...injectedReducers,
      test: testReducer,
    }) as Reducer;
  }
}
