import io from 'socket.io-client';
import {useEffect,useState} from 'react'
import axios from 'axios';
const socket = io('http://localhost:8000'); //Connecting to the server
const AdminChat = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [id, setId] = useState('');
    const [file, setFile] = useState(null)
    const [connectedUsers, setConnectedUsers] = useState([]);``
    // const [inputMessage, setInputMessage] = useState('');
    
    useEffect(()=>{
        socket.on('yourId', (id) => {
            setId(id);
        })
        socket.on('connectedUsers', (users) => {
            setConnectedUsers(users);
        })
        socket.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        })
        return () => {
            socket.off('message'); //clean up the socket connection on unmount
            socket.off('yourId');
        }
    },[])
    const sendMessage = () =>{
        if(message.trim()){
            socket.emit('message', message);
            setMessage('');
        }
    }
    const handleFile = (event) =>{
        setFile(event.target.files && event.target.files[0])
    }
    const sendFile = async() =>{
        if(!file){
            console.log("No file selected")
            return;
        }
        const formData = new FormData();
        formData.append('file',file);
        socket.emit('message', `[file] ${fileUrl}`);
        try{
            const res = await axios.post('http://localhost:8000/upload',formData,{
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log(res.data);
            const fileUrl = res.data.fileUrl;
        }
        catch(error){
            console.log('Error uploading',error);
        }
    }
  return (
    <div className="min-h-screen w-full bg-gray-800 text-gray-300 flex flex-col items-center">
  <div className="w-full max-w-3xl relative top-10">
    {/* Header */}
    <header className="py-4 bg-gray-900 shadow-lg text-center text-3xl font-bold text-indigo-500">
      ChatApp
    </header>
    {/* Chat Box */}
    <div className="border border-gray-700 rounded-lg bg-gray-900 p-4 my-4 h-[70vh] overflow-y-scroll flex flex-col space-y-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${message.senderId === id ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`max-w-[70%] p-3 rounded-lg ${
              message.senderId === id ? "bg-indigo-600 text-white" : "bg-gray-700 text-gray-200"
            }`}
          >
            <span className="font-semibold text-sm block mb-1">
              {message.senderId === id ? "You" : `User ${message.senderId}`}
            </span>
            {message.text.includes("[file]") ? (
              <a
                href={message.text.split(" ")[1]}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline"
              >
                Download File
              </a>
            ) : (
              <p>{message.text}</p>
            )}
          </div>
        </div>
      ))}
    </div>
    {/* Message Input and Buttons */}
    <div className="relative flex items-center w-full max-w-3xl">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="flex-grow bg-gray-700 text-gray-300 p-3 rounded-l-lg focus:outline-none focus:ring focus:ring-indigo-500"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            sendMessage();
          }
        }}
      />
      {/* Send Text Message Button */}
      <button
        onClick={sendMessage}
        className="bg-indigo-600 p-3 rounded-r-lg hover:bg-indigo-700 focus:outline-none"
      >
        Send
      </button>
    </div>
    {/* File Input and Send File Button */}
    <div className="flex items-center mt-4 space-x-2 w-full max-w-3xl">
      <input
        type="file"
        onChange={handleFile}
        className="text-gray-300 w-full max-w-xs px-3 py-2 bg-gray-700 rounded-lg file:bg-indigo-600 file:text-white file:border-none file:rounded-lg file:cursor-pointer"
      />
      <button
        onClick={sendFile}
        className="bg-indigo-600 p-2 rounded-lg hover:bg-indigo-700 focus:outline-none"
      >
        Send File
      </button>
    </div>
    <div className='absolute top-0 left-2'>
        <h1 className='text-lg font-bold '>Connected Users</h1>
        <ul>
            {connectedUsers.slice(1,2).map((user,index)=>(
            <li key={index} className='text-xs' >
                {user}
                {user === id ?
                <span className='text-green-500'> (You)</span>
            :<span className='text-red-500' > (Other)</span>}
            </li>
            ))}
        </ul>
    </div>
  </div>
</div>
  )
}
export default AdminChat