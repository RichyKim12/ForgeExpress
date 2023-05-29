import "./App.css"
import {useState, useEffect} from "react"
import Popups from './Popup.js';
import DeletePopup from "./DeletePopup";
import MessageFormPost from './MessageFormPost.js'
import MessageFormEdit from './MessageFormEdit.js'
function App() {
  const [info, setInfo] = useState();
  const [editIndex, setEditIndex] = useState(0)
  const [buttonPopup, setButtonPopup] = useState(false)
  const [deletePopup, setDeleteButtonPopup] = useState(false)
  const [deleteIndex, setDeleteIndex] = useState(0)

  useEffect(() => {
    fetch("http://localhost:9000/messaging/info")
    .then((res) => res.json())
    .then((text) => setInfo(text.result))
    .catch((err) => console.log(err))
  }, [])
  

  function handlePopup(e){
    setButtonPopup(true)
    setEditIndex(e)
    // e.preventDefault()
  }

  function handleDelete(e){
    setDeleteButtonPopup(true)
    setDeleteIndex(e)
  }

  const handleFinalDelete = (docid) =>{
    const deleteRequest={
        method: 'DELETE', 
    }

    fetch("http://localhost:9000/messaging/deletePost/"+docid, deleteRequest)
    .then((res)=>console.log(res))
    window.location.reload(false);
  }
  return (
    <>
        {/* Each document in my database had a responseText field (i.e. responseText is just a variable name I choose) */}
        <h1>Enter Message here</h1>
        <MessageFormPost/>
        {/* <input type="submit" value="Post" onClick={() => post()} /> */}
        {info && info.map((item,index)=> 
        <div key = {index}>
          {item[0].username}: {item[0].message}
          <button onClick = {() => handlePopup(index)}>edit</button>
          <Popups trigger={buttonPopup && editIndex === index} setTrigger={setButtonPopup}> 
            <h1>Edit Message here</h1> 
            <MessageFormEdit 
              key = {index}
              oldusername = {item[0].username}
              oldmessage= {item[0].message}
              docid = {item[1]}
            />
          </Popups>
          <button onClick = {() => handleDelete(index)}> delete</button>
          <DeletePopup trigger={deletePopup && deleteIndex === index} setTrigger={setDeleteButtonPopup}> 
            <h1>Are you sure you want to delete this post? </h1>
            <p>{item[0].username}: {item[0].message} : {item[1]}</p>
            <button onClick = {() => handleFinalDelete(item[1])} >Delete</button>            
          </DeletePopup>
        </div>
        
        )}
        
    </>
  );
}

export default App;