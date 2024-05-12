// mainFile.js

const app = require('./app');
const port = process.env.PORT || 2000;
const express = require('express');
const sql = require('mssql');
const createTablesQueries = require('./models/tables');
const {config} = require('./models/config')

process.on('uncaughtException', (err) => {
  console.error('⛔ ' + err.name, err.message, err.stack)
  process.exit(1)
})

const server = app.listen(port, () => console.log(`✅ app listening on port ${port}`))


app.use(express.urlencoded({ extended: true }));   //for send data to db

app.get('/', (req, res) => {
  res.sendFile("./views/home.html", { root: __dirname })
})


// Middleware to parse JSON requests
app.use(express.json());




sql.connect(config)
  .then(pool => {
    // Execute each CREATE TABLE query separately

    // return Promise.all(createTablesQueries.map(query => {
    //   return pool.request().query(query);
    // }));
  })
  .then(results => {
    console.log('Tables created successfully');
  })
  .catch(err => {
    console.error('Error occurred:', err);
  })
  .finally(() => {
    // Close the SQL connection after completing the necessary operations
    sql.close();
  });





