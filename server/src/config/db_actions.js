import db from './db';
import crypt from './crypt';
var handleMongo = db.handleMongo;
import jwt from 'jsonwebtoken';
import secret from './jwt_config';
export default {

    insertUser : function insert(req,res) {
    let password=req.body.users.password;
    let id=crypt.generateHash(req.body.users.email);
    let email=req.body.users.email;
    handleMongo(db.findDoc, "users", { "email": email})
       .then((response)=>{
          if(response!=null&&response.email==email) {
            res.json({email : "This email is already taken" });
          } else {
            handleMongo(db.insertDoc,"users",{"id":id, "email":email,"password":password}).then(function(response){
                res.json({status:"ok"});
          });
        }
    });
    },

    findUser : function findUser(req,res){
    handleMongo(db.findDoc,"users",{"email":req.body.users.email})
                    .then(function(usersResult){
                         if(usersResult!==null&&usersResult["email"]==req.body.users.email&&usersResult["password"]==req.body.users.password) {
                                           const tk=jwt.sign({
                                            id: usersResult.id,
                                            username:usersResult["email"],
                                            isAuthenticated:true
                                         },secret);
                                         res.json({status:"ok",config:tk});
                        }  else {
                          res.json({error:"Not a Valid Email/Password"});
                        }
                    });
    }
}
