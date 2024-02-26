const express = require("express");
const router =  express.Router();
const getUserName = require("../../util/getUserName");
const firestore = require("../../../firebase/firebase.js").firestore;
const firebase = require("firebase-admin");


router.post("/",async(request,response) =>{

    try{

        const collectionRef = await firestore.collection("user_profile");
        const query = await collectionRef.where("employeeName","==",request.body.employeeName).get();
        if(!query.empty){
            let docId;
            query.forEach((doc) => {
                docId = doc.id;
            })
            const userName = await getUserName(request.body.sender)
            let messagesRef = await collectionRef.doc(docId).collection("inbox").doc().set({
                sender: userName,
                subject:request.body.subject,
                context:request.body.context,
                resourceUrl:request.body.url,
                sentAt:firebase.firestore.FieldValue.serverTimestamp(),

            });
            response.json({message:"message sent successfully"}).status(200);
            
        }else{
            response.json({message:"invalid username"}).status(404);
        }

    }catch(error){
        response.json({message:error.message}).status(500);
    }

    
});



module.exports = router
