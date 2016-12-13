import db from '../config/db';
import db_actions from '../config/db_actions';
db.connectMongo();
import validate from './validate';
import getYelp from '../config/Yelp';

export default function (app){
    
    app.post('/signup',validate.validateSignUp,(req,res)=>{
    db_actions.insertUser(req);
       res.json({status:"ok"});
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
    
    app.post('/eventsAdd',(req,res)=>{
        console.log(typeof req.body.events);
        let events=req.body.events.split(',');
        console.log(events);
        db.easyMongo(db.insertDoc,"events",{id:events[0],name:events[1],store_id:events[2],city:events[3].toLowerCase()});
       // db.easyMongo(db.saveDoc,"events",{id:events[0],name:events[1],store_id:events[2],city:events[3]});
       // db.updateDoc({store_id:events[2]},{id:events[0],name:events[1],store_id:events[2],city:events[3],p:1},{"$inc" : {p:1} },"events") //database format: collection.update({<Query>}, {$inc: {<valid filed>:1}});
      //   .then(function(result){
         //    console.log("updated");
        // });
       // db_actions.insertUser(req);
    });
    
    app.post('/eventsUndo',(req,res)=>{
        console.log("events undo",req.body.events);
         let events=req.body.events.split(',');
        db.easyMongo(db.deleteDoc,"events",{id:events[0],name:events[1]});
        //db_actions.insertUser(req);
    });
    
    app.post('/getEvents',(req,res)=>{
        console.log(req.body.search);
        db.easyMongo(db.findDocToArray,"events",{city:req.body.search})
        .then(function(result){
            console.log(result);
            res.json(result);
        });
    });
}


