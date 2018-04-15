var employeeTable;
var employeeDatabase;

const DATABASE_NAME = "employeeRecords";
const RECORD_ENTRY_ID = "employee_record_entry";
const EMPLOYEE_HTML_TABLE_ID = "employee_table";
const DONE = 4;
const HTTP_SUCCESS = 200;

window.onload = init;


function init(){
  employeeTable = new EmployeeTable(EMPLOYEE_HTML_TABLE_ID);
  retrieveEmployeeRecords()
  .then(loadEmployeesToTable)
  .fail(alertFromError);
}

function loadEmployeesToTable(employeeRecords){
  for(var index = 0; index < employeeRecords.length;index++)
      employeeTable.addEmployeeRecord(employeeRecords[index]);
}

function alertFromError(error){
  alert(error.message);
}
