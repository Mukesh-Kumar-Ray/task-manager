import React from 'react';
import { CiHeart } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import axios from 'axios';
const Cards = ({home ,setInputdiv,data,setUpdateData}) => {
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`
      };
    const handleCompleteTask = async (id) =>{
        try{
           await axios.put(`http://localhost:1000/api/v2/Update-complete-task/${id}`,{},{headers});
          
        }
        
        catch(error){
            console.log(error);
        }
    }
    const handleImportant=async (id)=>{
        try{
            await axios.put(`http://localhost:1000/api/v2/Update-imp-task/${id}`,{},{headers});
         }
         
         catch(error){
             console.log(error);
         }
    }
    const handleUpdate = (id,title,desc)=>{
        setInputdiv("fixed");
        setUpdateData({id:id,title:title,desc:desc})
    }
    const deleteTask=async (id)=>{
        try{
            console.log("game");
           const response= await axios.delete(`http://localhost:1000/api/v2/delete-task/${id}`,{headers});
           console.log(response.data.message);
         }
         
         catch(error){
             console.log(error);
         }
    }
    
    return (
        <div className=" grid grid-cols-3 w-full h-full  p-4 gap-4">
            
            {data&&
                data.map((item, ind) => (
                    <div key={ind} className=" p-6 m-4 bg-gray-800 rounded shadow-md">
                        <h2 className="text-xl font-bold text-gray-400">{item.title}</h2>
                        <p className=" text-gray-500 mt-2 mb-2">{item.desc}</p>
                        <div className='flex items-center w-full'>
                        <button className={`${item.completed === false ? "bg-red-500" : "bg-green-500"} bg-gray-300 rounded-l-md p-2 rounded-lg font-bold w-3/6`} onClick={()=>handleCompleteTask(item._id)}>{item.completed ===true ? "Completed":"In Completed"}</button>
                           <div className="text-white rounded p-2 w-3/6 text-2xl flex justify-around">
                             <button onClick={()=>handleImportant(item._id)}>{item.important === false ? <CiHeart /> : <FaHeart className='text-red-500'/>}</button>
                             {
                                ( home!=="false")&&
                                    (<button onClick={()=>handleUpdate(item._id,item.title,item.desc)}><FaEdit /></button> )
                             }
                             <button onClick={()=>deleteTask(item._id)}><MdDelete /></button>
                           </div>
                        </div>
                    </div>
                ))
                
            }
            {home==="true" && <button onClick={()=>setInputdiv("fixed")} className='flex flex-col justify-center items-center p-6 m-4  bg-gray-800 text-gray-300 rounded shadow-md hover:scale-105 hover:cursor-pointer transition-all duration-500'>
                <IoIosAddCircle className="text-5xl"></IoIosAddCircle>
                <h2 className='text-2xl mt-4'>Add task </h2>
            </button> }
            
            
        </div>
    );
}

export default Cards;
