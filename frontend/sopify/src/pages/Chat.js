import React from 'react'
import axios from 'axios'
import { ChatState } from '../context/ChatProvider'
import { Box } from '@chakra-ui/react'
import SideDrawer from '../components/miscellanous/SideDrawer'
import MyChats from '../components/miscellanous/MyChats'
import ChatBox from '../components/miscellanous/ChatBox'


const Chat = () => {
  const {user}=ChatState();

  // const fetchChats=async()=>{
  //   const {data}=await axios.get('api/chat')
  //   console.log(data);
  // }

  // React.useEffect(()=>{
  //   fetchChats();
  // },[])

  return (
<div style={{width:"100%"}}>
{user && <SideDrawer/>}

<Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
  {user && <MyChats/>}
  {user && <ChatBox/>}
</Box>

   </div>



  ) 
}

export default Chat