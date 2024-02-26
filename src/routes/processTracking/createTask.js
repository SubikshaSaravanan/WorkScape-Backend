const express = require("express");
const route = express.Router();
const firestore = require("../../../firebase/firebase.js").firestore;



route.post("/",async(request,response) =>{
    let projectId;
    try{
        const collectionRef = await firestore.collection("project_list");
        const project = await collectionRef.where("projectId","==",request.body.projectId).get();
        if(!project.empty){
            project.forEach((doc) =>{
                projectId = doc.id;
            });

            const taskCollectionRef = await collectionRef.doc(projectId).collection("tasks").doc().set({
                taskTitle:request.body.taskTitle,
                taskId:request.body.taskId,
                description:request.body.description,
                assignedTo:request.body.assignedTo,
                dueDate:request.body.dueDate,
                status:request.body.status,
            });
            response.json({message:"task created successfully"}).status(200);
        }else{
            response.json({message:"invalid project ID"}).status(409);
        }

    }catch(error){
        response.json({message:error.message}).status(500);
    }
});



module.exports = route;
