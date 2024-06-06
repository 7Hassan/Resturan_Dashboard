const catchError = require('../Errors/catch')
const { executeQuery } = require('../models/config')

const { v4: uuidv4 } = require('uuid');







// Function to insert data into the CUSTOMER table
async function insertCustomer(_id, cusID, cusName, cusEmail, phoneNo) {
  const query = `
    INSERT INTO CUSTOMER (_id,Cus_ID, Cus_Name, Cus_Email, Phone_No)
    VALUES ('${_id}', '${cusID}', '${cusName}', '${cusEmail}', '${phoneNo}')
  `;
  return executeQuery(query);
}

// Function to insert data into the SUPPLIER table
async function insertSupplier(_id, supplierID, name, phoneNo, supplyingItem) {
  const query = `
    INSERT INTO SUPPLIER (_id,Supplier_ID, Name, Phone_No, Suppling_item)
    VALUES ('${_id}', '${supplierID}', '${name}', '${phoneNo}', '${supplyingItem}')
  `;
  return executeQuery(query);
}

// Function to insert data into the RESTAURANT table
async function insertRestaurant(_id, resID, name, address, phoneNo, supplierID) {
  const query = `
    INSERT INTO RESTAURANT (_id,Res_ID, Name, Address, Phone_No, Supplier_ID)
    VALUES ('${_id}', '${resID}', '${name}', '${address}', '${phoneNo}', '${supplierID}')
  `;
  return executeQuery(query);
}

// Function to insert data into the TABLES table
async function insertTable(_id, tableID, capacity, status, resID) {
  const query = `
    INSERT INTO TABLES (_id,Table_ID, Capacity, Status, Res_ID)
    VALUES ('${_id}', '${tableID}', ${capacity}, ${status}, '${resID}')
  `;
  return executeQuery(query);
}

// Function to insert data into the EMPLOYEE table
async function insertEmployee(_id, empID, name, salary, phoneNo, jobName, resID) {
  const query = `
    INSERT INTO EMPLOYEE (_id,Emp_ID, Name, Salary, Phone_No, Job_Name, Res_ID)
    VALUES ('${_id}', '${empID}', '${name}', ${salary}, '${phoneNo}', '${jobName}', '${resID}')
  `;
  return executeQuery(query);
}

// Function to insert data into the ORDERS table
async function insertOrder(_id, orderID, total, cusID, tableID, empID) {
  const query = `
    INSERT INTO ORDERS (_id,Order_ID, Total, Cus_ID, Table_ID, Emp_ID)
    VALUES ('${_id}', '${orderID}', ${total}, ${cusID}, ${tableID}, ${empID})
  `;
  return executeQuery(query);
}

// Function to insert data into the FOOD_ITEM table
async function insertFoodItem(_id, itemName, description, price, orderID) {
  const query = `
    INSERT INTO MENU (_id,menu, Description, Price, Order_ID)
    VALUES ('${_id}','${itemName}', '${description}', ${price}, '${orderID}')
  `;
  return executeQuery(query);
}

const select = async (data) => {
  const tableName = data.table;
  const _id = uuidv4();
  if (tableName === 'customer') {
    const { cusID, cusName, cusEmail, phoneNo } = data
    await insertCustomer(_id, cusID, cusName, cusEmail, phoneNo)
  }
  if (tableName === 'supplier') {
    const { supplierID, name, phoneNo, supplyingItem } = data;
    await insertSupplier(_id, supplierID, name, phoneNo, supplyingItem);
  }
  if (tableName === 'restaurant') {
    const { Res_ID, Name, Address, Phone_No, Supplier_ID } = data;
    await insertRestaurant(_id, Res_ID, Name, Address, Phone_No, Supplier_ID);
  }
  if (tableName === 'tables') {
    const { Table_ID, Capacity, Status, Res_ID } = data;
    await insertTable(_id, Table_ID, Capacity, Status, Res_ID);
  }
  if (tableName === 'employee') {
    const { empID, name, salary, phoneNo, jobName, resID } = data;
    await insertEmployee(_id, empID, name, salary, phoneNo, jobName, resID);
  }
  if (tableName === 'orders') {
    const { Order_ID, Total, Cus_ID, Table_ID, Emp_ID } = data;
    await insertOrder(_id, Order_ID, Total, Cus_ID, Table_ID, Emp_ID);
  }
  if (tableName === 'menu') {
    const { Item_Name, Description, Price, Order_ID } = data;
    await insertFoodItem(_id, Item_Name, Description, Price, Order_ID);
  }

}

exports.insertTable = catchError(async (req, res, next) => {
  const tableName = req.body.table?.toUpperCase()
  const query = `SELECT * FROM ${tableName}`;
  await select(req.body)
  const data = await executeQuery(query);
  res.status(200).json({ success: true, data })



})