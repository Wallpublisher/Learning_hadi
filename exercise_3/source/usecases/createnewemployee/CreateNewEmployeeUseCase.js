const EmployeeRecord = require("./../../../source/entities/EmployeeRecord.js");
const Exception = require("./../../exception/Exception.js");

module.exports = class CreateNewEmployeeUseCase{

  constructor(employeeRepository,createNewEmployeeUseCaseResponseCollaborator){
    this.employeeRepository = employeeRepository;
    this.createNewEmployeeUseCaseResponseCollaborator = createNewEmployeeUseCaseResponseCollaborator;
  }

  do(createNewEmployeeRequest){
    this.employeeRepository.writeEmployee(
        new EmployeeRecord(createNewEmployeeRequest.firstName,createNewEmployeeRequest.lastName,createNewEmployeeRequest.birthdayDate))
    .then(() => {this.createNewEmployeeUseCaseResponseCollaborator.operationSuccess();})
    .fail((exception) => {
      this.createNewEmployeeUseCaseResponseCollaborator.operationFailedServerError(new Exception("Failed to write to database!",exception));
    });
  }

}
