import express from 'express';
import path from 'path';
import db from './config/db';
db.connectMongo();

import bodyParser from 'body-parser';

var app =  express();
app.set('port',process.env.PORT||9000);
app.use(express.static(path.join(__dirname,'./build')));
app.use(bodyParser.json());

import routes from './routes.js';
routes(app);


app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, './build', 'index.html'));
});

app.listen(app.get('port'),()=>{
  //console.log("app running at "+app.get('port'));
});
