const catchError = require('../Errors/catch')
const { executeQuery } = require('../models/config')


exports.getTable = catchError(async (req, res, next) => {
    const table = req.body.table?.toUpperCase();
    console.log(table)
    const query = `SELECT * FROM ${table}`;
    const data = await executeQuery(query);
    res.status(200).json({ success: true, data })

})

exports.getColoumn = catchError(async (req, res, next) => {
    const id = req.params.id;
    const table = req.body.table?.toUpperCase();
    console.log(table);
    const query = `SELECT * FROM ${table} WHERE _id = '${id}';`;
    const data = await executeQuery(query);
    console.log(data);
    res.status(200).json({ success: true, data})

})