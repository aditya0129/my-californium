const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const app = express();
const moment = require("moment")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://AdityaDB:Addy0129@project1.jxlvbi5.mongodb.net/middleware-1", {
    useNewUrlParser: true},mongoose.set("strictQuery",true))
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use (
    function (req, res, next) {
        let ip= req.ip
        let url= req.originalUrl

        console.log(moment().format('DD-mm-yyyy hh:mm:ss'),ip,url)
        next();
  });

app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
