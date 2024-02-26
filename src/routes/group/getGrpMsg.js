const express = require("express");
const route = express.Router();
const firestore = require("../../../firebase/firebase.js").firestore;



route.post("/",async(request,response)=>{
    const collectionRef = firestore.collection(request.body.group_name);
    let messages = [];


    try{
        const query = await collectionRef.orderBy("createdAt","desc").get();
        if(query.empty){
            response.json({message:"NO MESSAGE EXIST"}).status(200);
            
        }else{
            query.forEach((doc)=>{
                messages.push(doc.data());

            });
            response.json({messages:messages}).status(200);
        }
    }catch(error){
        response.json({error:error}).status(500);
    }
    }
);


module.exports = route;
