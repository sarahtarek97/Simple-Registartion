const mongoose = require('mongoose');

//connect the nodeJS with the mongoDB
const connection = ()=>{
    return mongoose.connect(process.env.CONNECTION_STRING)
    .then((result)=> console.log('db Connected'))
    .catch((err)=>console.log('db not connected',err))
}


//export to use it in app.js
module.exports = connection;