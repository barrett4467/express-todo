var express = require('Express');
var app = express();

app.set("view engine", "ejs");

app.get('/', function(req, res){
    res.send('GET route on index.');
 });
 app.post('/', function(req, res){
    res.send('POST route on index.');
 });
 app.put('/', function(req, res){
     res.send('POST route on index.');
 });
 app.delete('/', function(req, res){
     res.send('POST route on index.');
 });

 //server
app.listen(3000, () => 
    console.log("Server up and running on port 3000")
);