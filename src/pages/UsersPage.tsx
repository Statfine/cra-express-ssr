import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import axios from 'axios';

const Content = styled.div`
  padding: 12px;
`;

const Input = styled.input`
  box-sizing: border-box;
  margin: 0;
  font-variant: tabular-nums;
  list-style: none;
  font-feature-settings: 'tnum';
  position: relative;
  display: inline-block;
  width: 100%;
  min-width: 0;
  padding: 4px 11px;
  color: #000000d9;
  font-size: 14px;
  line-height: 1.5715;
  background-color: #fff;
  background-image: none;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  margin-bottom: 24px;
  :hover {
    border-color: #40a9ff;
    border-right-width: 1px !important;
  }
  :focus {
    border-color: #40a9ff;
    box-shadow: 0 0 0 1px rgba(24, 144, 255, 0.2);
    border-right-width: 1px !important;
    outline: 0;
  }
`;

const ItemUl = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  outline: none;
`;

const Item = styled.li`
  padding-right: 24px;
  padding-left: 24px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  padding: 12 px 0;
  color: #000000;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  line-height: 40px;
  border-radius: 50%;
`;

const ItemRight = styled.div`
  margin: 10px 24px;
`;

const UsersPage = () => {
  const [key, setKey] = useState('react');
  const [list, setList] = useState<any>([]);
  const fetchUsers = async name => {
    try {
      const { data } = await axios.get(
        `https://api.github.com/search/users?q=${name}&page=1&per_page=10`,
      );
      console.log('result:', data);
      setList(data?.items || []);
      return data;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    console.log('start req');
    fetchUsers(key);
  }, []);

  const handleChangeKey = e => {
    console.log('handleChangeKey', e.target.value);
    setKey(e.target.value);
  };

  const handleBlur = () => {
    console.log('handleBlur', key);
    if (key) fetchUsers(key);
  };

  return (
    <Content>
      <Input value={key} onChange={handleChangeKey} onBlur={handleBlur} />
      <ItemUl>
        {list.map(i => (
          <Item key={i.id}>
            <Avatar src={i.avatar_url} alt="avatar" />
            <ItemRight>
              <p>{i.login}</p>
              <a href={i.html_url}>{i.html_url}</a>
            </ItemRight>
          </Item>
        ))}
      </ItemUl>
    </Content>
  );
};

export default UsersPage;
