const express = require('express');
const bodyparser = require('body-parser');
const ejs = require('ejs');

const app = express();

// setting it up for view folder so it can look out through views folder
app.set('view engine', 'ejs');

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", function (req, res) {



    var today = new Date();
    var day = "";
    var currentDay = today.getDay();

    switch (currentDay) {
        case 1:
            day = "Monday";
            break;
        case 2:
            day = "Tuesday";
            break;
        case 3:
            day = "Wednesday";
            break;
        case 4:
            day = "Thursday";
            break;
        case 5:
            day = "Friday";
            break;
        case 6:
            day = "Satuarday";
        case 0:
            day = "Sunday";

        default:
            break;
    }


    // render ejs
    res.render("list", { kindOfDay: day });

});



app.listen(process.env.PORT || 3000, function () {
    console.log("server started");
});
