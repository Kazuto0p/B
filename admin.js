const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://umamahesh9447230:kazuto14@cluster0.eoieac4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("Admin connected")
   
})
.catch(err=>console.log(err))
let mongoschema = mongoose.Schema
const AdminSchema = new mongoschema({
    oname:String,
    onumber:Number,
    omail:String,
    opass:String
})

var Admin = mongoose.model("Admin",AdminSchema)
module.exports = Admin