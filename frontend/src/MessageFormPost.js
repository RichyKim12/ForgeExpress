import React from 'react'
import axios from "axios"
import {useState, useEffect} from "react"

function MessageForm() {
  const [message, setMessage] = useState(''); 
  const [ username, setUserName] = useState('');
  const handleSubmit = (e) =>{
    e.preventDefault();
    axios.post("http://localhost:9000/messaging/post", {
        username: username,
        message: message,
    })
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err))
    window.location.reload(false);
    // ALTERNATIVE WAY OF POST
    
    // const post = { username, message};
    // fetch("http://localhost:9000/messaging/post", {
    //     method: 'POST',
    //     headers: {"Content-Type": "application/json"},
    //     body: JSON.stringify(post)  
    //   }
    // )
    // .then((res)=>console.log(res.body))
}
  return (
    <form onSubmit = {handleSubmit} className = "post">
            <label>  </label>
            <input
              type = "text"
              required
              placeholder='Enter a Username'
              value = {username}
              onChange = {(e) => setUserName(e.target.value)}
            />
            <textarea
                type="text"
                required
                placeholder='Enter a message'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button> Add Post </button>

    </form>
  )
}

export default MessageForm