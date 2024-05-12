const catchError = require('../Errors/catch')
const { executeQuery } = require('../models/config')



async function deleteFromCustomer(id) {
    const query = `
        DELETE FROM CUSTOMER
        WHERE _id = '${id}'
    `;
    return executeQuery(query);
}
async function deleteFromSupplier(id) {
    const query = `
        DELETE FROM SUPPLIER
        WHERE _id = '${id}'
    `;
    return executeQuery(query);
}
async function deleteFromRestaurant(id) {
    const query = `
        DELETE FROM RESTAURANT
      WHERE _id = '${id}'
    `;
    return executeQuery(query);
}
async function deleteFromTable(id) {
    const query = `
        DELETE FROM TABLES
        WHERE _id = '${id}'
    `;
    return executeQuery(query);
}
async function deleteFromEmployee(id) {
    const query = `
        DELETE FROM EMPLOYEE
        WHERE _id = '${id}'
    `;
    return executeQuery(query);
}
async function deleteFromOrder(id) {
    const query = `
        DELETE FROM ORDERS
        WHERE _id = '${id}'
    `;
    return executeQuery(query);
}
async function deleteFromFoodItem(item_name) {

    return executeQuery(query);
}



const select = async (tableName, id) => {
    console.log(id)

    if (tableName === 'customer') {
        await deleteFromCustomer(id)
    }
    if (tableName === 'supplier') {

        await deleteFromSupplier(id);
    }
    if (tableName === 'restaurant') {
        await deleteFromRestaurant(id);
    }
    if (tableName === 'tables') {
        await deleteFromTable(id);
    }
    if (tableName === 'employee') {
        await deleteFromEmployee(id);
    }
    if (tableName === 'orders') {
        await deleteFromOrder(id);
    }
    if (tableName === 'menu') {
        await deleteFromFoodItem(id);
    }

}


exports.delteTable = catchError(async (req, res, next) => {
    const { table } = req.body;
    const id = req.params.id;
    await select(table, id);
    const query = `SELECT * FROM ${table}`;
    const data = await executeQuery(query);
    res.status(200).json({ success: true, data })


})





