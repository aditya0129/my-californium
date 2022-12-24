// name: "Sabiha Khan",
// balance:100, // Default balance at user registration is 100
// address:"New delhi",
// age: 90,
//  gender: “female” // Allowed values are - “male”, “female”, “other”
// isFreeAppUser: false // Default false value.
// }

const mongoose=require('mongoose')

const userschema= new mongoose.Schema({
    name:String,
    balance:{
        type:Number,
        default:100
    },
    address:String,
    age:Number,
    gender:{
        type:String,
        enum:["male","female","others"]
     }
},{timestamps:true})

module.exports=mongoose.model("UserDB",userschema)