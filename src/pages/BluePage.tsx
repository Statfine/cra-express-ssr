import React from 'react';
import styled from 'styled-components/macro';

const BluePage = () => {
  return (
    <div>
      <Title>styled-components</Title>
    </div>
  );
};

const Title = styled.p`
  font-size: 24px;
  font-weight: bolder;
  color: #4885ed;
`;

export default BluePage;
