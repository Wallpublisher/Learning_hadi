var employeeTable;
var employeeDatabase;

const DATABASE_NAME = "employeeRecords";
const RECORD_ENTRY_ID = "employee_record_entry";
const EMPLOYEE_HTML_TABLE_ID = "employee_table";

window.onload = init;

function loadPersistentDataInsideTableIfAvailable(){
      while(!employeeDatabase.reachedEnd())
        employeeTable.addEmployeeRecord(employeeDatabase.nextObject());
}

function addEmployeeRecordToEmployeeTable(employeeRecord){
  employeeDatabase.addItem(employeeRecord);
  employeeTable.addEmployeeRecord(employeeRecord);
}

function init(){
  employeeTable = new EmployeeTable(EMPLOYEE_HTML_TABLE_ID);
  employeeDatabase = new LocalStorageDatabase(DATABASE_NAME);
  loadPersistentDataInsideTableIfAvailable();
  var employeeRecordEntry = new EmployeeRecordEntry(RECORD_ENTRY_ID);
  employeeRecordEntry.setOnSubmitHandler(addEmployeeRecordToEmployeeTable);
}
