import io from 'socket.io-client';
import {useEffect,useState,useRef} from 'react'
import axios from 'axios';

const socket = io('http://localhost:8000'); //Connecting to the server

const AdminChat = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [id, setId] = useState('');
    const [file, setFile] = useState(null)
    const [connectedUsers, setConnectedUsers] = useState([]);
    // const [inputMessage, setInputMessage] = useState('');
    const messageCache = useRef([]);
    

    useEffect(()=>{

        socket.on('yourId', (id) => {
            setId(id);
        })

        socket.on('connectedUsers', (users) => {
            setConnectedUsers(users);
        })

        socket.on('message', (newMessage) => updateMessages(newMessage));

        socket.on('receive_message', (data) => {
          const { message } = data;
          updateMessages(message);
          
          socket.emit('register-admin', "connected");
      });

        fetchChats();

        return () => {
            // socket.off('message'); //clean up the socket connection on unmount
            // socket.off('yourId');
            socket.disconnect();
        }
    },[])

    socket.on('upload_success', (data) => {
      updateMessages({ senderId: 'System', text: data.message });
      setFile(null);
  });

  socket.on('error', (data) => console.error('Upload error:', data.error));

    const updateMessages = (newMessage) => {
        setMessages((prev) => [...prev, newMessage]);
        messageCache.current.push(newMessage);
    };



    const fetchChats = async () => {
      try {
          const response = await axios.get("/allChatsAdmin");
          const fetchedMessages = response.data?.messages || []; // Default to an empty array if undefined
          const newMessages = fetchedMessages.slice(messageCache.current.length);
          newMessages.forEach(updateMessages);
      } catch (error) {
          console.error("Error fetching chats:", error);
      }
  };

    const sendMessage = () =>{
        if(message.trim()){
          socket.emit('private_message', { message });
            setMessage('');
            updateMessages({ senderId: 'You', text: message });
        }
    }


    const handleFile = (event) =>{
        setFile(event.target.files && event.target.files[0])
    }

    const sendFile = () => {
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (event) => {
          const fileBuffer = event.target.result;
          socket.emit('upload', {
              fileBuffer,
              originalname: file.name,
              mimetype: file.type,
          });
      };
      reader.onerror = (error) => console.error("File reading error:", error);
      reader.readAsArrayBuffer(file);
  };


  return (
    <div className="min-h-screen w-full bg-gray-800 text-gray-300 flex flex-col items-center">
            <div className="w-full max-w-3xl relative top-10">
                <header className="py-4 bg-gray-900 shadow-lg text-center text-3xl font-bold text-indigo-500">ChatApp</header>
                
                <div className="border border-gray-700 rounded-lg bg-gray-900 p-4 my-4 h-[70vh] overflow-y-scroll flex flex-col space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.senderId === 'You' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[70%] p-3 rounded-lg ${msg.senderId === 'You' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-200'}`}>
                                <span className="font-semibold text-sm block mb-1">{msg.senderId}</span>
                                {msg.text.includes("[file]") ? (
                                    <a href={msg.text.split(" ")[1]} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">Download File</a>
                                ) : (
                                    <p>{msg.text}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex items-center w-full max-w-3xl">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-grow bg-gray-700 text-gray-300 p-3 rounded-l-lg"
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    />
                    <button onClick={sendMessage} className="bg-indigo-600 p-3 rounded-r-lg">Send</button>
                </div>

                <div className="flex items-center mt-4 space-x-2 w-full max-w-3xl">
                    <input
                        type="file"
                        onChange={handleFile}
                        className="text-gray-300 w-full max-w-xs px-3 py-2 bg-gray-700 rounded-lg"
                    />
                    <button onClick={sendFile} className="bg-indigo-600 p-2 rounded-lg">Send File</button>
                </div>

                <div className="absolute top-0 left-2">
                    <h1 className="text-lg font-bold">Connected Users</h1>
                    <ul>
                        {connectedUsers.map((user, index) => (
                            <li key={index} className="text-xs">{user}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>

  )
}

export default AdminChat;