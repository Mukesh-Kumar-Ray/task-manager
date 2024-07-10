import React, { useState ,useEffect} from 'react'
import Cards from '../components/Home/Cards';
import { IoIosAddCircle } from "react-icons/io";
import InputData from '../components/Home/InputData';
import axios from 'axios';

const AllTasks = () => {
  const [Inputdiv,setInputdiv]=useState("hidden");
  const [Data,setData] = useState();
  const [UpdateData,setUpdateData]=useState({
    id:"",
    title:"",
    desc:""
  })
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
  });
  return (
    <>
    <div>
      <div className=' w-full flex justify-end p-4  '>
        <button onClick={()=>setInputdiv("fixed")}><IoIosAddCircle className='text-4xl text-gray-400 hover:text-gray-100'/></button>
      </div>
     
      <div>{Data && <Cards home={"true"} Inputdiv={Inputdiv} setInputdiv={setInputdiv} data={Data.tasks} setUpdateData={setUpdateData}/>}</div>
      
    </div>
    <InputData Inputdiv={Inputdiv} setInputdiv={setInputdiv} UpdateData={UpdateData} setUpdateData={setUpdateData}></InputData>
    
    </>
    
    
  )
}

export default AllTasks