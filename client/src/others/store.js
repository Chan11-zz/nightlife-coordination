let user,m=0;
class User {
    constructor(){
        this.id=null;
        this.username=null;
        this.isAuthenticated=false;
        this.events =null;
        this.attendedEvents=null;
        this.othersEvents=null;
    }
}

var getUser=function getUser(){
    if(!user){
     user=new User();
     m++;
     console.log("user was created" + m + "times");
    }
        return user;
    };
var setUser=function setUser(data){
    user.id=data.id;
    user.username=data.username;
    user.isAuthenticated=data.isAuthenticated;
    //return user;
    };
var setUserEvents=function setUserEvents(events){
    user.events=events;
    //return user;
};
var setOthersEvents=function setOthersEvents(events){
    user.othersEvents=events;
};
var emptyUser=function emptyUser(){
    user.id=null;
    user.username=null;
    user.isAuthenticated=false;
    user.events =null;   
    user._handleLogout();
    };

export default {
        getUser : getUser,
        setUser : setUser,
        emptyUser : emptyUser,
        setUserEvents: setUserEvents,
        setOthersEvents: setOthersEvents
}; 
/*
let user,empty="clear";
class User {
    constructor(data){
        this.id=data.id;
        this.username=data.username;
        this.isAuthenticated=data.isAuthenticated;
        this.events =[];
    }
}

function createUser(data){
    user = new User(data);
    return user;
}



export default function getUser(data){
    if(!user && !data){
        console.log("userDetails updated to:",false);
          return {isAuthenticated : false};
    } else if(!user || data==={}) {
            createUser(data); // if no user is created,then it creates one
        } else {
        return user; // if already created ,just returns user
    }
}
*/