const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT;
const connection = require('./configration/config.db');
const usersRouter = require('./modules/users/routes/users.route');
const postsRouter = require('./modules/posts/routes/posts.routes');
const advRouter = require('./modules/advertising/routes/adv.routes');
const reportsRouter = require('./modules/reports/router/reports.router');

//middleware to parse the buffer
app.use(express.json());

//connect the mongo DB
connection();

//use the router file from users/posts to get all the end points
app.use(usersRouter);
app.use(postsRouter);
app.use(advRouter);
app.use(reportsRouter);

app.listen(port,()=>{
    console.log(`server is running on port: ${port}!`)
})