
import mongodb from 'mongodb';
import url from 'url';
var MongoClient=mongodb.MongoClient;
var db=null;
let mlab =process.env.MONGOLAB_URI;
var connectMongo=function(){
  MongoClient.connect(mlab,function(err,_db){
    if (err) {
    //console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    db=_db;//stores db instance of mongoclient in variable db
}
  });
};


function insertDoc(doc,collection){
    return new Promise(function(resolve,reject){
        collection.insert(doc,function(err,res){
        if(err){
            reject(err);
        } else {
            resolve(res);
        }
    });
    });
  }

function findDoc(doc,collection){

    return new Promise(function(resolve,reject){
        collection.findOne(doc,function(err,res){
        if(err){
            reject(err);
        } else {
            resolve(res);
        }
    });
    });
}

function updateDoc(doc1,doc2,doc3,collectionString){
    var dbCollection=db.collection(collectionString);
    return new Promise(function(resolve,reject){
        dbCollection.update(doc1,doc2,doc3,function(err,res){
        if(err){
            reject(err);
        } else {
            resolve(res);
        }
    });
    });
}



function findDocToArray(doc,collection){

    return new Promise(function(resolve,reject){
        collection.find(doc).toArray(function(err,res){
        if(err){
            reject(err);
        } else {
            resolve(res);
        }
    });
    });
}

function saveDoc(doc,collection){

    return new Promise(function(resolve,reject){
        collection.save(doc,function(err,res){
        if(err){
            reject(err);
        } else {
            resolve(res);
        }
    });
    });
}

function deleteDoc(doc,collection){
    return new Promise(function(resolve,reject){
        collection.remove(doc,function(err,res){
        if(err){
            reject(err);
        } else {
            resolve(res);
        }
    });
    });
}

function findAndModify(doc,collection){
    return new Promise(function(resolve,reject){
        collection.findAndModify(doc,function(err,res){
        if(err){
            reject(err);
        } else {
            resolve(res);
        }
    });
    });
}


var handleMongo=function(work,appCollection,doc){//root function which handles db operations

return new Promise(function(resolve,result){

   var collection=db.collection(appCollection);

        work(doc,collection,db).then(function(result){
         resolve(result);
       });

     });

};

var closeMongo=function(){
    db.close();
};
module.exports={
    connectMongo:connectMongo,
    insertDoc:insertDoc,
    deleteDoc:deleteDoc,
    findDoc:findDoc,
    handleMongo:handleMongo,
    closeMongo:closeMongo,
    findDocToArray:findDocToArray,
    updateDoc:updateDoc,
    saveDoc:saveDoc,
    findAndModify:findAndModify
};
