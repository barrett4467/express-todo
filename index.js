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
    
    
//GET Method
app.get('/', function(req, res){
    TodoTask.find({}, (err, tasks) => {
        res.render("todo.ejs", { todoTasks: tasks });
    })});
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

 //UPDATE Method
app.route("/edit/:id")
.get((req, res) => {
    const id = req.params.id;
    TodoTask.find({}, (err, tasks) => {
        res.render("todoEdit.ejs", { todoTasks: tasks, idTask: id
        });
    });
})
.post((req, res) => {
    const id = req.params.id;
    TodoTask.findByIdAndUpdate(id, { content: req.body.content }, err => {
        if (err) return res.send(500, err);
        res.redirect("/");
    });
});
//End of UPDATE method

//DELETE Method
app.route("/remove/:id").get((req, res) => {
    const id = req.params.id;
    TodoTask.findByIdAndRemove(id, err => {
        if (err) return res.send(500, err);
        res.redirect("/");
    });
});
//End of DELETE Method

