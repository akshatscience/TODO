var express = require("express")
var router = express.Router()

const {getUserById, saveTodos} = require("../controllers/user")
const {isSignedIn,isAuthenticated} = require("../controllers/auth")
const {getTodos,createTodos,updateTodos, getTodosById, getATodo,deleteTodos } = require("../controllers/todos")

router.param("userId",getUserById)
router.param("todosId",getTodosById)


router.get("/user/todos/:userId",isSignedIn,isAuthenticated,getTodos)

router.post("/user/create/:userId",isSignedIn,isAuthenticated,createTodos)

router.put("/user/update/:todosId/:userId",isSignedIn,isAuthenticated,updateTodos)

router.delete("/user/:todosId/:userId",isSignedIn,isAuthenticated,deleteTodos)


module.exports = router