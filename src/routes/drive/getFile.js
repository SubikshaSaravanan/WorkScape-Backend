const express = require('express');
const router = express.Router();;
const firestore = require("../../../firebase/firebase.js").firestore;
const firebase = require("firebase-admin");



router.post('/',async(request,response) =>{

    try{
        let myFiles = [];
        const collectionRef = await firestore.collection("shared_drive");
        const files = await collectionRef.where("userId","==",request.body.userId).orderBy('uploardedAt','desc').limit(7).get();

        if(!files.empty){
            files.forEach((file) =>{
                myFiles.push(file.data());
            });
            response.json({files:myFiles});
        }else{
            response.json({files:[]}).status(404);
        }

    }catch(error){
        response.json({message:error.message}).status(500);
    }
    
});



module.exports = router;



