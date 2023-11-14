import React, { useEffect, useState, useRef } from 'react';
import firebase from '../../firebase';
import BackgroundLeaderboard from '../1_Assets/BackgroundLeaderboard.png'
import DPWorldLogo from '../1_Assets/DPWorldLogo.png';
import ball from '../1_Assets/ball.png'
import ballno from '../1_Assets/ballno.png'
import { useNavigate } from 'react-router-dom';


const Game= () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [Name,setName] = useState('')
  const [idd,setIdd] = useState('')
  const [intervalId, setIntervalId] = useState(null);
  const [intervalId2, setIntervalId2] = useState(null);
  const [sockett, setSockett] = useState(null);
  const intervalIdRef = useRef(null);
  const navigate = useNavigate();



  // Set up a listener to fetch and update the leaderboard in real-time
   useEffect(() => {
    var socket = new WebSocket('wss://cricketserver.azurewebsites.net/'); // Adjust the URL to match your server's address.
    const Users = firebase.firestore().collection("CricketUsers");
    var counter = 0;
    var balln = 0
    var iddoc = ''
    var scoring = 0
    var ballused = 0
    // Query Firestore to fetch the top 10 users based on "Score" in ascending order
    const query = Users.orderBy("RegistrationTime","desc").limit(1).get().then((docs)=>{
     docs.forEach(doc =>{
        setName(doc.data().Name);
        setIdd(doc.id);
        iddoc = doc.id
      })
    });

    // Start the interval to increment the counter every 3 seconds
    const id = setInterval(() => {
      // Increment the counter

      if(counter === 0){

        document.getElementById('screen0').style.display = 'none'
        document.getElementById('screen1').style.display = 'flex'
        document.getElementById('screen2').style.display = 'none'
        document.getElementById('screen3').style.display = 'none'


      }

      if(counter === 1){
        document.getElementById('screen0').style.display = 'none'
        document.getElementById('screen1').style.display = 'none'
        document.getElementById('screen2').style.display = 'flex'
        document.getElementById('screen3').style.display = 'none'

      }

      if(counter === 2){
        document.getElementById('screen0').style.display = 'none'
        document.getElementById('screen1').style.display = 'none'
        document.getElementById('screen2').style.display = 'none'
        document.getElementById('screen3').style.display = 'flex'

       

      }

      console.log(counter)
      counter += 1
      
      // Check if the counter has reached 3
      if (counter === 3) {

              // Connect to the WebSocket server

        socket.onopen = () => {
          console.log('Connected to the WebSocket server');
        };

        

        socket.onmessage = (event) => {
          const message = event.data;
          console.log('Received message from server:', message);
          

          
          if(message == '1' || message == '2' || message == '3' || message == '4' || message == '6' || message == '1 ' || message == '2 ' || message == '3 ' || message == '4 ' || message == '6 ' || message == '1\n' || message == '2\n' || message == '3\n\n' || message == '4\n\n' || message == '6\n\n' ||  message == '1\n\n' || message == '2\n\n' || message == '3\n\n' || message == '4\n\n' || message == '6\n\n' ||  message == '1  ' || message == '2  ' || message == '3  ' || message == '4  ' || message == '6  ' ){
            if(balln === 6){
              return
            }
            if(zero){
              document.getElementById(`scoreball`).style.backgroundImage = `url(${ball})`
            }
            scoring = scoring + parseInt(message)

            document.getElementById(`scoreball`).style.visibility = `hidden`

            document.getElementById(`scoreball`).style.transform = `scale(0)`
            setTimeout(()=>{
              document.getElementById(`scoreball`).style.visibility = `visible`
              document.getElementById(`scoreball`).style.transform = `scale(1)`
              document.getElementById(`ball${balln}`).style.backgroundImage = `url(${ball})`
              document.getElementById(`h${balln}`).innerHTML = message 
              document.getElementById(`scoreh`).innerHTML = message
              balln = balln + 1;
              ballused = ballused + 1;
              if(balln === 6){

                document.getElementById(`uscore`).innerHTML = `YOUR SCORE: ${scoring}`

                 setTimeout(()=>{
                  document.getElementById('screen0').style.display = 'none'
                  document.getElementById('screen1').style.display = 'none'
                  document.getElementById('screen2').style.display = 'none'
                  document.getElementById('screen3').style.display = 'none'
                  document.getElementById('screen4').style.display = 'flex'

                  setTimeout(()=>{
                    console.log(idd)
                    firebase.firestore().collection('CricketUsers').doc(iddoc).update({Score:scoring,BallUsed:ballused,LastBallPlayedTime:firebase.firestore.FieldValue.serverTimestamp()}).then(()=>{
                      socket.close()
                      navigate('/Leaderboard2');
                    });
                   },5000)

                 },5000)

              }
            },1000)





  
  
  
          }
          else {
            if(balln === 6){
              return
            }
            scoring = scoring 
            zero = true
            // document.getElementById(`scoreball`).style.backgroundImage = `url(${ballno})`
            document.getElementById(`scoreball`).style.visibility = `hidden`
            document.getElementById(`scoreball`).style.transform = `scale(0)`


             setTimeout(()=>{
              document.getElementById(`scoreball`).style.visibility = `visible`
              document.getElementById(`scoreball`).style.transform = `scale(1)`
              document.getElementById(`scoreh`).innerHTML = message
              balln = balln + 1;
              if(balln === 6){
                document.getElementById(`uscore`).innerHTML = `YOUR SCORE: ${scoring}`

                 setTimeout(()=>{
                  document.getElementById('screen0').style.display = 'none'
                  document.getElementById('screen1').style.display = 'none'
                  document.getElementById('screen2').style.display = 'none'
                  document.getElementById('screen3').style.display = 'none'
                  document.getElementById('screen4').style.display = 'flex'

                  setTimeout(()=>{
                    console.log(idd)
                    firebase.firestore().collection('CricketUsers').doc(iddoc).update({Score:scoring,BallUsed:ballused,LastBallPlayedTime:firebase.firestore.FieldValue.serverTimestamp()}).then(()=>{
                      socket.close()
                      navigate('/Leaderboard2');
                      
                    });
                   },5000)

                 },5000)

              }
            },1000)


  
  
          }


        };

        socket.onclose = () => {
          console.log('Disconnected from the WebSocket server');
        };

        setSockett(socket)
        // If counter is 2, stop the interval
        // const id2 = setInterval(() => {

        //   const no = Math.floor(Math.random() * 5); // 5 represents the range [0, 4]
        //   console.log('number',no)


        //   if(balln === 6){
        //     clearInterval(id2);
        //   }
        // },5000)
        // setIntervalId2(id2)
        clearInterval(id);
      }
    }, 5000); // 3000 milliseconds = 3 seconds
    intervalIdRef.current = id;


    var zero = false

    
    setIntervalId(id);
    const handleKeyPress = (event) => {
      if (event.key === 'r' || event.key === 'R') {
        // Navigate to a specific route when 'r' key is pressed
        clearInterval(intervalIdRef.current);
        socket.close()
        navigate('/leaderboard2', { replace: true });
      }
    };

    // Attach the event listener when the component mounts
    window.addEventListener('keydown', handleKeyPress);

    // Remove the event listener when the component unmounts to avoid memory leaks
  

    return () => {
      // Clear the interval when the component unmounts to prevent memory leaks
      if (intervalId) {
        clearInterval(id);
        clearInterval(intervalIdRef.current);
      }
      window.removeEventListener('keydown', handleKeyPress);
      socket.close()

      // socket.close();
      // if (intervalId2) {
      //   clearInterval(intervalId2);
      // }
    };

 
    
  }, []);

  return (
    <>
      <div id='screen0' style={{ display: "flex", flexDirection: "column", width: "100%", height: "100vh",justifyContent: "flex-start", alignItems: "center", textAlign: 'center', backgroundColor: '#1E1450', backgroundImage: `url(${BackgroundLeaderboard})`, backgroundPosition: 'bottom', backgroundRepeat: 'no-repeat'}}>
        
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',marginBottom: '100px',marginTop:'250px', paddingTop:'45px'}}>
            <img style={{width: '60%'}} src={DPWorldLogo} alt="NBALogo"/>
        </div>

        <div style={{width:'100%', display: "flex", justifyContent: "center", alignItems: "center",flexDirection:'column',marginBottom:'100px'}}>
            <h1 style={{color: 'white', fontSize: '65px', marginTop: '30px',marginBottom:'0'}}>WELCOME</h1>
            <h1 style={{color: 'white', fontSize: '65px',marginTop:'0px',marginBottom:'0'}}>{Name}</h1>

        </div>

        <div style={{height:'3px',width:'900px',background:'white',marginBottom:'100px'}}>

        </div>


        <div style={{width:'100%', display: "flex", justifyContent: "center", alignItems: "center",flexDirection:'column'}}>
            <h1 style={{color: 'white', fontSize: '65px', marginTop: '30px',marginBottom:'0',width:'900px',marginTop:'0'}}>SACHIN SCORED 18
            RUN IN THE 6TH OVER
            AGAINST ENGLAND IN
            2007 AT LEEDS</h1>

        </div>



      </div>

      <div id='screen1' style={{ display: "none", flexDirection: "column", width: "100%", height: "100vh", justifyContent: "flex-start", alignItems: "center", textAlign: 'center', backgroundColor: '#1E1450', backgroundImage: `url(${BackgroundLeaderboard})`, backgroundPosition: 'bottom', backgroundRepeat: 'no-repeat'}}>
        
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom: '300px',marginTop:'250px', paddingTop:'45px'}}>
            <img style={{width: '60%'}} src={DPWorldLogo} alt="NBALogo"/>
        </div>

        <div style={{width:'100%', display: "flex", justifyContent: "center", alignItems: "center",flexDirection:'column'}}>
            <h1 style={{color: 'white', fontSize: '65px', marginTop: '30px',marginBottom:'0',width:'650px',marginTop:'0'}}>SHOW YOUR
            CRICKETING
            SKILLS AND
            BEAT SACHIN’S
            SCORE</h1>

        </div>
      </div>

      <div id='screen2' style={{ display: "none", flexDirection: "column", width: "100%", height: "100vh", justifyContent: "flex-start", alignItems: "center", textAlign: 'center', backgroundColor: '#1E1450', backgroundImage: `url(${BackgroundLeaderboard})`, backgroundPosition: 'bottom', backgroundRepeat: 'no-repeat'}}>
        
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom: '300px',marginTop:'250px', paddingTop:'45px'}}>
            <img style={{width: '60%'}} src={DPWorldLogo} alt="NBALogo"/>
        </div>

        <div style={{width:'100%', display: "flex", justifyContent: "center", alignItems: "center",flexDirection:'column'}}>
            <h1 style={{color: 'white', fontSize: '95px', marginTop: '30px',marginBottom:'0',width:'650px',marginTop:'0'}}>LET'S BEGIN!</h1>

        </div>
      </div>

      <div id='screen3' style={{ display: "none", flexDirection: "column", width: "100%", height: "100vh", justifyContent: "center", alignItems: "center", textAlign: 'center', backgroundColor: '#1E1450', backgroundImage: `url(${BackgroundLeaderboard})`, backgroundPosition: 'bottom', backgroundRepeat: 'no-repeat'}}>
        
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom: '100px', paddingTop:'45px'}}>
            <img style={{width: '60%'}} src={DPWorldLogo} alt="NBALogo"/>
        </div>

        <div style={{width:'100%', display: "flex", justifyContent: "center", alignItems: "center",flexDirection:'column'}}>
            <h1 style={{color: 'white', fontSize: '55px', marginTop: '30px',marginBottom:'0',width:'900px',marginTop:'0'}}>{Name}</h1>

            <div style={{color: 'white', fontSize: '65px',marginTop:'60px',marginBottom:'0',display:'flex'}}>
              <div id='ball0' style={{backgroundImage: `url(${ballno})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat',backgroundSize:'cover',width:'100px',height:'100px',display:'flex',justifyContent:'center',alignItems:'center'}}>
                <h1 id='h0' style={{color: 'white', fontSize: '65px',marginBottom:'0',marginTop:'0'}}></h1>
              </div>

              <div id='ball1' style={{backgroundImage: `url(${ballno})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat',backgroundSize:'cover',width:'100px',height:'100px',display:'flex',justifyContent:'center',alignItems:'center',marginLeft:'20px'}}>
                <h1 id='h1' style={{color: 'white', fontSize: '65px',marginBottom:'0',marginTop:'0'}}></h1>
              </div>

              <div id='ball2' style={{backgroundImage: `url(${ballno})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat',backgroundSize:'cover',width:'100px',height:'100px',display:'flex',justifyContent:'center',alignItems:'center',marginLeft:'20px'}}>
                <h1 id='h2' style={{color: 'white', fontSize: '65px',marginBottom:'0',marginTop:'0'}}></h1>
              </div>

              <div id='ball3' style={{backgroundImage: `url(${ballno})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat',backgroundSize:'cover',width:'100px',height:'100px',display:'flex',justifyContent:'center',alignItems:'center',marginLeft:'20px'}}>
                <h1 id='h3' style={{color: 'white', fontSize: '65px',marginBottom:'0',marginTop:'0'}}></h1>
              </div>

              <div id='ball4' style={{backgroundImage: `url(${ballno})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat',backgroundSize:'cover',width:'100px',height:'100px',display:'flex',justifyContent:'center',alignItems:'center',marginLeft:'20px'}}>
                <h1 id='h4' style={{color: 'white', fontSize: '65px',marginBottom:'0',marginTop:'0'}}></h1>
              </div>

              <div id='ball5' style={{backgroundImage: `url(${ballno})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat',backgroundSize:'cover',width:'100px',height:'100px',display:'flex',justifyContent:'center',alignItems:'center',marginLeft:'20px'}}>
                <h1 id='h5' style={{color: 'white', fontSize: '65px',marginBottom:'0',marginTop:'0'}}></h1>
              </div>
            </div>

        </div>

        <div style={{display:'flex', justifyContent: "center", alignItems: "center",flexDirection:'column',  width: '100vw'}}>

          <h1 style={{color: 'white', fontSize: '75px',marginBottom:'0',marginTop:'0',marginTop:'100px'}}>YOU SCORED</h1>

          <div id='scoreball' style={{backgroundImage: `url(${ball})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat',backgroundSize:'cover',width:'400px',height:'400px',display:'flex',justifyContent:'center',alignItems:'center',marginTop:'100px',transform: 'scale(0)',transition:'transform 1s'}}>
                  <h1 id='scoreh' style={{color: 'white', fontSize: '305px',marginBottom:'100px',marginTop:'0'}}></h1>
          </div>
        </div>



        <div style={{width:'100%', display: "flex", justifyContent: "center", alignItems: "center",flexDirection:'column',marginTop:'100px'}}>
            <h1 style={{color: 'white', fontSize: '55px', marginTop: '30px',marginBottom:'0',width:'900px',marginTop:'0'}}>SACHIN TENDULKAR</h1>

            <div style={{color: 'white', fontSize: '65px',marginTop:'60px',marginBottom:'0',display:'flex'}}>
              <div style={{backgroundImage: `url(${ball})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat',backgroundSize:'cover',width:'100px',height:'100px',display:'flex',justifyContent:'center',alignItems:'center'}}>
                <h1 style={{color: 'white', fontSize: '65px',marginBottom:'0',marginTop:'0'}}>4</h1>
              </div>

              <div style={{backgroundImage: `url(${ballno})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat',backgroundSize:'cover',width:'100px',height:'100px',display:'flex',justifyContent:'center',alignItems:'center',marginLeft:'20px'}}>
              </div>

              <div style={{backgroundImage: `url(${ball})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat',backgroundSize:'cover',width:'100px',height:'100px',display:'flex',justifyContent:'center',alignItems:'center',marginLeft:'20px'}}>
                <h1 style={{color: 'white', fontSize: '65px',marginBottom:'0',marginTop:'0'}}>4</h1>
              </div>

              <div style={{backgroundImage: `url(${ball})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat',backgroundSize:'cover',width:'100px',height:'100px',display:'flex',justifyContent:'center',alignItems:'center',marginLeft:'20px'}}>
                <h1 style={{color: 'white', fontSize: '65px',marginBottom:'0',marginTop:'0'}}>4</h1>
              </div>

              <div style={{backgroundImage: `url(${ball})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat',backgroundSize:'cover',width:'100px',height:'100px',display:'flex',justifyContent:'center',alignItems:'center',marginLeft:'20px'}}>
                <h1 style={{color: 'white', fontSize: '65px',marginBottom:'0',marginTop:'0'}}>4</h1>
              </div>

              <div style={{backgroundImage: `url(${ball})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat',backgroundSize:'cover',width:'100px',height:'100px',display:'flex',justifyContent:'center',alignItems:'center',marginLeft:'20px'}}>
                <h1 style={{color: 'white', fontSize: '65px',marginBottom:'0',marginTop:'0'}}>2</h1>
              </div>
            </div>

        </div>


      </div>

      <div id='screen4' style={{ display: "none", flexDirection: "column", width: "100%", height: "100vh", justifyContent: "center", alignItems: "center", textAlign: 'center', backgroundColor: '#1E1450', backgroundImage: `url(${BackgroundLeaderboard})`, backgroundPosition: 'bottom', backgroundRepeat: 'no-repeat'}}>
        
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom: '100px', paddingTop:'45px'}}>
            <img style={{width: '60%'}} src={DPWorldLogo} alt="NBALogo"/>
        </div>

        <div style={{width:'100%', display: "flex", justifyContent: "center", alignItems: "center",flexDirection:'column',marginBottom:'100px'}}>
            <h1 style={{color: 'white', fontSize: '95px', marginTop: '30px',marginBottom:'0',width:'600px'}}>GAME OVER</h1>
            <h1 style={{color: 'white', fontSize: '95px', marginTop: '20px',marginBottom:'0',width:'600px'}} id='uscore'></h1>
  

        </div>

        <div style={{height:'3px',width:'900px',background:'white',marginBottom:'100px'}}>

        </div>


        <div style={{width:'100%', display: "flex", justifyContent: "center", alignItems: "center",flexDirection:'column'}}>
            <h1 style={{color: 'white', fontSize: '95px', marginTop: '30px',marginBottom:'0',width:'900px',marginTop:'0',width:'600px'}}>THANK YOU!</h1>

        </div>



      </div>

      
    </>
  )
}

export default Game;