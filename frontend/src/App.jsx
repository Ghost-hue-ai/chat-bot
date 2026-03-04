import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Send } from "lucide-react"
import { BotMessageSquare } from 'lucide-react'
import { PanelLeftClose } from 'lucide-react'
import { MessageSquarePlus } from 'lucide-react'
import { Search } from 'lucide-react'
function App() {
  return (
   <>
   <div className= "min-w-screen min-h-screen grid grid-cols-4 bg-[#262626]">
    <div className='sideBar border-2 col-end-2'>
      <div className='flex flex-col '>
        <div className='logos flex justify-between px-2.5'>
          <BotMessageSquare color='#ffffff' className='hover:bg-gray-700 p-0.5'/>
          <PanelLeftClose color='#9b9b9b ' className='hover:bg-gray-700 p-0.5'/>

        </div>
        <ul className='flex flex-col mt-6 justify-around px-2.5 gap-3'>
          <li className='text-gray-300 hover:bg-gray-700 p-2 rounded-3xl'><MessageSquarePlus color='#ffffff'  className='float-left p-0.5 mr-2 '/> New Chat</li>
          <li className='text-gray-300  hover:bg-gray-700 p-2 rounded-3xl'><Search  color='#ffffff' className='float-left p-0.5 mr-2'/>Search Chat</li>
        </ul>
        <div className='mt-3 px-2.5 opacity-30'>
          <span className='text-gray-300 text-sm mt-3 p-2'>Your chats </span>
        </div>
      </div>
    </div>
    <div className='responseArea border-2 border-amber-500 col-start-2 col-end-5 relative'>
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

