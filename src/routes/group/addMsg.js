const express = require("express");
const route = express.Router();
const firestore = require("../../../firebase/firebase.js").firestore;
const firebase = require("firebase-admin");



route.post("/",async(request,response)=>{
    const data = {
        user_name:request.body.user_name,
        user_message:request.body.user_message,
        createdAt:firebase.firestore.FieldValue.serverTimestamp()
   }
    const collectionRef = firestore.collection(request.body.group_name);
    


    try{
        const res = await collectionRef.doc().set(data);
        response.json({message:res}).status(200);
        
    }catch(error){
        console.log(error);
        response.json({error:error}).status(500);
    }
    }
);


module.exports = route;
