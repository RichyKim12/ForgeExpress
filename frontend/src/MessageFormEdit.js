import React from 'react'
import axios from "axios"
import {useState, useEffect} from "react"

function MessageForm({oldusername,oldmessage,docid}) {
  const [message, setMessage] = useState(oldmessage); 
  const [username, setUserName] = useState(oldusername);
  console.log(docid)
  const handleSubmit = (e) =>{
    e.preventDefault();
    const messagePost =  {username, message, docid}
    const putRequest = {
        method: 'PUT',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(messagePost)
    }
    fetch("http://localhost:9000/messaging/put",putRequest)
    .then((res)=>console.log(res))
    window.location.reload(false);
}
  return (
    <form onSubmit = {handleSubmit} className = "post">
            <input
              type = "text"
              required
              value = {username}
              onChange = {(e) => setUserName(e.target.value)}
            />
            <textarea
                type="text"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button> Edit post </button>

    </form>
  )
}

export default MessageForm