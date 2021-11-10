import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { testSaga } from './saga';
import { TestState } from './types';

export const initialState: TestState = {
  messageCount: 0,
};

const slice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    someAction(state, action: PayloadAction<any>) {},
    actionChangeCount(state, action: PayloadAction<any>) {
      state.messageCount = action.payload;
    },
  },
});

export const { actions: testActions, reducer } = slice;

export const useTestSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: testSaga });
  return { actions: slice.actions };
};

export default slice.reducer;

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useTestSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
