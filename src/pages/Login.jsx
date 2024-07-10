import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
import { authActions } from '../store/auth';
import { useSelector,useDispatch } from 'react-redux';
const Login = () => {
  const [Data, setData] = useState({ username: "", password: "" });
  const history = useNavigate();
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
  if(isLoggedIn ===true){
    history("/");
  }
  const dispatch= useDispatch();
  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };
  const submit = async () => {
    try {
      if (Data.username === "" || Data.email === "" || Data.password === "") {
        alert("All field are required");
      } else {
        const response = await axios.post(
          "http://localhost:1000/api/v1/log-in",
          Data
        );
        setData({username: "", password: ""});
        localStorage.setItem("id",response.data.id);
        localStorage.setItem("token",response.data.token);
        dispatch(authActions.login());
        history("/");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="h-[100vh] flex items-center justify-center">
      <div className="p-4 w-2/6 rounded bg-gray-800">
        <div className=" text-white text-2xl font-semibold">Login</div>
        <input
          type="username"
          placeholder="username"
          name="username"
          value={Data.username}
          onChange={change}
          className="rounded px-3 py-2 my-3 w-full"
        ></input>
        
        <input
          type="password"
          placeholder="password"
          name="password"
          value={Data.password}
          onChange={change}
          className="rounded px-3 py-2 my-3 w-full"
        ></input>
        <div className='w-full flex items-center justify-between'>
        <button className=" text-white bg-blue-400 rounded p-2 mt-1 font-semibold" onClick={submit}>Login</button>
        <Link to="/Signup" className='hover:text-gray-200 text-gray-400 '>Not having an account ? SignUp here...</Link>
        </div>
        
      </div>
      
    </div>
  )
}

export default Login