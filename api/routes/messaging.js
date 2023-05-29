// This code allows me to utilize/access firebase 
const db = require("./firebase");
const {deleteDoc, updateDoc, setDoc, getDocs, collection, doc} = require("firebase/firestore");
// other stuff
const express= require("express");
const router = express.Router();

// router.get("/", function(req, res, next) {
//     res.send("MESSAGING PAGE");
// });
router.get("/", (req, res, next) => {
    res.send("Message page")
  })

router.get("/info", async (req, res, next) => {
    const allDocData = []
    // console.log(req.query)  // shows the URL params (stuff after the ? in the URL)
    const docs = await getDocs(collection(db, "User"))
    docs.forEach((doc) => allDocData.push([doc.data(),doc.id]))
    docs.forEach((doc) => console.log(doc.data()))
    res.json({result: allDocData})
})

router.put("/put", async(req,res) =>{
    const userCollection = collection(db,"User")
    const data = req.body
    console.log(req.body)
    try{
        updateDoc(doc(db,'User',data.docid),{
            username: data.username,
            message: data.message
        })
        res.send("Message Post updated")
    }
    catch(error){
        console.log(error)
    }
    

})

router.post("/post", async (req, res, next) => {
    
    data = req.body
    try{setDoc(doc(db,'User',Math.random().toString()), data )
    res.send("Received")
    }
    catch(error){
        console.log(error)
    }
    // addDoc(a, req.body)
    
})
router.delete("/deletePost/:docid", async(req,res) =>{
    const userCollection = collection(db,"User")    
    console.log(req.params.docid)
    try{
        deleteDoc(doc(db,'User', req.params.docid))
        res.send("deleted")
    }
    catch(error){
        console.log(error)
    }
    // try{
    //     updateDoc(doc(db,'User',data.docid),{
    //         username: data.username,
    //         message: data.message
    //     })
    //     res.send("deleted")
    // }
    // catch(error){
    //     console.log(error)
    // }
    
})

module.exports = router