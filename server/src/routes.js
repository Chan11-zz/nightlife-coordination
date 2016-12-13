import db from './config/db';
import db_actions from './config/db_actions';
import validate from './validate';
import getYelp from './config/Yelp';

export default function (app){

    app.post('/signup',validate.validateSignUp,(req,res)=>{
    db_actions.insertUser(req,res);
    });

    app.post('/login',validate.validateLogin,(req,res)=>{
        db_actions.findUser(req,res);
    });

    app.post('/search',(req,res)=>{
        console.log("got search",req.body.search);
        getYelp(req.body.search).then((result)=>{
            res.json(result);
        });
    });

    app.post('/eventsAdd',validate.validateRequest,(req,res)=>{
        console.log(typeof req.body.events);
        let events=req.body.events.split(',');
        console.log(events);
        db.handleMongo(db.insertDoc,"events",{id:events[0],name:events[1],store_id:events[2],city:events[3].toLowerCase()});
        res.status('200').send();
    });

    app.post('/eventsUndo',(req,res)=>{
        console.log("events undo",req.body.events);
         let events=req.body.events.split(',');
        db.handleMongo(db.deleteDoc,"events",{id:events[0],name:events[1]});
        res.status('200').send();
    });

    app.post('/getEvents',(req,res)=>{
        console.log(req.body.search);
        db.handleMongo(db.findDocToArray,"events",{city:req.body.search})
        .then(function(result){
            console.log(result);
            res.json(result);
        });
    });
}
