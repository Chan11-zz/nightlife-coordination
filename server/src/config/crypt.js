import bcrypt from 'bcrypt-nodejs';
let userPassword=null;
export default {
    generateHash: (password)=>{
            return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
        },
    validPassword : (password,a)=>{
            console.log(password,a);
            return bcrypt.compareSync(password,a);
    },
    setPassword : (password)=>{
        userPassword=password;
    },
    getPassword: (password)=>{
      return userPassword;
    }
 };
