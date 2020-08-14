const express = require("express");
const app = express();
const bodyParser = require('body-parser'); 
const mongoose = require("mongoose");
const morgan = require("morgan");



mongoose.connect(
    'mongodb+srv://'+process.env.MONGO_DB_USER+':'+process.env.MONGO_DB_PASS+'@cluster0.hqpzb.mongodb.net/'+process.env.MONGO_DB_NAME+'?retryWrites=true&w=majority',
    {   useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .then(
        ()=>{
            console.log('Connected To The Data Base')
        },
        err =>{
            
        })

        
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

//Removed On production
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
  });


const AllRoures= require('./API/routes'); 
app.use('/api', AllRoures);


app.use(express.static('public'));

app.use((req, res) => {
    res.status(404).redirect("/#/404")
})



module.exports = app;