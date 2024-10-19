import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    alert('In handle signup');
    e.preventDefault();
    try {
    alert('In handle try');
      // const response = await axios.post(`${process.env.REACT_APP_API_URL}/signup`, {
        const response = await axios.post('http://localhost:5000/api/auth/signup', {
        username,
        email,
        password
      });
      console.log(response);
      
      console.log(response.data);
      alert('User registered successfully');
    } catch (error) {
      console.error(error);
      alert('Error during signup',error);
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
