
// init server
const express = require('express');
const app = express();
const cors = require('cors');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

const mssql = require("mssql");
const config = {
        user: 'admin',
        password: 'adminpass',
        server: 'ut1.chy5tpamtaco.us-east-1.rds.amazonaws.com', 
        database: 'dbjuggad'
    };

    // connect to your database
mssql.connect(config, function (err) {
        if (err) throw err;
        if (err) console.log(err)
        console.log('Connected!');
});

const routes = require('./route.js');
routes(app, mssql);

// run server  
app.listen(5011);

console.log("server running");