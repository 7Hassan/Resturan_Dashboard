const express = require('express')
const Router = express.Router()
const { insertTable } = require('../controller/insert')
const { getTable, getColoumn } = require('../controller/get')
const { updateTable } = require('../controller/update')
const { delteTable } = require('../controller/delete')


Router.route('/add')
  .post(insertTable)


Router.route('/get')
  .put(getTable)

  Router.route('/get/:id')
  .put(getColoumn)

Router.route('/update/:id')
  .post(updateTable)

Router.route('/delete/:id')
  .delete(delteTable)

module.exports = Router






