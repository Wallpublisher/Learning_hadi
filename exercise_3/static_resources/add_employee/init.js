var employeeTable;

const RECORD_ENTRY_ID = "employee_record_entry";
const EMPLOYEE_HTML_TABLE_ID = "employee_table";
const DONE = 4;
const HTTP_SUCCESS = 200;

window.onload = init;

function sendEmployeeRecordToServer(employeeRecord){
  return new Promise((finish,fail) => {
    asyncHttpRequest = new ASyncHttpRequest("POST",document.location.origin+"/api/new");
    asyncHttpRequest.submit(JSON.stringify(employeeRecord))
    .then((response) => {
      var result = JSON.parse(response.body);
      if(result.status === "success")
        finish();
      else if(result.status === "failure")
        fail(new Error("Failed to add employee."));
    }).fail((error) => {
      fail(error);
    });
  });
}

function addSentEmployeeRecordToEmployeeTable(employeeRecord){
  sendEmployeeRecordToServer(employeeRecord)
  .then(() => {
    alert("New employee created successfully.");
    employeeTable.addEmployeeRecord(employeeRecord);
  }).fail(alertFromError);
}

function loadEmployeesToTable(employeeRecords){
  for(var index = 0; index < employeeRecords.length;index++)
      employeeTable.addEmployeeRecord(employeeRecords[index]);
}

function alertFromError(error){
  alert(error.message);
}

function init(){
  employeeTable = new EmployeeTable(EMPLOYEE_HTML_TABLE_ID);
  employeeRecordEntry = new EmployeeRecordEntry(RECORD_ENTRY_ID);
  retrieveEmployeeRecords()
  .then(loadEmployeesToTable)
  .fail(alertFromError);
  employeeRecordEntry.setOnSubmitHandler(addSentEmployeeRecordToEmployeeTable);
}
