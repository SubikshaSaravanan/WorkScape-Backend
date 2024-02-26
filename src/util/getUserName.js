const firestore = require("../../firebase/firebase.js").firestore;




const getUserName = async(uid) =>{

    let userName;

    try{
        const collectionRef = await firestore.collection("user_profile");
        const query = await collectionRef.where("employeeId","==",uid).get();

        if(query.empty){
            return "invalid userID";
        }else{
            query.forEach((doc) =>{
                userName = doc.data().employeeName;
            });
            return userName;
        }

    }catch(error){
        return error.message;
    }
};


module.exports = getUserName;