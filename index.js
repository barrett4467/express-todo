var express = require('Express');
var app = express();
const dotenv = require("dotenv");
const mongoose = require('mongoose');

dotenv.config();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
//Database connection
mongoose.set("useFindAndModify", false);
mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true}, ()=>{
        console.log("Connected to Mongodb!");
         //server
    app.listen(3000, () => 
    console.log("Server up and running on port 3000")
    );
    })
app.set("view engine", "ejs");

app.get('/', function(req, res){
    res.render("todo.ejs");
 });
 app.post('/', function(req, res){
    console.log(req.body);
 });
 app.put('/', function(req, res){
     res.send('POST route on index.');
 });
 app.delete('/', function(req, res){
     res.send('POST route on index.');
 });

