const express = require('express');
const bodyparser = require('body-parser');
const ejs = require('ejs');
const date = require(__dirname + '/date.js');

// let item = [];
let workItem = [];


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/TODOlistDB');

const app = express();


var Schema = mongoose.Schema;

var TodoSchema = new Schema({

    name: String
});

// Compile model from schema
var todoModel = mongoose.model('item', TodoSchema);

const item1 = new todoModel({
    name: "Web Development"
});

const item2 = new todoModel({
    name: "GFG CPI"
});

const item3 = new todoModel({
    name: "Android Development"
});


let defaultArr = [item1, item2, item3];

// todoModel.insertMany(defaultArr, function (err) { 
//     if(err){
//         console.log(err);
//     }else{
//         console.log("successfully todo list items added");
//     }
//  });






// setting it up for view folder so it can look out through views folder
app.set('view engine', 'ejs');

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("public"));




app.get("/", function (req, res) {
    let day = date.getDate();

    todoModel.find(function (err, result) {
        if (err) {
            console.log(err);
        } else {
            // render ejs
            res.render("list", { kindOfDay: day, newItem: result });
        }
    });



});

app.get("/work", function (req, res) {

    res.render("list", { kindOfDay: "Work", newItem: workItem });
})


app.post("/", function (req, res) {

    let items = req.body.task;

    if (req.body.posting === "Work") {
        workItem.push(items);
        res.redirect("/work");
    } else {
        console.log(req.body);
        const item = new todoModel({
            name: items
        })
        item.save();
        // item.push(items);
        res.redirect("/");
    }


});

app.post("/delete", function (req, res) { 
    console.log(req.body.check);
    let itemId = req.body.check;

    todoModel.deleteOne({_id: itemId}, function (err) { 
        if(err){
            console.log(err);
        }
        res.redirect("/");
     })

 });






app.listen(process.env.PORT || 3000, function () {
    console.log("server started");
});
