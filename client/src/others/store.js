let user;
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
