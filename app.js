const express = require('express');
const bodyparser = require('body-parser');
const ejs = require('ejs');
const date = require(__dirname+'/date.js');

const app = express();

let item = [];
// setting it up for view folder so it can look out through views folder
app.set('view engine', 'ejs');

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("public"));




app.get("/", function (req, res) {

   let day = date.getDate();

    // render ejs
    res.render("list", { kindOfDay: day, newItem: item });

});

app.post("/", function (req, res) {

    let items = req.body.task;

    
    item.push(items);
    

    res.redirect("/");

});





app.listen(process.env.PORT || 3000, function () {
    console.log("server started");
});
