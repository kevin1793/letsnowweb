import React from "react";
import "./register.css";
import { getAuth,createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import {db} from './../firebase-config';

const auth = getAuth();

const Register = ({onSendMessageToRegister}) => {
  const usersCollectionRef = collection(db,"users");
  const closeModal = () => {
    onSendMessageToRegister('closeModal'); // Call the callback function with the message
  };

  const openRegister = () => {
    onSendMessageToRegister('openSignin'); // Call the callback function with the message
  };

  async function signUpUser(signUp){
    try {
      await createUserWithEmailAndPassword(auth, signUp.email, signUp.pass1);
      try {
        await setDoc(doc(usersCollectionRef, signUp.email), {
          email: signUp.email,
          username: signUp.user,
          displayname: signUp.displayname,
          zip: signUp.zip,
        });
  
        signUpSuccess();
      } catch (error) {
        var errorHTML = document.getElementById('errorText');
        errorHTML.innerHTML = 'Sign Up failed.';
      }
    } catch (error) {
      var errorHTML = document.getElementById('errorText');
      errorHTML.innerHTML = 'Sign Up failed.';
    }
  }

  function signUpSuccess(){
    var successHTML = document.getElementById('signUpSuccess');
    var signUpFormHTML = document.getElementById('signUpForm');
    successHTML.style.display = 'block';
    signUpFormHTML.style.display = 'none';

    var signUpFormHTML = document.getElementById('signUpForm');
    successHTML.style.display = 'block';
    signUpFormHTML.style.display = 'none';
  }

  function signUpClicked(){
    console.log(adjectives[21]);
    var signUp = {user:'',email:'',pass1:'',pass2:''};
    signUp.user = document.getElementById('username').value;
    signUp.email = document.getElementById('email').value;
    signUp.zip = document.getElementById('zip').value;
    signUp.pass1 = document.getElementById('password1').value;
    signUp.pass2 = document.getElementById('password2').value;
    signUp.displayname =  adjectives[Math.floor(Math.random() * 98)]+'-'+nouns[Math.floor(Math.random() * 98)]+'-'+Math.floor(Math.random() * 99);

    var error = '';
    const regexEmail = new RegExp(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/gm);
    const regexZip = new RegExp(/^\d{5}$/);
    if(!regexEmail.test(signUp.email)){
      error += 'Please enter a valid Email<br>';
    }
    if(signUp.pass1 == '' || signUp.pass1 != signUp.pass2){
      error += 'Please make sure Passwords are filled and match<br>';
    }
    if(signUp.user == ''){
      error += 'Please make sure Username is filled<br>';
    }
    if(!regexZip.test(signUp.zip)){
      error += 'Please make sure Zip is filled and valid<br>';
    }
    if(error){
      var errorHTML = document.getElementById('errorText');
      errorHTML.innerHTML = error;
      return;
    }
    signUpUser(signUp);
  }

  var adjectives = [
    "Silly",
    "Wacky",
    "Whimsical",
    "Bizarre",
    "Quirky",
    "Goofy",
    "Zany",
    "Absurd",
    "Ridiculous",
    "Hilarious",
    "Funky",
    "Offbeat",
    "Amusing",
    "Oddball",
    "Eccentric",
    "Cheeky",
    "Fanciful",
    "Curious",
    "Ludicrous",
    "Outlandish",
    "Mirthful",
    "Witty",
    "Playful",
    "Jovial",
    "Flamboyant",
    "Unconventional",
    "Merry",
    "Lighthearted",
    "Clownish",
    "Whacky",
    "Gleeful",
    "Droll",
    "Kooky",
    "Bubbling",
    "Nonsensical",
    "Witty",
    "Zesty",
    "Giggly",
    "Chuckling",
    "Zippy",
    "Peculiar",
    "Hysterical",
    "Zippy",
    "Spirited",
    "Comical",
    "Far-out",
    "Laughable",
    "Mirthful",
    "Zestful",
    "Playful",
    "Frolicsome",
    "Amusing",
    "Entertaining",
    "Belly-laugh",
    "Bouncy",
    "Daffy",
    "Jocular",
    "Merrymaking",
    "Off-the-wall",
    "Side-splitting",
    "Snazzy",
    "Whimsy",
    "Zesty",
    "Giggle-inducing",
    "Grinning",
    "Mirth-making",
    "Perky",
    "Puckish",
    "Risible",
    "Smile-worthy",
    "Spirited",
    "Tee-hee",
    "Unusual",
    "Zappy",
    "Mirthful",
    "Screwball",
    "Silly",
    "Zany",
    "Giddy",
    "Droll",
    "Joking",
    "Quizzical",
    "Teasing",
    "Uproarious",
    "Whimsy",
    "Zippy",
    "Laughing",
    "Mirthful",
    "Lively",
    "Zestful"
  ];
  var nouns = [
    "Whisker",
    "Socks",
    "Biscuit",
    "Pickle",
    "Muffin",
    "Waffle",
    "Narwhal",
    "Flamingo",
    "Pancake",
    "Pajamas",
    "Penguin",
    "Jellybean",
    "Tornado",
    "Marshmallow",
    "Unicorn",
    "Kangaroo",
    "Bubble",
    "Banana",
    "Jigsaw",
    "Disco",
    "Llama",
    "Zucchini",
    "Gummy Bear",
    "Balloon",
    "Noodle",
    "Pineapple",
    "Poodle",
    "Cupcake",
    "Giggles",
    "Hippo",
    "Snuggle",
    "Tofu",
    "Chatterbox",
    "Squirrel",
    "Spaghetti",
    "Gargoyle",
    "Mustache",
    "Dragonfly",
    "Donut",
    "Cheesecake",
    "Snickerdoodle",
    "Bumblebee",
    "Watermelon",
    "Lollipop",
    "Sausage",
    "Sasquatch",
    "Flapjack",
    "Caterpillar",
    "Piglet",
    "Fandango",
    "Mango",
    "Cactus",
    "Toothbrush",
    "Wombat",
    "Penguin",
    "Jellybean",
    "Waffle",
    "Tornado",
    "Marshmallow",
    "Zucchini",
    "Bumblebee",
    "Watermelon",
    "Lollipop",
    "Sausage",
    "Giggles",
    "Tofu",
    "Cupcake",
    "Noodle",
    "Mustache",
    "Snuggle",
    "Disco",
    "Pickle",
    "Balloon",
    "Biscuit",
    "Unicorn",
    "Pancake",
    "Pineapple",
    "Gummy Bear",
    "Jigsaw",
    "Waffle",
    "Hippopotamus",
    "Pajamas",
    "Doughnut",
    "Flamingo",
    "Penguin",
    "Sloth",
    "Zebra",
    "Snickerdoodle",
    "Gargoyle"
  ];

  return (
  <div className='signInModal'>
    <div className='title'>
      Register
    </div>
    <div id="errorText"></div>
    <div id="signUpForm">
      <div id="errorText"></div>
      <div className="label">Email</div>
      <input id="email" placeholder="Email"></input>
      <div className="label">Username</div>
      <input  id="username"  placeholder="Username"></input>
      <div className="label">Zip Code</div>
      <input  id="zip"  placeholder="ex) 12345"></input>
      <div className="label">Password</div>
      <input  id="password1"  type="password" placeholder="Password"></input>
      <div className="label">Password (Again!)</div>
      <input  id="password2" type="password" placeholder="Password"></input>
      <button onClick={signUpClicked}>Sign Up</button>
    </div>
    <div id="signUpSuccess">
      Sign Up was successful! Sign In to start posting!
    </div>
    <div className="cancel" onClick={closeModal}>Cancel</div>
    <div className="cancel" onClick={openRegister}>Sign In</div>
  </div>
  );

  
}

export default Register