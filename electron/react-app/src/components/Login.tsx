// src/components/About.tsx
import React, { useState } from 'react';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

const Login: React.FC = () => {
  const [loginData, setLoginData] = useState({
    username: '',
  });

  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<number>(0);
  const [userData, setUserData] = useState<any>(null);

  const login = async () => {
    try {
      const data = await AuthService.login(loginData);
      const { access_token } = data;
      setToken(access_token);
      console.log('Login successful!');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed!');
    }
  };

  const handleLoginChange = (e: any) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const getUser = async (userId: number) => {
    try {
      const data = await UserService.getUser(userId, token as string);
      console.log('User retrieved:', data);
      setUserData(data);
    } catch (error) {
      console.error('Error getting user:', error);
      alert("Error getting user!")
    }
  };

  return (
    <>
      <div>
        <h2>Login</h2>
        <label>
          Username:
          <input type="text" name="username" onChange={handleLoginChange} />
        </label>
        <br />
        <button onClick={login}>Login</button>
      </div>
      {
        (token) && (
          <p>Get Token: {token}</p>
        )
      }
      <div>
        <h2>Get User</h2>
        <label>
          User ID:
          <input type="text" name="userId" onChange={(e) => setUserId(Number(e.target.value))} />
        </label>
        <br />
        <button onClick={() => getUser(userId)}>Get User</button>
      </div>

      {
        (userData) && (
          <div>
            <h2>User Data</h2>
            <p>Name: {userData.username}</p>
            <p>Email: {userData.email}</p>
            <p>Phone: {userData.phone}</p>
          </div>
        )
      }
    </>
  );
};

export default Login;