var express = require('Express');
var app = express();
const dotenv = require("dotenv");
const mongoose = require('mongoose');


//models
const TodoTask = require("./models/TodoTask");
dotenv.config();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
//GET Method
app.get('/', function(req, res){
    res.render("todo.ejs");
 });
//Database connection
mongoose.set("useFindAndModify", false);

mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true }, ()=>{
        console.log("Connected to Mongodb!");
            //server
            
    app.listen(3000, () => 
    console.log("Server up and running on port 3000")
    );
    })


 //POST Method
 app.post('/', async (req, res) => {
     try {
        const todoTask = new TodoTask({
            content: req.body.content
        });
        console.log(todoTask.content)
         console.log("before save");
         let saveTask = await todoTask.save();
         console.log(saveTask);
         console.log("after save");

         res.redirect("/");

     }
     catch (err) {
         console.log(err);
         res.status(500).send(err);
        res.redirect("/");
     }
 });

 app.put('/', function(req, res){
     res.send('POST route on index.');
 });
 app.delete('/', function(req, res){
     res.send('POST route on index.');
 });

