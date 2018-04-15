const isValidInputForAddingEmployee = require("./isValidInputForAddingEmployee.js");

module.exports = class CreateNewEmployeeController {

  constructor(createNewEmployeeUseCase){
    this.createNewEmployeeUseCase = createNewEmployeeUseCase;
  }

  handInToUseCase(givenObject){
      if(isValidInputForAddingEmployee(givenObject))
        this.createNewEmployeeUseCase.do(givenObject);
      else throw new Error("Given data is invalid for creating a new employee.");
  }

}
