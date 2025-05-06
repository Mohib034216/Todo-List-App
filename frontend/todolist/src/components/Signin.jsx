import React, { useState } from 'react';
// import {UserSignin} from '../api/todoapi';
import {useDispatch, useSelector} from 'react-redux';
import { login } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';




function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch  = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector((state) => state.auth)
  console.log(user)
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Login attempted with:', { email, password });
    const response  = await dispatch(login({"email":email,"password":password}))
    // if (login.fulfilled.match(response)){
    //   navigate('/');
    // }
    console.log(response)
    if(response){
      const user = localStorage.getItem('user') && localStorage.getItem('user')
      console.log(user.refresh)
    }

    // alert(response.data)
    // Handle authentication here
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Signin;
