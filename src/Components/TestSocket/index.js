import React, { useEffect, useState } from 'react';
import firebase from '../../firebase';
import BackgroundLeaderboard from '../1_Assets/BackgroundLeaderboard.png'
import DPWorldLogo from '../1_Assets/DPWorldLogo.png';
import { useNavigate } from 'react-router-dom';


const TestSocket = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [count,setCount] = useState(0)
  const navigate = useNavigate();
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');


  useEffect(() => {
    const ws = new WebSocket('ws://192.168.0.153:8080');

    ws.onopen = () => {
      console.log('WebSocket connection opened');
    };

    ws.onmessage = (event) => {
      const data = event.data;
      console.log(`Received: ${data}`);
      setMessage(data); // Update the React state with the received data.
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    setSocket(ws);

    // return () => {
    //   // Clean up the WebSocket connection when the component unmounts.
    //   ws.close();
    // };
  }, []);



  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100vh", justifyContent: "center", alignItems: "center", textAlign: 'center', backgroundColor: '#1E1450', backgroundImage: `url(${BackgroundLeaderboard})`, backgroundPosition: 'bottom', backgroundRepeat: 'no-repeat'}}>
        
      
        </div>
    </>
  )
}

export default TestSocket;