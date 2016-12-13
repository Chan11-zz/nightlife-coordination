import Yelp from 'node-yelp-fusion';
var key=process.env.YELP_KEY;
var secret=process.env.YELP_SECRET;
var yelp=new Yelp({ id:key , secret:secret });
export default (term)=>{
    return new Promise((resolve,reject)=>{
        yelp.search(`term=Bar&location=${term}`)
        .then((result)=>{
           resolve(result);
        })
        .catch((err)=>{
            reject(err);
        });
    });
};
