const User = require("../models/user")


exports.getUserById = (req,res,next,id) => {
    User.findById(id).exec((err,user) => {
        if(err || !user){
            return res.status(400).json({
                error:"Cannot get user"
            })
        }
        req.profile = user
        next()
    })
}

exports.getUser = (req,res) => {
    req.profile.salt = undefined
    req.profile.secure_password = undefined
    req.profile.createdAt = undefined
    req.profile.updatedAt = undefined
    return res.json(req.profile)
}

exports.updateUser = (req,res) => {
    const user = req.profile._id
    User.findByIdAndUpdate(
        {_id:user},
        {$set:req.body},(err,user) => {
            if(err){
                return res.status(400).json({
                    error:"Unable to update"
                })
            }
            res.send(user.name)
        })
}

// exports.saveTodos = (req,res,next) => {
//     let todolist = []
//     req.profile.todos.forEach(element => {
//         todolist.push({
//             _id:element._id,
//             name:element.name
//         })
        
//     });
//     console.log(req.profile._id);
    
//     User.findByIdAndUpdate(
//         {_id:req.profile._id},
//         {$push:{todos:todolist}},
//         {new:true},
//         (err,todos) => {
//             if(err){
//                 return res.status(400).json({
//                     error:"no item in todo list "
//                 })
//             }
            
//               next() 
//         })
    
// }