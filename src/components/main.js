import React from "react";
import "./main.css";


var posts = [
  {user:'KevveyKev',message:'hi'},
];

function postClicked(e) {
  console.log(document.getElementById('postBox').value);
  console.log(posts.length);
  if(document.getElementById('postBox').value){
    var message = document.getElementById('postBox').value;
    posts.push({user:'KevveyKev',message:message});
    render()
  }else{

  }
}

function Main(){
  return(
    <div className="mainWrapper">
      <div className="postCont">
        <textarea id="postBox" type="text" placeholder="What's happening???">?</textarea>
        <button onClick={e => postClicked(e)}>POST</button>
      </div>
      <div className="feedCont">
        {posts.map(post =>(
          <div className="postBox">
            <div>{post.user}</div>
            <div>{post.message}</div>   
          </div>
        ))}
      </div>
    </div>
  );
}

export default Main