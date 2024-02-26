const express = require("express");
const route = express.Router();
const firestore = require("../../../firebase/firebase.js").firestore;





route.post("/",async(request,response) =>{
    const profile = [];
    try{

        const collectionRef = await firestore.collection("user_profile");
        const employeeProfile = await collectionRef.where("employeeId","==",request.body.employeeId).get();

        if(!employeeProfile.empty){
            employeeProfile.forEach((doc) =>{
                profile.push(doc.data());
            });

            response.json({profile:profile});

        }else{
            response.json({message:"employee profile doesn't exists"}).status(404);
        }

    }catch(error){
        response.json({message:error.message}).status(500);
    }

});


module.exports = route;
