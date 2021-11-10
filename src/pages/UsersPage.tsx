import React, { useEffect } from 'react';
import axios from 'axios';

const UsersPage = () => {
  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(
        'https://jsonplaceholder.typicode.com/users',
      );
      console.log('result:' + data);
      return data;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    console.log('start req');
    fetchUsers();
  }, []);

  return <div>UsersPage</div>;
};

export default UsersPage;
