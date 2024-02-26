const express = require("express");
const router = express.Router();
const firestore = require("../../../firebase/firebase.js").firestore;




router.get("/",async(request,response) =>{

    let projects = [];
    let projectNames = [] 

    try{
        const collectionRef = await firestore.collection("project_list").get();

        if(!collectionRef.empty){
            collectionRef.forEach((doc) =>{
                projects.push(doc.data().progress);
                projectNames.push(doc.data().projectId)
            });
            response.json({projects:projects,projectNames:projectNames});
        }else{
            response.json({message:"no project record Exists"}).status(200);
        }



    }catch(error){
        response.json({message:error.message});
    }


});


module.exports = router;