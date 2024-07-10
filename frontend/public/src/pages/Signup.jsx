import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useSelector } from 'react-redux';
import axios from "axios";
const Signup = () => {
  const history = useNavigate();
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
  if(isLoggedIn ===true){
    history("/");
  }
  const [Data, setData] = useState({ username: "", email: "", password: "" });
  
  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };
  const submit = async () => {
    try {
     
      if (Data.username === "" || Data.email === "" || Data.password === "") {
        console.log("Data", Data);
        alert("All field are required");
      } else {
        
        const response = await axios.post(
          "http://localhost:1000/api/v1/Sign-In",
          Data
        );
        console.log("res", response);
        setData({username: "", email: "", password: ""});
        alert(response.data.message);
        history("/login");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <div className="h-[100vh] flex items-center justify-center">
      <div className="p-4 w-2/6 rounded bg-gray-800">
        <div className=" text-white text-2xl font-semibold">SignUp</div>
        <input
          type="username"
          placeholder="username"
          name="username"
          value={Data.username}
          className="rounded px-3 py-2 my-3 w-full"
          onChange={change}
        ></input>
        <input
          type="email"
          placeholder="email"
          name="email"
          value={Data.email} 
          className="rounded px-3 py-2 my-3 w-full"
          required
          onChange={change}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          className="rounded px-3 py-2 my-3 w-full"
          value={Data.password}
          onChange={change}
        ></input>
        <div className="w-full flex items-center justify-between">
          <button
            className=" text-white bg-blue-400 rounded p-2 mt-1 font-semibold"
            onClick={submit}
          >
            SignUp
          </button>
          <Link to="/Login" className="hover:text-gray-200 text-gray-400 ">
            Already having an account ? Login here...
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
