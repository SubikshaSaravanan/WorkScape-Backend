const express = require("express");
const firestore = require("../../../firebase/firebase.js").firestore;
const firebase = require("firebase-admin");
const route = express.Router();


//logical error in create group modules

route.post("/",async(request,response)=>{
    console.log(1);
    try{
        
        const collectionRef = await firestore.collection(request.body.group_name).get();
        console.log(2)
        if(collectionRef.empty){
            let data = {
                createdBy:request.body.user_name,
                createdAt:firebase.firestore.FieldValue.serverTimestamp(),

                
            
            }
            const createCollectionRef = firestore.collection(request.body.group_name).doc("chat-info").set(data);
            response.json({message:"group created"}).status(200);




        }else{
            response.json({message:"group with the following name already exist"}).status(409);

        }

    }catch(error){
        response.json({message:error.message}).status(500);

    }
    
    
});
module.exports = route;

