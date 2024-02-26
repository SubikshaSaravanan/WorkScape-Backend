const express = require("express");
const home = require("./routes/home.js");
const getGrpMsg = require("./routes/group/getGrpMsg.js");
const addMsg = require("./routes/group/addMsg.js");
const createGrp = require("./routes/group/createGrp.js");
const createUser = require("./routes/users/createUser.js");
const getUser = require("./routes/users/getUser.js");
const createProject = require("./routes/processTracking/createProject.js");
const createTask = require("./routes/processTracking/createTask.js");
const getTasks = require("./routes/processTracking/getTasks.js");
const submitTask = require("./routes/processTracking/submitTask.js");
const approveTask = require("./routes/processTracking/approveTask.js");
const uploadFile = require("./routes/drive/uploardFile.js");
const overAll = require("./routes/processTracking/overAll.js");
const getFile = require("./routes/drive/getFile.js");
const sendMessage = require("./routes/chat/sendMessage.js");
const getMessages = require("./routes/chat/getMessages.js");


const cors = require("cors");
const app = express();
app.use(express.json());

app.use(cors({
    origin:"http://localhost:5173"
}));

app.use("/",home);
app.use("/getGrpMsg",getGrpMsg);
app.use("/addMsg",addMsg);
app.use("/createGrp",createGrp);
app.use("/createUser",createUser);
app.use("/getUser",getUser);
app.use("/createProject",createProject);
app.use("/createTask",createTask);
app.use("/getTasks",getTasks);
app.use("/submitTask",submitTask);
app.use("/approveTask",approveTask);
app.use("/uploadFile",uploadFile)
app.use("/overAll",overAll);
app.use("/getFile",getFile);
app.use("/sendMessage",sendMessage);
app.use("/getMessages",getMessages);



app.listen(8080,(error)=>{
    if(error){
        console.log(error.message);
    }else{
        console.log("SERVER START ON PORT 8080");
    
    }
});