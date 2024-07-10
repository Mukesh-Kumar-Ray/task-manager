import React, { useEffect, useState } from 'react';
import { CgNotes } from "react-icons/cg";
import { MdLabelImportant } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa6";
import { TbNotebookOff } from "react-icons/tb";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
import axios from 'axios';

const Sidebar = () => {
  const dispatch =useDispatch();
  const history =useNavigate();
    const data = [
        {
          title: "All Task",
          icon:<CgNotes className='mr-2 ml-2 mt-2 mb-2'></CgNotes>,
          link:"/",
        },
        {
          title: "Important Task",
          icon:<MdLabelImportant className='mr-2 ml-2 mt-2 mb-2'></MdLabelImportant>,
          link:"/ImportantTasks",
        },
        {
          title: "Completed Task",
          icon:<FaCheckDouble className='mr-2 ml-2 mt-2 mb-2'></FaCheckDouble>,
          link:"/CompleteTasks",
        },
        {
          title: "Incompleted Task",
          icon:<TbNotebookOff className='mr-2 ml-2 mt-2 mb-2'></TbNotebookOff>,
          link:"/InCompleteTasks",
        },
      ];
      const [Data,setData] = useState();
      const logout = ()=>{
        dispatch(authActions.logout());
        localStorage.clear("id");
        localStorage.clear("token");
        history("/signup");
      }
      const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`
      };
      useEffect(()=>{
        const fetch = async () =>{
          const response=await axios.get("http://localhost:1000/api/v2/get-all-tasks",{headers});
          setData(response.data.data);
        };
        if(localStorage.getItem("id") && localStorage.getItem("token")){
          fetch();
        }
        
      })
  return (
    <>
     {Data && (<div>
        <h2 className='text-xl font-semibold text-gray-300'>{Data.username}</h2>
        <h4 className="mb-2 mt-2 text-gray-300">{Data.email}</h4>
        <hr></hr>
     </div>
     )}
     
     <div>
      {data.map((item, index) => (
        <Link to={item.link} key={index} className='my-2 flex items-center text-gray-300 hover:bg-blue-500 rounded-lg'>{item.icon   }  {item.title}</Link>
      ))}
    </div>
     
     <div>
        <button className="bg-gray-300 rounded w-full p-2 hover:bg-blue-500 rounded-lg font-bold" onClick={logout}>Log Out</button>
     </div>
    </>
    
  )
}

export default Sidebar