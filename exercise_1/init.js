var employeeTable;

const RECORD_ENTRY_ID = "employee_record_entry";
const EMPLOYEE_HTML_TABLE_ID = "employee_table";

window.onload = init;

function addEmployeeRecordToEmployeeTable(employeeRecord){
  employeeTable.addEmployeeRecord(employeeRecord);
}

function init(){
  employeeTable = new EmployeeTable(EMPLOYEE_HTML_TABLE_ID);
  var employeeRecordEntry = new EmployeeRecordEntry(RECORD_ENTRY_ID);
  employeeRecordEntry.setOnSubmitHandler(addEmployeeRecordToEmployeeTable);
}
