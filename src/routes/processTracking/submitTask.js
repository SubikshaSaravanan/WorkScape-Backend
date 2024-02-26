const express = require('express');
const router = express.Router();
const firestore = require("../../../firebase/firebase.js").firestore;
const firebase = require("firebase-admin");



router.post('/',async(request,response) =>{

    try{
        let projectId;
        let taskId;
        const collectionRef = await firestore.collection("project_list");
        const project = await collectionRef.where("projectId","==",request.body.projectId).get();

        if(!project.empty){
            project.forEach((doc) =>{
                projectId = doc.id;
            })
            const taskRef = await collectionRef.doc(projectId).collection("tasks");
            const task = await taskRef.where("taskId","==",request.body.taskId).get();

            if(!task.empty){
                task.forEach((doc) =>{
                    taskId = doc.id;
                });
                const res = await taskRef.doc(taskId).set({
                    status:"completed",
                },{merge:true});
            }else{
                response.json({message:"invalid TaskId"}).status(409);
            };

            const resourceCollectionRef = await firestore.collection("resources");

           await resourceCollectionRef.doc().set({
                projectId:request.body.projectId,
                taskId:request.body.taskId,
                resourceUrl:request.body.resourceUrl,
                uploardedAt:firebase.firestore.FieldValue.serverTimestamp(),
           });
           response.json({message:"submitted successfully"}).status(200);
            
        }else{
            response.json({message:"invaid project ID"}).status(409);
        }

    }catch(error){
        response.json({message:error.message}).status(500);
    }
});

module.exports = router;