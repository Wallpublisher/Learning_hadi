const EmployeeRecord = require("./../../../source/entities/EmployeeRecord.js");
const Exception = require("./../../exception/Exception.js");

module.exports = class RetrieveAllEmployeesUseCase {

  constructor(employeeRepository,retrieveAllEmployeesUseCaseResponseCollaborator){
    this.employeeRepository = employeeRepository;
    this.retrieveAllEmployeesUseCaseResponseCollaborator = retrieveAllEmployeesUseCaseResponseCollaborator;
  }

  do(){
    this.employeeRepository.readEmployees()
    .then((employeesArray) => {
        this.retrieveAllEmployeesUseCaseResponseCollaborator.reportEmployees(employeesArray);
    })
    .fail((exception) => {
        this.retrieveAllEmployeesUseCaseResponseCollaborator.retrieveAllEmployeesFailed(new Exception("Failed to read employees from database!",exception));
    });
  }

}
