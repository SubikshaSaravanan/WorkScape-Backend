const firestore = require("../../firebase/firebase.js").firestore;



const calcProgress = async(projectId) =>{
    let currentProgress;
    let totalTasks = 0;
    let projectID;
    try{
        const collectionRef = await firestore.collection("project_list");
        const projectRef = await collectionRef.where("projectId","==",projectId).get();
        
        if(!projectRef.empty){
            projectRef.forEach((doc) =>{
                currentProgress = doc.data().progress;
                projectID = doc.id;
            });

            const res = await collectionRef.doc(projectID).collection("tasks").get();
            if(!res.empty){
                res.forEach((doc) =>{
                    totalTasks++;
                });
                if(currentProgress == 0){
                    return (1/totalTasks)*100;
                }else{
                    const count = (currentProgress/100)*totalTasks;
                    return ((count+1)/totalTasks)*100;
                }
                
            };
           

        }else{
            return "invalid projectId";
        }


    }catch(error){
        return error.message;
    }
};


module.exports = calcProgress;