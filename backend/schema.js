const express=require("express")
const mongoose=require("mongoose")

const schema=mongoose.Schema

const Userschema=schema({
    name:{
        // type:String,
    },
    email:{
        // type:String,

    },
    password:{
        // type:Number,
    },
    confirmpassword:{
        // type:Number
    }

})

const user=mongoose.model('signupdbs',Userschema)

module.exports=user;
