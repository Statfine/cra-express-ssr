/**
 *
 * Test
 *
 */
import React, { memo } from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components/macro';
import { useSelector, useDispatch } from 'react-redux';
import { createAction } from '@reduxjs/toolkit';

import { testActions } from './slice';
import { selectMessageCount } from './slice/selectors';
import { CHANGE_COUNT } from './slice/saga';

interface Props {}

export const Test = memo((props: Props) => {
  const dispatch = useDispatch();

  const messageCount = useSelector(selectMessageCount);

  const handleChangeCount = () => {
    dispatch(testActions.actionChangeCount(messageCount + 1));
  };
  const handleChangeSagaCount = () => {
    const increment = createAction<number | undefined>(CHANGE_COUNT);
    dispatch(increment(messageCount + 1));
  };

  return (
    <Div>
      <Helmet>
        <title>Test Page</title>
      </Helmet>
      <Title>Test redux saga</Title>
      <p>{messageCount}</p>
      <div onClick={handleChangeCount}> 点击次数+1</div>
      <div onClick={handleChangeSagaCount}>点击次数+1</div>
    </Div>
  );
});

const Div = styled.div``;

const Title = styled.p`
  font-size: 24px;
  font-weight: bolder;
`;

export default Test;
