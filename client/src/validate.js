import db_actions from '../config/db_actions';

export default {
    
  validateSignUp : (req,res,next)=>{
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
  }
  
};

function isBlank(str){
    return (!str || /^\s*$/.test(str));
}