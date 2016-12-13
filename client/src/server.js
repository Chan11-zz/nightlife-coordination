import express from 'express';
import path from 'path';

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config.dev.js';

import bodyParser from 'body-parser';

let app =  express();
app.set('port',process.env.PORT||3000);

app.use(bodyParser.json());

import routes from './routes.js';
routes(app);



app.use(webpackMiddleware(webpack(webpackConfig)))

app.use(express.static(path.join(__dirname,"/public")));;


app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,"index.html"));
});

app.listen(app.get('port'));