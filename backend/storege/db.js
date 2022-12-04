const mongoose = require("mongoose");
//const DB = "mongodb+srv://Mrblog316:8209797067#su@cluster0.hqpstq2.mongodb.net/Blogs?retryWrites=true&w=majority"
const DB = "mongodb://localhost:27017";
mongoose.connect(DB,{
    // useCreateIndex:true,
    // useFindAndModify:false,
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>console.log("db")).catch((err)=>console.log(err))