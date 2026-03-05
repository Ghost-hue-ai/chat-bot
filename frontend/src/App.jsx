import './App.css'
import axios from "axios"
import {Send } from "lucide-react"
import { BotMessageSquare } from 'lucide-react'
import { PanelLeftClose } from 'lucide-react'
import { MessageSquarePlus } from 'lucide-react'
import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'
function App() {
  const [chats , setChats] = useState([])
  const[loading , setLoading] = useState(false)


  useEffect( ()=>{
    (async ()=>{
      try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/chat/get-chats`)
      console.log(response);
      
      setChats([...chats , ...response.data.data])
      
    } catch (error) {
      console.log(error);
      
    }
    })()
  },[])

  const createNewChat = async()=>{
    const response =await axios.post(`${import.meta.env.VITE_BACKEND_URI}/chat/create-new`,{
      title : "first chat"
    }) 
    console.log(response);
    
    setChats([...chats , {_id : response.data.data._id, title:response.data.data.title}])

  }
  return (
   <>
   <div className= " h-screen overflow-hidden grid grid-cols-4 bg-[#262626]">
    <div className='sideBar border-2 col-end-2 overflow-y-auto'>
      <div className='flex flex-col '>
        <div className='logos flex justify-between px-2.5'>
          <BotMessageSquare color='#ffffff' className='hover:bg-gray-700 p-0.5'/>
          <PanelLeftClose color='#9b9b9b ' className='hover:bg-gray-700 p-0.5'/>

        </div>
        <ul className='flex flex-col mt-6 justify-around px-2.5 gap-3'>
          <li onClick={async()=>await createNewChat()} className='text-gray-300 hover:bg-gray-700 p-2 rounded-3xl active:bg-gray-600'><MessageSquarePlus color='#ffffff'  className='float-left p-0.5 mr-2 '/> New Chat</li>
          <li className='text-gray-300  hover:bg-gray-700 p-2 rounded-3xl active:bg-gray-600'><Search  color='#ffffff' className='float-left p-0.5 mr-2'/>Search Chat</li>
        </ul>
        <div className='mt-3 px-2.5 opacity-30'>
          <span className='text-gray-300 text-sm mt-3 p-2'>Your chats </span>
        </div>
        <div className='chats'>
          <ul className='px-2.5'>
            {chats.map((chat)=>{
            return <li key={chat._id} className='text-gray-300  mt-1.5 mb-1.5 p-2 min-w-full hover:bg-gray-700 rounded-xl active:bg-gray-600'>{chat.title}</li>
          })}
          </ul>
        </div>
      </div>
    </div>
    <div className='responseArea  border-2 border-amber-500 col-start-2 col-end-5 relative'>
      <div className='absolute bottom-2.5 min-w-full flex justify-center '>
        <div className='flex w-3/4 border-gray-900 shadow-gray-700 rounded-4xl bg-[#333333] px-2'>
          <input type='text' placeholder="what's on you mind today ?" className='w-full p-3   text-gray-300 outline-none '/>
        <button><Send color='white' className='hover:bg-gray-600 p-1 rounded-3xl'/></button>
        </div>

      </div>
    </div>
   </div>
   </>
      
  )
}

export default App

