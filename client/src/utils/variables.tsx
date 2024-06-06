

export const url = 'http://192.168.124.90:2000';
export const grades = ["supplier", "restaurant", "employee", "tables", "customer", "orders", "menu"];
export const days = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];


export const select = (grade) => {
  let formFields;
  switch (grade) {
    case 'customer':
      formFields = [
        { name: 'cusID', type: 'text', placeholder: 'Customer ID' },
        { name: 'cusName', type: 'text', placeholder: 'Customer Name' },
        { name: 'cusEmail', type: 'email', placeholder: 'Customer Email' },
        { name: 'phoneNo', type: 'tel', placeholder: 'Phone Number' }
      ];
      break;
    case 'supplier':
      formFields = [
        { name: 'supplierID', type: 'text', placeholder: 'Supplier ID' },
        { name: 'name', type: 'text', placeholder: 'Name' },
        { name: 'phoneNo', type: 'tel', placeholder: 'Phone Number' },
        { name: 'supplyingItem', type: 'text', placeholder: 'Supplying Item' }
      ];
      break;
    case 'restaurant':
      formFields = [
        { name: 'Res_ID', type: 'text', placeholder: 'Restaurant ID' },
        { name: 'Name', type: 'text', placeholder: 'Name' },
        { name: 'Address', type: 'text', placeholder: 'Address' },
        { name: 'Phone_No', type: 'tel', placeholder: 'Phone Number' },
        { name: 'Supplier_ID', type: 'text', placeholder: 'Supplier ID' }
      ];
      break;
    case 'tables':
      formFields = [
        { name: 'Table_ID', type: 'text', placeholder: 'Table ID' },
        { name: 'Capacity', type: 'number', placeholder: 'Capacity' },
        { name: 'Status', type: 'number', placeholder: 'Status' },
        { name: 'Res_ID', type: 'text', placeholder: 'Restaurant ID' }
      ];
      break;
    case 'employee':
      formFields = [
        { name: 'Emp_ID', type: 'text', placeholder: 'Employee ID' },
        { name: 'Name', type: 'text', placeholder: 'Name' },
        { name: 'Salary', type: 'number', placeholder: 'Salary' },
        { name: 'Phone_No', type: 'tel', placeholder: 'Phone Number' },
        { name: 'Job_Name', type: 'text', placeholder: 'Job Name' },
        { name: 'Res_ID', type: 'text', placeholder: 'Restaurant ID' }
      ];
      break;
    case 'orders':
      formFields = [
        { name: 'Order_ID', type: 'text', placeholder: 'Order ID' },
        { name: 'Total', type: 'number', placeholder: 'Total' },
        { name: 'Cus_ID', type: 'text', placeholder: 'Customer ID' },
        { name: 'Table_ID', type: 'text', placeholder: 'Table ID' },
        { name: 'Emp_ID', type: 'text', placeholder: 'Employee ID' }
      ];
      break;
    case 'menu':
      formFields = [
        { name: 'Item_Name', type: 'text', placeholder: 'Item Name' },
        { name: 'Description', type: 'text', placeholder: 'Description' },
        { name: 'Price', type: 'number', placeholder: 'Price' },
        { name: 'Order_ID', type: 'text', placeholder: 'Order ID' }
      ];
      break;
    default:
      formFields = [];
  }
  return formFields;

}

