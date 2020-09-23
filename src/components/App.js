import React, { useState } from 'react';
import '../styles/App.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Query from './Query';

const App = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      adminCode: 'q408',
    },
  });

  const [accessToken, setAccessToken] = useState('empty');

  const onSubmit = async ({ username, password, adminCode }) => {
    try {
      const {
        data: { access },
      } = await axios.get(
        'https://api-authentication-development.aonewallet.com/authenticate?ttl=30d',
        {
          auth: {
            username,
            password,
          },
          headers: {
            'Admin-Code': adminCode,
          },
        }
      );
      setAccessToken(access);
      localStorage.setItem('token', access);
      localStorage.setItem('adminCode', adminCode);
    } catch (error) {
      console.log('error here');
    }
  };
  return (
    <div className="App">
      <div className="App-header">
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <p>Username</p>
            <input type="text" name="username" ref={register} />
            <p>Password</p>
            <input type="text" name="password" ref={register} />
            <p>Admin Code</p>
            <input type="text" name="adminCode" ref={register} />
            <br />
            <input type="submit" value="Login" />
          </form>
        </div>
      </div>

      <code>Access Token: {accessToken}</code>

      {accessToken !== 'empty' ? <Query /> : null}
    </div>
  );
};

export default App;
