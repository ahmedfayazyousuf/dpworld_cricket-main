import React, { useEffect, useState } from 'react';
import DPWorldLogo from '../1_Assets/DPWorldLogo.png';
import firebase from '../../firebase';
import { useNavigate } from 'react-router-dom';

const Success = () => {
  const navigate = useNavigate();



  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100vh", justifyContent: "center", alignItems: "center", flexWrap: 'wrap', textAlign: 'center' }}>
        <img style={{ minWidth: '100px', maxWidth: '300px' }} src={DPWorldLogo} alt="tick" />
        <h1 style={{ paddingRight: '50px', paddingLeft: '50px', color: 'white', fontSize: '20px',marginTop:'75px' }}>Your response has been recorded</h1>
        <h1 style={{ paddingRight: '50px', paddingLeft: '50px', color: 'white', marginTop: '5px' }}>LET'S PLAY!</h1>


         <div style={{display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'center', marginTop: '60px'}}>
                <button onClick={()=>{navigate('/registration')}} id="buttontext" style={{background: 'white', height: '70px', padding: '10px', width: '250px', backgroundColor: 'white', borderRadius: '120px', fontSize: '25px', color: '#1E1450', border: '1px solid transparent'}}>NEXT PLAYER</button>
            </div>
    </div>
  )
}

export default Success;