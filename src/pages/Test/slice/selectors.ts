import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state?.test || initialState;

export const selectTest = createSelector([selectSlice], state => state);

export const selectMessageCount = createSelector(
  [selectTest],
  appState => appState.messageCount,
);
