const express = require("express");
const router = express.Router();
const firestore = require("../../../firebase/firebase.js").firestore;


router.get('/',async(request,response) =>{

    try{
        let projectId;
        let userTasks = [];
        const collectionRef = await firestore.collection("project_list");
        const project = await collectionRef.where("projectId","==",request.body.projectId).get();
        if(!project.empty){

            project.forEach((doc) =>{
                projectId = doc.id;
            })
            const taskRef = await collectionRef.doc(projectId).collection("tasks");
            const tasks = await taskRef.where("assignedTo","==",request.body.assignedTo).get();

            if(!tasks.empty){
                tasks.forEach((task) => {
                    userTasks.push(task.data());
                })
            }

            response.json({tasks:userTasks}).status(200);


        }else{
            response.json({message:"invalid projectId"}).status(409);
        }


    }catch(error){
        response.json({message:error.message}).status(500);
    }

});

module.exports = router;