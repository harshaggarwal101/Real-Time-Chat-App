import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Sidebar from '../components/home/Sidebar';
import MessagesContainer from '../components/home/MessagesContainer';

const Homepage = () => {
    const token=useSelector((state)=>state.auth.token);
    const {userData}=useSelector((state)=>state.user);
    const [chatUserId, setChatUserId] = useState(null);
  return (
    <div className='w-[90vw] h-[90vh] flex'>
        <div className='h-full w-[25%] bg-gray-600 rounded-l-lg'>
            <Sidebar setChatUserId={setChatUserId} chatUserId={chatUserId}/>
        </div>
        <div className='h-full w-[75%] bg-gray-400 rounded-r-lg'>
            <MessagesContainer chatUserId={chatUserId}/>
        </div>
    </div>
  )
}

export default Homepage
