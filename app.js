const express = require('express');
const bodyparser = require('body-parser');
const ejs = require('ejs');
const date = require(__dirname + '/date.js');

// let item = [];
let workItem = [];
let day = date.getDate();


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


var ListSchema = new Schema({
    name: String,
    items: [TodoSchema]
});

var ListModel = mongoose.model("lists", ListSchema);



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
   

    todoModel.find(function (err, result) {
        if (err) {
            console.log(err);
        } else {
            // render ejs
            res.render("list", { kindOfDay: day, newItem: result });
        }
    });



});

app.get("/:listtitle", function (req, res) {

    let customeListName = req.params.listtitle;

   

    ListModel.findOne({name: customeListName}, function (err, foundList) { 
        if(!err){
            if(!foundList){
                const lists = new ListModel({
                    name:customeListName,
                    items:defaultArr 
                });
                lists.save();
                res.redirect("/"+customeListName);
            }else{
                
                res.render("list",{kindOfDay:foundList.name, newItem:foundList.items});
            }
        }else{
            console.log(err);
        }
     })
        
 




    // res.render("list", { kindOfDay: customeListName, newItem: workItem });
})


app.post("/", function (req, res) {

    let itemz = req.body.task;
    let listname = req.body.posting;

    const item = new todoModel({
        name: itemz
    })

    

 
        item.save();
        // item.push(items);
        res.redirect("/");
    


});

app.post("/delete", function (req, res) { 

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
