const express = require("express");
const route = express.Router();
const firestore = require("../../../firebase/firebase.js").firestore;
const firebase = require("firebase-admin");

route.post("/",async(request,response) =>{
    try{
        const collectionRef = await firestore.collection("user_profile");
        console.log(request.body.employeeId);
        console.log(request.body.employeeName);
        const user = await collectionRef.where("employeeId","==",request.body.employeeId).get();

        if(user.empty){
            const res = await collectionRef.doc().set({
                employeeId:request.body.employeeId,
                employeeName:request.body.employeeName,
                tasksCompleted:0,
                employeeCredits:request.body.employeeCredits,
                projectList:[],
                createdAt:firebase.firestore.FieldValue.serverTimestamp()

            });
            response.json({message:"employee created successfully"}).status(200);


        }else{
            response.json({message:"employee already exists"}).status(409);
        }


    }catch(error){
        response.json({message:error.message}).status(500);
    }
});


module.exports = route;