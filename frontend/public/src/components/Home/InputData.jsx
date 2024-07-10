import React, { useState,useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";

const InputData = ({Inputdiv,setInputdiv,UpdateData,setUpdateData}) => {
  const [Data,setData] = useState({title:"",desc:""});
  useEffect(()=>{
    setData({title:UpdateData.title,desc:UpdateData.desc})
  },[UpdateData])
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  };
  const change=(e)=> {
    const{name,value}= e.target;
    setData({...Data,[name]:value});
  }
  const submitData=async ()=>{
    if(Data.title === "" || Data.desc==""){
      alert("All fields are required");
    }
    else{
      await axios.post("http://localhost:1000/api/v2/create-task",Data,{headers});
      setData({title:"",desc:""});
      setInputdiv("hidden")
    }
  }

  const UpdateTask = async () =>{
    if(Data.title === "" || Data.desc==""){
      alert("All fields are required");
    }
    else{
      await axios.put(`http://localhost:1000/api/v2/Update-task/${UpdateData.id}`,Data,{headers,});
      setUpdateData({id:"",title:"",desc:""});
      setData({title:"",desc:""});
      setInputdiv("hidden");
    }
  }
  return (
    <>
      <div className={` ${Inputdiv}  top-0 left-0 bg-gray-800 opacity-80 h-screen w-full `}></div>
      <div className={` ${Inputdiv}  top-0 left-0 flex items-center justify-center h-screen w-full `}>
      
        <div className=" flex flex-col w-2/6 bg-gray-900 p-4 rounder ">
        <div className=" flex justify-end my-2">
            <button onClick={()=>{setInputdiv("hidden");setData({title:"",desc:""}); setUpdateData({id:"",title:"",desc:""})} } className="text-white text-2xl">
            <RxCross2 />
            </button>
        </div>
        
          <input
            placeholder=" Appropriate Title"
            name="title"
            value={Data.title}
            onChange={change}
            className="px-3 py-2 rounded mb-2"
          ></input>
          <textarea
            placeholder=" Description "
            name="desc"
            rows="10"
            cols="50"
            className="px-3 py-2 rounded mb-2"
            value={Data.desc}
            onChange={change}
          ></textarea>
          {
            UpdateData.id ==="" ? ( <button className=" rounded text-2xl text-white bg-blue-400 mb-2 mt-2 font-semibold" onClick={submitData}>Submit</button>):(<button className=" rounded text-2xl text-white bg-blue-400 mb-2 mt-2 font-semibold" onClick={UpdateTask}>Update</button>)
          }
          
         
        </div>
      </div>
    </>
  );
};

export default InputData;
