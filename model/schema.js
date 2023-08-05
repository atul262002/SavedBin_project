const mongoose=require("mongoose")
const schema=mongoose.Schema

const Savedbinproject=new schema({
    value:{
        type: String,
        require : true
    }
})

module.exports=mongoose.model("savedBincollection",Savedbinproject)