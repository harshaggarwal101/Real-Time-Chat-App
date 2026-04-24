import React from 'react'
import { useSelector } from 'react-redux'
import Sidebar from '../components/home/Sidebar';
import MessagesContainer from '../components/home/MessagesContainer';

const Homepage = () => {
    const token=useSelector((state)=>state.auth.token);
    const {userData}=useSelector((state)=>state.user);

  return (
    <div className='w-[90vw] h-[90vh] flex'>
        <div className='h-full w-[20%] bg-gray-600 rounded-l-lg'>
            <Sidebar/>
        </div>
        <div className='h-full w-[80%] bg-gray-400 rounded-r-lg'>
            <MessagesContainer/>
        </div>
    </div>
  )
}

export default Homepage
