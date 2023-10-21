 const express = require('express');
 const notesRouter = require('./notes');
 const htmlRouter = require('./html');

 const app = express()


 //get api/notes should read the db.json and return all saved notes as JSON
 app.use('/api/notes', notesRouter);
 app.use(htmlRouter)

 module.exports = app;