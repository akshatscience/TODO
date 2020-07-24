var mongoose = require("mongoose")
var crypto = require("crypto")
const { v1: uuidv1 } = require('uuid');


var userSchema = new mongoose.Schema({
    name:{
        type:String,
        maxlength:30,
        required:true,
        trim:true
    },
    lastname:{
        type:String,
        maxlength:20,
        trim:true
    },
    secure_password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    salt:String,
    role:{
        type:Number,
        default:0
    },
    todos:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Todos'
    }]
   
},{timestamps:true})


userSchema.virtual('password').set(function(password){
    this._password = password
    this.salt=uuidv1()
    this.secure_password = this.password_encryption(password)
}).get(function(){
    return this._password
})


userSchema.methods = {
    auth_password:function(password){
        return this.password_encryption(password) === this.secure_password
    },

    password_encryption:function(plainpassword){
        if(!plainpassword) return ""
        try {
            const pass = crypto.createHmac("sha256",this.salt)
                                .update(plainpassword)
                                .digest('hex')
            return pass
        } catch (error) {
            return ""
            
        }
    }
}

module.exports = mongoose.model("User",userSchema)