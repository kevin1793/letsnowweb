import React, { useEffect,useState } from "react";
import "./main.css";
import PersonIcon from '@mui/icons-material/Person';
import {db} from './../firebase-config';
import {collection, getDocs,doc,setDoc,deleteDoc, query,limit ,orderBy} from 'firebase/firestore';
import RefreshIcon from '@mui/icons-material/Refresh';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

var init = 0;
var newData;
var signedIn = false;
const Main = ({onSendMessage}) => {
  const [posts, setPosts] = useState([]);
  const [state, setState] = useState(0);
  const postsCollectionRef = collection(db,"posts");
  const sendMessageToParent = () => {
    onSendMessage('showSignin'); // Call the callback function with the message
  };

  if(localStorage.getItem('signedIn') == 'true'){
    signedIn = 'true';
  }
  // useEffect(() => {
  
  const getPosts = async () =>{
    console.log('GETTING POSTS');
    const data = await getDocs(query(collection(db, "posts"), orderBy("timestamp",'desc'), limit(25)));
    if(data){
      var sorted = data.docs.map((doc) => ({...doc.data(),id:doc.id})).sort((a,b) => b.timestamp-a.timestamp)
      console.log(sorted);
      localStorage.setItem('lastUpdate',Date.now());
      localStorage.setItem('lastPosts',JSON.stringify(sorted));
      setPosts(sorted);
      setNewPosts(sorted);
    }
  }
  function setNewPosts(sorted){
    console.log('POSTS ARE SET');
    setPosts(sorted);
    console.log('state ARE SET',state);
    setState(state+1);

  }
  const setLocalPosts = () => {
    console.log('GETTING LOCAL POSTs',JSON.parse(localStorage.lastPosts));
    var newData = JSON.parse(localStorage.lastPosts);
    console.log('newData',newData);
    setPosts(newData);
    console.log('posts',posts);
  }
  if(init == 0){
    console.log('localStorage',localStorage)
    if(localStorage.lastUpdate && localStorage.lastUpdate-Date.now()>300000){
      console.log('');
      getPosts();
    }
    else{
      getPosts();
    }
    init = 1;
  }
  async function uploadPost(message,occasion,location){
    await setDoc(doc(postsCollectionRef), {
      timestamp:Date.now(),
      username: localStorage.username,
      displayname: localStorage.displayname,
      message: message,
      occasion:occasion,
      location:location
    });
    getPosts();
    document.getElementById('postBox').value = '';
    document.getElementById('occasionBox').value = '';
    document.getElementById('locationBox').value = '';
  }
  function postClicked(e) {
    console.log('postclicked',localStorage,posts);
    if(localStorage.signedIn == 'true'){
      if(document.getElementById('postBox').value){
        var message = document.getElementById('postBox').value;
        var occasion = document.getElementById('occasionBox').value;
        var location = document.getElementById('locationBox').value;
        uploadPost(message,occasion,location);
      }
    }else{
      sendMessageToParent()
    }
  }

  function formatTimeStamp(x){
    var d = new Date(x);
    var nowD = new Date();
    var yesterDate = new Date(Date.now()-86400000);
    var nowMonth = nowD.getMonth();
    var nowDate = nowD.getDate();
    var nowYear = nowD.getFullYear();
    var dateString = (d.getMonth(x)+1)+'/'+d.getDate(x)+'/'+d.getFullYear(x);
    if(nowMonth == d.getMonth(x) && nowDate == d.getDate(x) && nowYear == d.getFullYear(x)){
      dateString = 'Today';
    }else if(nowMonth == d.getMonth(x) && yesterDate.getDate() == d.getDate(x) && nowYear == d.getFullYear(x)){
      dateString = 'Yesterday';
    }
    return dateString+' '+(d.getHours(x)>12?d.getHours(x)-12:d.getHours(x))+':'+(d.getMinutes(x)<10?'0'+d.getMinutes(x):d.getMinutes(x))+' '+(d.getHours(x)>12?'PM':'AM');
  }

  async function unLikeClick(e){
    if(!localStorage.getItem('username')){
      sendMessageToParent()
      return;
    }
    var updatedPost = e;
    var newLikes = updatedPost.likes;
    newLikes.splice(newLikes.indexOf(localStorage.getItem('username')), 1);
    updatedPost.likes = newLikes;
    console.log(newLikes);
    try {
      await setDoc(doc(postsCollectionRef, e.id), updatedPost);
      getPosts();
    } catch (error) {
    }
  }

  async function likeClick(e){
    if(!localStorage.getItem('username')){
      sendMessageToParent()
      return;
    }
    var updatedPost = e;
    var newLikes = updatedPost.likes?updatedPost.likes:[];
    newLikes.push(localStorage.getItem('username'));
    updatedPost.likes = newLikes;
    console.log(newLikes);
    try {
      await setDoc(doc(postsCollectionRef, e.id), updatedPost);
      getPosts();
    } catch (error) {
    }
  }

  function openLink(e){
    console.log('open link',e);
    window.open('https://www.google.com/search?q='+(e.location?e.location:''),'_blank')
  }

  function toggleDeletePost(post){
    console.log(localStorage);
    if(localStorage.getItem('deletePost').length && localStorage.getItem('deletePost') != post.id){
      localStorage.setItem('deletePost',post.id);
    }else if(localStorage.getItem('deletePost').length && localStorage.getItem('deletePost') == post.id){
      localStorage.setItem('deletePost','');
    }else{
      localStorage.setItem('deletePost',post.id);
    }
    setState(state+1);
  }

  async function deletePost(post){
    try {
      await deleteDoc(doc(postsCollectionRef, post.id));
      getPosts();
    } catch (error) {
    }
  }

  return(
    <div className="mainWrapper">
      <div id="refresh" onClick={getPosts}>
        <RefreshIcon/>
      </div>
      {
        localStorage.getItem('username') ?
        <div className="postCont">
          <div className="postCol">
            <div><textarea id="postBox" type="text" placeholder="What's happening???"></textarea></div>
            <div className="optionalBoxes">
              <input id="occasionBox" placeholder="Occasion? (Optional)"></input>
              <input id="locationBox"  placeholder="Where at? (Optional)"></input>
            </div>
            <button className="postButton" onClick={e => postClicked(e)}>POST</button>
          </div>
        </div>
        :
        <div className="notSignedInText">Sign In or Register to Post!</div>
      }
      <div className="feedCont">
        {posts.map(post =>(
          <div  key={post.id} className="postWrapper">
            
            <div className="postBox">
              <div className="avatarCol"><PersonIcon className="avatar"/></div>
              <div className="postCol">
                <div className="userInfoLine">
                  <div className="userText">{post.displayname}</div>
                  <div className="userIDText">@{post.username}</div>
                  <div className="postDateTime">{formatTimeStamp(post.timestamp)}</div>
                </div>
                <div>{post.message}</div>
                {post.occasion && post.location?
                <div className="whereText" onClick={e=> openLink(post)}>{post.occasion} @ {post.location}</div>
                :
                ''
                }
                {post.occasion && !post.location?
                <div className="whereText">{post.occasion}</div>
                :
                ''
                }
                {!post.occasion && post.location?
                <div className="whereText"  onClick={e=> openLink(post)}>@ {post.location}</div>
                :
                ''
                }
                <div className="likeBox">
                  <div className="likeCount">
                    {post.likes && post.likes.length?post.likes.length:'0'}
                  </div>
                  {post.likes && post.likes.includes(localStorage.getItem('username'))?
                  <FavoriteIcon onClick={e => unLikeClick(post)} className="likeButton"/>
                  :
                  <FavoriteBorderIcon  onClick={e => likeClick(post)}  className="likeButton"/>
                  }
                  {post.username == localStorage.getItem('username')?
                  <div className="postOptions" onClick={e=> toggleDeletePost(post)}><MoreHorizIcon /></div>
                  :''
                  }
                  {localStorage.getItem('deletePost') == post.id && localStorage.getItem('deletePost').length?
                  <button className="deletePostButton" onClick={e=> deletePost(post)}>DELETE</button>
                  :''
                  }
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Main