var mongoose = require("mongoose")
var {ObjectId} = mongoose.Schema.Types

var todosSchema = new mongoose.Schema({
  todos:{
      type:Object,
      ref:"User"
  },
  name:String
},{timestamps:true})

const todos = mongoose.model("Todos",todosSchema)

module.exports = todos