const mongoose=require("mongoose")

mongoose.connect("mongodb+srv://<username>:<password>@datacluster.p9xajr5.mongodb.net/?retryWrites=true&w=majority"
,{useNewUrlParser:true,useUnifiedTopology:true})
.catch((e)=>{
 console.log("connection error"+e.message)
})

module.exports=mongoose.connection