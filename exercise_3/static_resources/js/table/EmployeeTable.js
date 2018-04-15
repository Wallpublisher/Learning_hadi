const TABLE_ROW_TAG = "tr";
const TABLE_DATA_CELL_TAG = "td";

class EmployeeTable {

  constructor(tableId){
    this.domTable = document.getElementById(tableId);
  }

  addEmployeeRecord(employeeRecord){
    var tableRow = document.createElement(TABLE_ROW_TAG);
    tableRow.appendChild(createNewColumnFieldFor(employeeRecord.firstName));
    tableRow.appendChild(createNewColumnFieldFor(employeeRecord.lastName));
    tableRow.appendChild(createNewColumnFieldFor(employeeRecord.birthdayDate));
    this.domTable.appendChild(tableRow);
  }

}

function createNewColumnFieldFor(text){
  var tableDataCell = document.createElement(TABLE_DATA_CELL_TAG);
  var textNode = document.createTextNode(text);
  tableDataCell.appendChild(textNode);
  return tableDataCell;
}
