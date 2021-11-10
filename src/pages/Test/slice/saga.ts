import { takeLatest, put, select } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { testActions } from './index';
import { selectMessageCount } from './selectors';

export const CHANGE_COUNT = 'app/change_count';

export function* messageCountSaga(count: PayloadAction<any>) {
  const messageCount = yield select(selectMessageCount);
  console.log('messageCountSaga', count, messageCount);
  yield put(testActions.actionChangeCount(count.payload));
}

export function* testSaga() {
  yield takeLatest(CHANGE_COUNT as any, messageCountSaga); // 监听页面通过createAction发起的saga
}
