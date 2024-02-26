const express = require("express");
const router = express.Router();
const firestore = require("../../../firebase/firebase.js").firestore;
const calcProgress = require("../../util/calcProgress.js");



router.post("/",async(request,response) =>{
    let projectId;
    let taskId;
    try{
        const collectionRef = await firestore.collection("project_list");
        const projectRef = await collectionRef.where("projectId","==",request.body.projectId).get();

        if(!projectRef.empty){
            projectRef.forEach((doc) =>{
                projectId = doc.id;
            });

            const tasks = await collectionRef.doc(projectId).collection("tasks");
            const task = await tasks.where("taskId","==",request.body.taskId).get();
            if(!task.empty){
                task.forEach((doc) =>{
                    taskId = doc.id;
                });

                tasks.doc(taskId).set({
                    status:"approved"
                },{merge:true});

                const progressRes= await calcProgress(request.body.projectId);
                await collectionRef.doc(projectId).set({
                    progress:progressRes,
                },{merge:true});

                response.json({message:"task approved"}).status(200);

            }else{
                response.json({message:"invaild taskId"}).status(409);
            };
            
           
            
        }else{
            response.json({message:"invalid projectId"}).status(409);
        };

    }catch(error){
        response.json({message:error.message}).status(500);
    };
});


module.exports = router;