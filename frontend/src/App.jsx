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
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import remarkGfm from 'remark-gfm';

function App() {
  const [chats , setChats] = useState([])
  const[loading , setLoading] = useState(false)
  const [titleWindow , setTitleWindow] = useState(false)
  const [title,setTitle] = useState("")
  const [currChat,setCurrChat] = useState("")
  const [newChat,setNewChat] = useState(false)
  const [sideBarCollapse, setSideBarCollapse] = useState(false)
  const[messages , setMessages] = useState([])
  const [userReq , setUserReq] = useState("")
  const[prevMessages, setPrevMessages] = useState([])
  const [responseLoading,setResponseLoading] = useState(false)
  const markDownComponent = {
        code({ inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          if (!inline && match) {
            return (
              <SyntaxHighlighter
                style={oneDark}
                language={match[1]}
                showLineNumbers
                wrapLongLines
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            );
          }
          return (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      } 

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

  useEffect(()=>{
    (async()=>{
      if (!currChat){
        return
      }
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/chat/get-chatMessage/`,{
          params:{
            chatId : currChat
          }
        })
        console.log(res);
        setPrevMessages(res.data.data)
        if (res.data.data.length !=0){
          setNewChat(false)
        }else{
          setNewChat(true)
        }
        
      } catch (error) {
        console.log(error);
        
      }
    })()
  },[currChat])
  const submitRequest = async (req)=>{
    const content = req || undefined
    if (!content){
      console.log("no content to send");
      return
    }
    if(!currChat){
      console.log("please select or create a char");
      return
      
    }
    setMessages((prev)=> [...prev,{content , from : "user"}])
    setNewChat(false)
   try {
    setResponseLoading(true)
     const res = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/chat/send-request`,{
      userReq: content,
      chatId : currChat
     })
     setResponseLoading(false)
     setMessages((prev)=>[...prev,{content : res.data.data , from:"ai"}])
    console.log(res);
   } catch (error) {
    console.log(error);
    
   }
    
  }
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
    <div className={`sideBar select-none  overflow-y-auto bg-[#1e1e1e] `}>
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
              setMessages([])
              if (prevMessages.length === 0){
                setNewChat(true)
              }
            }} key={chat._id} className={`text-gray-300  mt-1.5 mb-1.5 p-2 min-w-full hover:bg-gray-700 rounded-md active:bg-gray-600 ${(chat._id === currChat)? "bg-[#363434ea] ":""}`}>{chat.title}</li>
          })}
          </ul>
        </div>
      </div>)}
    </div>
    <div className={`responseArea  relative overflow-y-hidden`}>
      {newChat && (
          <span className='text-2xl  text-gray-300 absolute left-1/2 top-1/2 '>Ready to dive in?</span>
        )}

        <div className='messageArea  overflow-y-auto max-h-11/12 w-full'>
          {prevMessages && (
            <div>
              {prevMessages.map((message,i)=>{
              return (
                <div key={i} className='flex flex-col w-full'>
                  <span className={`inline-block text-gray-300 px-10 py-2 w-fit self-end bg-[#333333] p-1.5 rounded-2xl my-2`}>{message.userRequest}</span>
                  <span className={`inline-block text-gray-300 px-10 py-2`}>
                    <ReactMarkdown components={markDownComponent}  remarkPlugins={[remarkGfm]}>{message.aiResponse}</ReactMarkdown></span>
                </div>
              )
            })}
            </div>
          )}
          {messages && (
            <ul className='flex flex-col justify-around  pb-24 '>
              {messages && messages.map((message,i)=>{
              return(
                <li key={i} className={`text-gray-300 px-10 py-2 ${message.from === "user" ? "inline-block w-fit self-end bg-[#333333] p-1.5 rounded-2xl my-2":""}`}><ReactMarkdown components={markDownComponent}  remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown></li>

              )
            })}
            {responseLoading && (
              <span className='text-gray-300 px-10 py-2 '> Loading... </span>
            )}
            </ul>
            
          )}
          
        </div>
      <div className='absolute bottom-2.5 min-w-full flex justify-center '>
        
        <form onSubmit={(e)=>{
          e.preventDefault()
          setUserReq("")
          submitRequest(userReq)
        }} className='flex w-3/4 border-gray-900 shadow-gray-700 rounded-4xl bg-[#333333] px-2'>
          <input value={userReq} onChange={(e)=>{
            setUserReq(e.currentTarget.value)

          }} type='text' placeholder="what's on you mind today ?" className='w-full p-3   text-gray-300 outline-none '/>
        <button type='submit'><Send color='white' className='hover:bg-gray-600 p-1 rounded-3xl'/></button>
        </form>

      </div>
    </div>
   </div>
   </>
      
  )
}

export default App

