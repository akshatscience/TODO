var Todos = require("../models/todos")
const User = require("../models/user")
const todos = require("../models/todos")

exports.getTodosById = (req,res,next,Id) => {
    Todos.findById(Id)
    //.populate("todos","_id name")
    .exec((err,todos) => {
        if(err){
            return res.status(400).json({
                error:"Todo not found"
            })
        }
        
        req.todos = todos
        next()
    })
}

exports.createTodos = (req,res) => {
    //console.log(req.body);
    
    const todo = new Todos(req.body)
    todo.save((err,todo) => {
        if(err){
            return res.status(400).json({
                error:"Cannot create todo"
            })
        }
        
        res.json(todo)
        User.updateOne({_id:req.profile._id},
            {$push:{todos:todo},
        new:true},(err,res) => {
            if(err){
                return res.status(400).json({
                    error:"cannot save todos"
                })
            }
           
            })
    })
    
}

exports.getTodos = (req,res) => {
    Todos.find({_id:req.profile.todos},(err,todos)=>{
        if(err){
            return res.status(402).json({
                error:"Unable to fetch todos"
            })
        }
        res.json(todos)
        
    })
    
}

exports.updateTodos = (req,res) => {
    const todos = req.todos
    todos.name = req.body.name
    
    
    Todos.updateOne({_id:todos._id},{$set:{name:todos.name}}).exec((err,utodos) => {
        if(err){
            console.log(err);
            
            return res.status(400).json({
                error:"cannot update"
            })
        }
        return res.json(todos.name)
    })
}

exports.deleteTodos = (req,res) => {
    const todos = req.todos
    todos.remove((err,todo) => {
        if(err){
            return res.status(401).json({
                error:"cannot delete"
            })
        }
        res.json(todo)
    })
}