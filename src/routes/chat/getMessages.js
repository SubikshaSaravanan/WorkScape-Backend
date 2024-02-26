const express = require("express");
const router = express.Router();
const firestore = require("../../../firebase/firebase.js").firestore;



router.post("/",async(request,response) =>{

    let messages = [];
    try{
        const collectionRef = await firestore.collection("user_profile");
        const query = await collectionRef.where("employeeId","==",request.body.uid).get();

        if(!query.empty){
            let docID;

            query.forEach((doc) =>{
                docID = doc.id;
            });

            const inboxCollectionRef = await collectionRef.doc(docID).collection("inbox").get();
            inboxCollectionRef.forEach((message) =>{
                messages.push(message.data());
            });

            response.json({messages:messages});


        }else{
            response.json({message:"invalid userID"}).status(404);
        }

    }catch(error){
        response.json({message:error.message});
    }
});


module.exports = router;