import React, { useEffect,useState } from "react";
import "./main.css";
import PersonIcon from '@mui/icons-material/Person';
import {db} from './../firebase-config';
import {collection, getDocs} from 'firebase/firestore';

var postss = [
  {user:'KevveyKev',userID:'kclaveria',message:'Hello World!'},
  {user:'UzziGun',userID:'gayBoi22',message:'Why are you gai??'},
];

const Main = ({onSendMessage}) => {
  const [posts, setPosts] = useState([]);
  const postsCollectionRef = collection(db,"posts");
  const sendMessageToParent = () => {
    const message = 'showSignin';
    onSendMessage(message); // Call the callback function with the message
  };

  useEffect(() => {
    const getPosts = async () =>{
      const data = await getDocs(postsCollectionRef);
      setPosts(data.docs.map((doc) => ({...doc.data(),id:doc.id})));
      console.log(posts);
    }
    getPosts();
  },[])

  function postClicked(e) {
    console.log(localStorage);
    if(localStorage.signedIn == true){
      console.log(document.getElementById('postBox').value);
      console.log(posts.length);
      if(document.getElementById('postBox').value){
        var message = document.getElementById('postBox').value;
        posts.push({user:'KevveyKev',message:message});
      }
    }else{
      sendMessageToParent()
    }
  }

  return(
    <div className="mainWrapper">
      <div className="postCont">
        <div className="avatarCol"><PersonIcon  className="avatar"/></div>
        <div className="postCol">
          <textarea id="postBox" type="text" placeholder="What's happening???">?</textarea>
          <button className="postButton" onClick={e => postClicked(e)}>POST</button>
        </div>
      </div>
      <div className="feedCont">
        {postss.map(post =>(
          <div className="postBox">
            <div className="avatarCol"><PersonIcon className="avatar"/></div>
            <div className="postCol">
              <div className="userInfoLine">
                <div className="userText">{post.user}</div>
                <div className="userIDText">@{post.userID}</div>
              </div>
              <div>{post.message}</div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Main