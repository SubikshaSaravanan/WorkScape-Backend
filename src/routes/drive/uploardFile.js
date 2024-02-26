const express = require('express');
const router = express.Router();
const firestore = require("../../../firebase/firebase.js").firestore;
const firebase = require("firebase-admin");




router.post("/",async(request,response) =>{

    try{
        const collectionRef = await firestore.collection("shared_drive");
        
        const res = await collectionRef.doc().set({
            userId:request.body.userid,
            resourceUrl:request.body.url,
            uploardedAt:firebase.firestore.FieldValue.serverTimestamp(),
            resourceName:request.body.name,
            resourceType:request.body.type,
            resourceSize:request.body.size,
        });
        response.json({message:"entry added successfully"}).status(200)


    }catch(error){
        response.json({message:error.message}).status(409);
    }
});



module.exports = router;