// src/components/UserList.js
import React, { useEffect, useState } from 'react';
import { fetchUserData } from './api/supabaseClient';

const UserList = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchUserData();
      setUserData(data);
    };
    loadData();
  }, []);

  if (!userData) return <div>Loading...</div>;

  return (
    <div>
      <h1>User Data</h1>
      <pre>{JSON.stringify(userData, null, 2)}</pre> {/* Display the data */}
    </div>
  );
};

export default UserList;

