  import React, { useEffect, useState } from 'react';
  import firebase from '../../firebase';
  import BackgroundLeaderboard from '../1_Assets/BackgroundLeaderboard.png'
  import DPWorldLogo from '../1_Assets/DPWorldLogo.png';
  import { useNavigate } from 'react-router-dom';

  import io from 'socket.io-client';

  const TestSocket2 = () => {
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [count,setCount] = useState(0)
    const navigate = useNavigate();
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState('');


    // useEffect(() => {
    //   const socket = io('https://dpworldcricketserver.azurewebsites.net/', {
    //     transports: ["websocket"],
    //   }); // Use the correct server URL
    //   socket.connect()

    //   socket.on('connect', () => {
    //     console.log('Socket.IO connection established');
    //   });
    
    //   socket.on('message', (receivedMessage) => {
    //     console.log('Received message: ', receivedMessage);
    //   });

    //   setSocket(socket)

    //   return () => {
    //     if (socket.readyState === 1) { // <-- This is important
    //         socket.close();
            
    //     }
    // }
    
    
    // }, []);

    useEffect(()=>{
      // Connect to the WebSocket server
    var socket = new WebSocket('ws://localhost:5000'); // Adjust the URL to match your server's address.

    socket.onopen = () => {
      console.log('Connected to the WebSocket server');
    };

    socket.onmessage = (event) => {
      const message = event.data;
      console.log('Received message from server:', message);


    };

    socket.onclose = () => {
      console.log('Disconnected from the WebSocket server');
    };

    setSocket(socket)
  
    },[])




      // Function to send a test message to the WebSocket server
      const sendTestMessage = () => {
        if (socket) {
          // Check if the WebSocket connection is open before sending a message
          console.log('sending2')

          const testMessage = 'This is a test message from React';
          socket.send(testMessage);
        }
      };


    return (
      <>
        <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100vh", justifyContent: "center", alignItems: "center", textAlign: 'center', backgroundColor: '#1E1450', backgroundImage: `url(${BackgroundLeaderboard})`, backgroundPosition: 'bottom', backgroundRepeat: 'no-repeat'}}>
          
        <button onClick={()=>{sendTestMessage()}}>Send Test Message</button>
          <p>Received Message: {message}</p>
          </div>
      </>
    )
  }

  export default TestSocket2;