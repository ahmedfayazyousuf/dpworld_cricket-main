import { useNavigate } from 'react-router-dom';
import firebase from '../../firebase';
import '../1_Assets/main.css';
import DPWorldLogo from '../1_Assets/DPWorldLogo.png';
import axios from 'axios';
import { useState,useEffect } from 'react';

const Mobile = () =>{
    const navigate = useNavigate();
    const [sockett, setSockett] = useState(null);


    // Replace 'YOUR_CRICKET_ACCESS_TOKEN' with the actual access token for Cricket Activation.
    const cricketAccessToken = 'c221593d7d91818bf92dab26685332c1c03aa4d01b374153e11c5e59946f8d943d7dcaa4bf058aef92df234f2374fffc6c9332f5af29ec5725eb9faae0a3de4bCfATlanIRtvCQJSQtWBgcREVJapnTmhFm47EDyl2USYUKFASaCx7spuuhZvg9soX';

    // API endpoint
    const apiEndpoint = 'https://talli.app/api/kiosk/log_interaction';

    
    function HandleSubmit(v){
        sockett.send(v);
    }

    useEffect(() => {
        var socket = new WebSocket('wss://cricketserver.azurewebsites.net/'); // Adjust the URL to match your server's address.
        setSockett(socket)

        return () => {
            // Clear the interval when the component unmounts to prevent memory leaks
        
            socket.close()
      
           
          };
    },[])
    
    return( 
            
        <div style={{display:"flex", justifyContent:"center", alignItems:"center", height: '100vh'}}>

        <div style={{display: 'flex', flexDirection: 'column', width: '70%', gap:'5px', alignItems: 'center', justifyContent:'center'}}>

            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom: '5px', paddingTop:'45px'}}>
                <img style={{width: '100%'}} src={DPWorldLogo} alt="NBALogo"/>
            </div>


    

            {/* <div style={{ width: "100%", display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: '10px', marginBottom: '10px', paddingLeft: '10px'}}>
                <input type="checkbox" id="consent" required style={{height: '15px', border: '1px solid transparent', borderRadius: '10px'}} />
                <label for="consent" style={{ color: 'white', fontSize: '15px', marginLeft: '7px', marginBottom: '2px' }}>
                    I consent to the terms and conditions*
                </label>
            </div> */}

            <div style={{display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'center',marginTop:'22px'}}>
                {/* <NavLink to="/Player2Registration" style={{textDecoration: 'none'}}> */}
                    <button onClick={() =>{HandleSubmit('1')}} className='specialFont' id="buttontext" style={{background: 'white', height: '70px', padding: '10px', width: '250px', backgroundColor: 'white', borderRadius: '120px', fontSize: '30px', color: '#1E1450', border: '1px solid transparent'}}>1</button>
                {/* </NavLink> */}
            </div>


            
            <div style={{display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'center',marginTop:'22px'}}>
                {/* <NavLink to="/Player2Registration" style={{textDecoration: 'none'}}> */}
                    <button onClick={() =>{HandleSubmit('2')}} className='specialFont' id="buttontext" style={{background: 'white', height: '70px', padding: '10px', width: '250px', backgroundColor: 'white', borderRadius: '120px', fontSize: '30px', color: '#1E1450', border: '1px solid transparent'}}>2</button>
                {/* </NavLink> */}
            </div>


            
            <div style={{display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'center',marginTop:'22px'}}>
                {/* <NavLink to="/Player2Registration" style={{textDecoration: 'none'}}> */}
                    <button onClick={() =>{HandleSubmit('3')}} className='specialFont' id="buttontext" style={{background: 'white', height: '70px', padding: '10px', width: '250px', backgroundColor: 'white', borderRadius: '120px', fontSize: '30px', color: '#1E1450', border: '1px solid transparent'}}>3</button>
                {/* </NavLink> */}
            </div>


            
            <div style={{display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'center',marginTop:'22px'}}>
                {/* <NavLink to="/Player2Registration" style={{textDecoration: 'none'}}> */}
                    <button onClick={() =>{HandleSubmit('4')}} className='specialFont' id="buttontext" style={{background: 'white', height: '70px', padding: '10px', width: '250px', backgroundColor: 'white', borderRadius: '120px', fontSize: '30px', color: '#1E1450', border: '1px solid transparent'}}>4</button>
                {/* </NavLink> */}
            </div>

            <div style={{display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'center',marginTop:'22px'}}>
                {/* <NavLink to="/Player2Registration" style={{textDecoration: 'none'}}> */}
                    <button onClick={() =>{HandleSubmit('0')}} className='specialFont' id="buttontext" style={{background: 'white', height: '70px', padding: '10px', width: '250px', backgroundColor: 'white', borderRadius: '120px', fontSize: '30px', color: '#1E1450', border: '1px solid transparent'}}>0</button>
                {/* </NavLink> */}
            </div>

        </div>
        
    </div>
    )
}

export default Mobile;