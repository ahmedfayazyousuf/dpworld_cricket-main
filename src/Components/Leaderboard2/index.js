import React, { useEffect, useState } from 'react';
import firebase from '../../firebase';
import BackgroundLeaderboard from '../1_Assets/BackgroundLeaderboard.png'
import DPWorldLogo from '../1_Assets/DPWorldLogo.png';
import { useNavigate } from 'react-router-dom';


const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [count,setCount] = useState(0)
  const navigate = useNavigate();


  // Set up a listener to fetch and update the leaderboard in real-time
  useEffect(() => {
    const Users = firebase.firestore().collection("CricketUsers");

    // Query Firestore to fetch the top 10 users based on "Score" in ascending order
    const query = Users.orderBy("Score", "desc").orderBy('BallUsed', 'asc');
    let initialLoadComplete = false;
    var doccount = 0;


    const unsubscribe = query.onSnapshot((querySnapshot) => {

      const data = [];
      let newDocumentAdded = false;
    
      querySnapshot.docChanges().forEach((change) => {

        if (change.type === 'added') {
          console.log('addeddd')
          newDocumentAdded = true;
          
        }
    
        if (change.type === 'modified' || change.type === 'removed') {
          // Handle modified or removed documents if needed
        }
      });
    
      querySnapshot.forEach((doc) => {

       if (doccount < 10) {
        console.log(doccount)
        data.push({ id: doc.id, ...doc.data() });
        
       }

        doccount++;
      });
      setLeaderboardData(data);
     
      if (!initialLoadComplete) {
        initialLoadComplete = true;
      } else if (newDocumentAdded) {
        setCount((prevCount) => prevCount + 1);
        navigate('/Game');
      }
    });
    

    // Return a cleanup function to unsubscribe from the snapshot listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);


  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100vh", justifyContent: "center", alignItems: "center", textAlign: 'center', backgroundColor: '#1E1450', backgroundImage: `url(${BackgroundLeaderboard})`, backgroundPosition: 'bottom', backgroundRepeat: 'no-repeat'}}>
        
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginBottom: '5px', paddingTop:'45px'}}>
            <img style={{width: '60%'}} src={DPWorldLogo} alt="NBALogo"/>
        </div>

`        <div style={{width:'100%', display: "flex", justifyContent: "center", alignItems: "center"}}>
          <div style={{backgroundColor: '#DA1E59', margin: '50px', padding: '0', height: '120px', width: '700px', borderRadius: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <h1 style={{color: 'white', fontSize: '65px', marginTop: '30px'}}>HIGH SCORE</h1>
          </div>
        </div>`
        
        <div style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <div style={{display:'flex',flexDirection:'column',width:'80%'}}>
            <div style={{display:'flex',width:'100%',marginBottom:'20px'}}>

              <div style={{flex:'40%',borderRadius:'100px',background:'rgba(128,128,128,0)', display: 'flex', justifyContent: 'flex-start', paddingLeft: '20px'}}></div>
                <div style={{flex:'80%',borderRadius:'100px',justifyContent:'space-between',marginLeft:'-340px', display: 'flex', justifyItems: 'center', alignItems: 'center'}}>
                  <div style={{paddingLeft:'90px', fontSize: '20px', color: 'white'}}>
                    <h1>NAME</h1>
                  </div>

                  <div style={{paddingRight:'90px', fontSize: '20px', color: 'white'}}>
                    <h1>SCORE</h1>
                  </div>
                </div>
              </div>

              {leaderboardData.map((user,index) => (
                <div style={{display:'flex',width:'100%',marginBottom:'20px'}}>

                  <div style={{flex:'40%',borderRadius:'100px',background:'rgba(128,128,128,0.4)', display: 'flex', justifyContent: 'flex-start', paddingLeft: '20px'}}>

                    <h1 style={{color:'white',fontSize:'40px'}}>{index+1 === 10? index+1: `0${index+1}`}</h1>
                    
                  </div>

                  <div style={{flex:'80%',borderRadius:'100px', background:'white',justifyContent:'space-between',marginLeft:'-340px', display: 'flex', justifyItems: 'center', alignItems: 'center'}}>

                    <div style={{paddingLeft:'90px', fontSize: '20px', color: '#1E1450'}}>
                      <h1>{user.Name}</h1>
                    </div>

                    <div style={{paddingRight:'90px', fontSize: '20px', color: '#1E1450'}}>
                      <h1>{user.Score}</h1>
                    </div>



                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>
    </>
  )
}

export default Leaderboard;