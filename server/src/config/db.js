
import mongodb from 'mongodb';
import url from 'url';
var MongoClient=mongodb.MongoClient;
var db=null;
let mlab =process.env.MONGOLAB_URI;
var connectMongo=function(){
  MongoClient.connect(mlab,function(err,_db){
    console.log("sjnfkejnrf",url.parse(mlab));

    if (err) {
    //console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', mlab);
    db=_db;//stores db instance of mongoclient in variable db
}
  });
};


function insertDoc(doc,collection){
    return new Promise(function(resolve,reject){
        collection.insert(doc,function(err,res){
        if(err){
            console.log("error finding document");
            reject(err);
        } else {
            console.log("in insertDoc");
            resolve(res);
        }
    });
    });
  }

function findDoc(doc,collection){

    return new Promise(function(resolve,reject){
        collection.findOne(doc,function(err,res){
        if(err){
            console.log("error finding document");
            reject(err);
        } else {
            console.log("in findDoc");
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
            console.log("error finding document");
            reject(err);
        } else {
            console.log("in updateDoc");
            console.log(res);
            resolve(res);
        }
    });
    });
}



function findDocToArray(doc,collection){

    return new Promise(function(resolve,reject){
        collection.find(doc).toArray(function(err,res){
        if(err){
            console.log("error finding document");
            reject(err);
        } else {
            console.log("in findDoc");
            console.log(res);
            resolve(res);
        }
    });
    });
}

function saveDoc(doc,collection){

    return new Promise(function(resolve,reject){
        collection.save(doc,function(err,res){
        if(err){
            console.log("error finding document");
            reject(err);
        } else {
            console.log("in findDoc");
            console.log(res);
            resolve(res);
        }
    });
    });
}

function deleteDoc(doc,collection){
    return new Promise(function(resolve,reject){
        collection.remove(doc,function(err,res){
        if(err){
            //console.log("error deleting document");
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
            //console.log("error deleting document");
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
      console.log("result from handleMongo");
     resolve(result);
   });

});

};

var closeMongo=function(){
    db.close();
    //console.log("Mongo Closed");
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
