import React from 'react';
import Home from './pages/Home';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AllTasks from './pages/AllTasks';
import ImportantTasks from './pages/ImportantTasks';
import InCompleteTasks from './pages/InCompleteTasks';
import CompleteTasks from './pages/CompleteTasks';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { authActions } from './store/auth';

const App = () => {
  const navigate=useNavigate();
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
  const dispatch=useDispatch();
  useEffect(()=>{
    if(localStorage.getItem("id") && localStorage.getItem("token")){
      dispatch(authActions.login());
    }
    else if(isLoggedIn ===false){
      navigate("/Signup");
    }
  },[]);
  

  return (
    <div className='bg-gray-700 relative'>
     
        <Routes>
          <Route exact path="/" element={<Home />} >
             <Route index element={<AllTasks />} />
             <Route path="/ImportantTasks" element={<ImportantTasks />} />
             <Route path="/InCompleteTasks" element={<InCompleteTasks />} />
             <Route path="/CompleteTasks" element={<CompleteTasks />} />
          </Route> 
          <Route path="/Signup" element={<Signup />} ></Route>
          <Route path="/Login" element={<Login></Login>} ></Route>
        </Routes>
      
    </div>
  );
}

export default App;

