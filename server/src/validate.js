import db_actions from './config/db_actions';
import jwt from 'jsonwebtoken';
import secret from './config/jwt_config';
import db from './config/db';

export default {

  validateSignUp : (req,res,next)=>{
        let errors={},bool=0;

        if(isBlank(req.body.users.email)){
            errors.email="Only real emails are accepted" ;
            bool=1;
        }

        console.log(req.body.users.email,)
        if(!validateEmail(req.body.users.email)){
            errors.email="This email is not valid email" ;
            bool=1;
        }

        if(isBlank(req.body.users.password)){
            errors.password="Not a valid password" ;
            bool=1;
        }
        bool ? res.json(errors) : next();
  } ,

  validateLogin : (req,res,next)=>{
        let errors={},bool=0;
        if(isBlank(req.body.users.email)){
            errors.email="This email is not valid or already in use" ;
            bool=1;
        }
        if(isBlank(req.body.users.password)){
            errors.password="Not a valid password" ;
            bool=1;
        }
        bool ? res.json(errors) : next();
  },

  validateRequest : (req,res,next)=>{
    console.log("in validateRequest",req.headers.authorization);
    var token = req.headers.authorization.split(' ')[1];

      var decoded = jwt.verify(token, secret);
      console.log("in validateRequest",decoded.id);
      if(!decoded) res.json({error:"not authorized"});
      db.handleMongo(db.findDoc,"users",{"id":decoded.id})
        .then((usersResult)=>{
          //console.log("checking headers1",usersRes)
          console.log("checking headers",usersResult["email"],decoded.username,"-",usersResult["id"],decoded.id);
          console.log("checking headers",usersResult["email"]==decoded.username&&usersResult["id"]==decoded.id);
          if(!usersResult) res.json({error:"not authorized"});
          if(usersResult["email"]==decoded.username&&usersResult["id"]==decoded.id) res.json({error:false});
        });

      //next();
      //return authFail(res);
  /*  if(!decoded || decoded.auth !== 'magic') {
      return authFail(res);
    } *///else {
    //  return privado(res, token);
  //  }
  }

};

function isBlank(str){
    return (!str || /^\s*$/.test(str));
}

function validateEmail(email)
{
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}
