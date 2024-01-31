// src/components/Home.tsx
import React, { useState } from 'react';
import { UserService } from '../services/user.service';

const AddUser: React.FC = () => {
  const addUser = async () => {
    try {
      const data = await UserService.addUser(userData);
      console.log('User added:', data);
      alert('User added!')
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const [userData, setUserData] = useState({
    username: '',
    email: '',
    phone: '',
  });

  const handleInputChange = (e: any) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h2>Add User</h2>
      <label>
        Username:
        <input type="text" name="username" onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Email:
        <input type="text" name="email" onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Phone:
        <input type="text" name="phone" onChange={handleInputChange} />
      </label>
      <br />
      <button onClick={addUser}>Add User</button>
    </div>
  );
};

export default AddUser;