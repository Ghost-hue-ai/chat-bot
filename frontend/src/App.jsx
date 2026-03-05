import './App.css'
import axios from "axios"
import {Send } from "lucide-react"
import { BotMessageSquare } from 'lucide-react'
import { PanelLeftClose } from 'lucide-react'
import { MessageSquarePlus } from 'lucide-react'
import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { CircleCheckBig } from 'lucide-react'
import { X } from 'lucide-react'
import { SquareChevronRight } from 'lucide-react'

function App() {
  const [chats , setChats] = useState([])
  const[loading , setLoading] = useState(false)
  const [titleWindow , setTitleWindow] = useState(false)
  const [title,setTitle] = useState("")
  const [currChat,setCurrChat] = useState("")
  const [newChat,setNewChat] = useState(false)
  const [sideBarCollapse, setSideBarCollapse] = useState(false)

  const showTitle = ()=>{
    setTitleWindow(true) 
  }

  useEffect( ()=>{
    (async ()=>{
      try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/chat/get-chats`)
      console.log(response);
      
      setChats(response.data.data)
      
    } catch (error) {
      console.log(error);
      
    }
    })()
  },[])

  const createNewChat = async(title)=>{
   
    const chatTitle = title || "Anonomous Chat"
    const response =await axios.post(`${import.meta.env.VITE_BACKEND_URI}/chat/create-new`,{
      title : chatTitle

    }) 
    console.log(response);
    
    setChats((prev)=>[...prev , {_id : response.data.data._id, title:response.data.data.title}])

  }
  return (
   <>
   <div className= {` h-screen overflow-hidden grid transition-all duration-300  bg-[#262626] ${sideBarCollapse? "grid-cols-[64px_1fr]": "grid-cols-[250px_1fr]"}`}>
    {titleWindow && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
    <div className="w-2/6 bg-gray-700 p-6 rounded-xl flex flex-col  shadow-xl">
      <input
        type="text"
        placeholder="enter a title for this chat"
        className="w-full  p-3 bg-gray-700 text-gray-300 outline-none rounded"
        autoFocus
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
      />
      <div className='flex min-w-full justify-between mt-5'>
        
        <X color='white' size={38} className='p-2 bg-red-600 hover:bg-red-500 active:bg-red-400 rounded-md' onClick={()=>{setTitleWindow(false)}}/>
        <CircleCheckBig className='self-end p-2 hover:bg-green-500 active:bg-green-400 rounded-md bg-green-600 ' color='#fff' size={38}
        onClick={()=>{
          createNewChat(title)
          setTitleWindow(false)
        }}
        />
      </div>
      
    </div>
  </div>
)}
    <div className={`sideBar select-none  overflow-y-auto bg-[#1e1e1e] $$`}>
      {sideBarCollapse? (<div className=''>
          <ul className='flex flex-col  mt-6 justify-around px-2.5 gap-3'>
          <li onClick={()=> showTitle()} className='text-gray-300 hover:bg-gray-700 p-2 rounded-3xl active:bg-gray-600'><BotMessageSquare color='#ffffff' className='float-left p-0.5 mr-2'/></li>
          <li onClick={()=> setSideBarCollapse(false)}  className='text-gray-300  hover:bg-gray-700 p-2 rounded-3xl active:bg-gray-600'> 
            <SquareChevronRight   color='#9b9b9b ' className='float-left p-0.5 mr-2'/>
          </li>
          <li onClick={()=> showTitle()} className='text-gray-300 hover:bg-gray-700 p-2 rounded-3xl active:bg-gray-600'><MessageSquarePlus color='#ffffff'  className='float-left p-0.5 mr-2 '/></li>
          <li  className='text-gray-300  hover:bg-gray-700 p-2 rounded-3xl active:bg-gray-600'><Search  color='#ffffff' className='float-left p-0.5 mr-2'/> </li>
        </ul>
      </div>)
       : (<div className='flex flex-col '>
        <div className='logos flex justify-between px-2.5'>
          <BotMessageSquare color='#ffffff' className='hover:bg-gray-700 p-0.5'/>
          <PanelLeftClose onClick={()=> setSideBarCollapse(true)} color='#9b9b9b ' className='hover:bg-gray-700 p-0.5'/>

        </div>
        <ul className='flex flex-col mt-6 justify-around px-2.5 gap-3'>
          <li onClick={()=> showTitle()} className='text-gray-300 hover:bg-gray-700 p-2 rounded-3xl active:bg-gray-600'><MessageSquarePlus color='#ffffff'  className='float-left p-0.5 mr-2 '/> New Chat</li>
          <li  className='text-gray-300  hover:bg-gray-700 p-2 rounded-3xl active:bg-gray-600'><Search  color='#ffffff' className='float-left p-0.5 mr-2'/>Search Chat</li>
        </ul>
        <div className='mt-3 px-2.5 opacity-30'>
          <span className='text-gray-300 text-sm mt-3 p-2'>Your chats </span>
        </div>
        <div className='chats'>
          <ul className='px-2.5'>
            {chats.map((chat)=>{
            return <li onClick={()=>{
              setCurrChat(chat._id)
              setNewChat(true)
            }} key={chat._id} className={`text-gray-300  mt-1.5 mb-1.5 p-2 min-w-full hover:bg-gray-700 rounded-md active:bg-gray-600 ${(chat._id === currChat)? "bg-[#363434ea] ":""}`}>{chat.title}</li>
          })}
          </ul>
        </div>
      </div>)}
    </div>
    <div className={`responseArea  relative`}>
      {newChat && (
          <span className='text-2xl  text-gray-300 absolute left-1/2 top-1/2 '>Ready to dive in?</span>
        )}
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

