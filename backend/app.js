var express = require("express")
var mongoose = require("mongoose")
require("dotenv").config()
var bodyparser = require("body-parser")
var cookieparser = require("cookie-parser")
var cors = require("cors")
var user = require("./routes/user")
var authRoute = require("./routes/auth")
var todoRoute = require("./routes/todos")

var app = express()
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
    
}).then(() => {
    console.log("DB CONNECTED");
    
})
  .catch((err) => {
      console.log("NOT CONNECTED");
      
  })  

app.use(bodyparser.json())
app.use(cookieparser())
app.use(cors())

app.use("/todos",authRoute)
app.use("/todos",user)
app.use("/todos",todoRoute)

port = process.env.PORT || 3000
app.listen(port,() => {
    console.log(`app started at port ${port}`);   
})








