const catchError = require('../Errors/catch')
const { executeQuery } = require('../models/config')





async function updateSupplier(updates, _id) {
    let setStatements = '';

    // Construct SET statements for each column to be updated
    Object.entries(updates).forEach(([column, value]) => {
        setStatements += `${column} = '${value}', `;
    });

    // Remove the trailing comma and space
    setStatements = setStatements.slice(0, -2);

    const query = `
            UPDATE SUPPLIER
            SET ${setStatements}
            WHERE _id = ${_id}
        `;
    return executeQuery(query);
}
async function updateRestaurant(updates, _id) {
    let setStatements = '';

    // Construct SET statements for each column to be updated
    Object.entries(updates).forEach(([column, value]) => {
        setStatements += `${column} = '${value}', `;
    });

    // Remove the trailing comma and space
    setStatements = setStatements.slice(0, -2);

    const query = `
            UPDATE RESTAURANT
            SET ${setStatements}
            WHERE _id = ${_id}
        `;
    return executeQuery(query);
}
async function updateTable( updates, _id) {
    let setStatements = '';

    // Construct SET statements for each column to be updated
    Object.entries(updates).forEach(([column, value]) => {
        setStatements += `${column} = '${value}', `;
    });

    // Remove the trailing comma and space
    setStatements = setStatements.slice(0, -2);

    const query = `
            UPDATE TABLES
            SET ${setStatements}
            WHERE _id = ${_id}
        `;
    return executeQuery(query);
}
async function updateEmployeer(updates, _id) {
    let setStatements = '';

    // Construct SET statements for each column to be updated
    Object.entries(updates).forEach(([column, value]) => {
        setStatements += `${column} = '${value}', `;
    });

    // Remove the trailing comma and space
    setStatements = setStatements.slice(0, -2);

    const query = `
            UPDATE EMPLOYEE
            SET ${setStatements}
            WHERE _id = ${_id}
        `;
    return executeQuery(query);
}
async function updateOrder(updates, _id) {
    let setStatements = '';

    // Construct SET statements for each column to be updated
    Object.entries(updates).forEach(([column, value]) => {
        setStatements += `${column} = '${value}', `;
    });

    // Remove the trailing comma and space
    setStatements = setStatements.slice(0, -2);

    const query = `
            UPDATE ORDERS
            SET ${setStatements}
            WHERE _id = ${_id}
        `;
    return executeQuery(query);
}
async function updateFoodItem(updates, _id) {
    let setStatements = '';

    // Construct SET statements for each column to be updated
    Object.entries(updates).forEach(([column, value]) => {
        setStatements += `${column} = '${value}', `;
    });

    // Remove the trailing comma and space
    setStatements = setStatements.slice(0, -2);

    const query = `
            UPDATE MENU
            SET ${setStatements}
            WHERE _id = ${_id}
        `;
    return executeQuery(query);
}



async function queryFun(updates, _id) {
      const tableName = updates.table?.toUpperCase();
      delete updates.table;
console.log(updates)
    let setStatements = '';

    // Construct SET statements for each column to be updated
    Object.entries(updates).forEach(([column, value]) => {
        setStatements += `${column} = '${value}', `;
    });

    // Remove the trailing comma and space
    setStatements = setStatements.slice(0, -2);

    const query = `
            UPDATE ${tableName}
            SET ${setStatements}
            WHERE _id = '${_id}'`;
    return executeQuery(query);
}




exports.updateTable = catchError(async (req, res, next) => {
    const id =req.params.id;
 await queryFun( req.body,id);
  res.status(200).json({ success: true })
})