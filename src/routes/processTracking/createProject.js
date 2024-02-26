const express = require("express");
const route = express.Router();
const firestore = require('../../../firebase/firebase.js').firestore;
const firebase = require("firebase-admin");

route.post("/",async(request,response) =>{

    try{

        const collectionRef = await firestore.collection("project_list");
        const query = await collectionRef.where("projectId","==",request.body.projectId).get();
        if(query.empty){
            const res = await collectionRef.doc().set({
                projectId:request.body.projectId,
                projectName:request.body.projectName,
                managerId:request.body.managerId,
                progress:0,
                dueDate:request.body.dueDate,
                createdAt:firebase.firestore.FieldValue.serverTimestamp()
            });
            response.json({message:"project created successfully"}).status(200);
        }else{  
            response.json({message:"project already exists"}).status(409);
        }
       

    }catch(error){
        response.json({message:error.message}).status(500);
    }
});


module.exports = route;