module.exports = class CreateNewEmployeeUseCaseRequest {

  constructor(firstName,lastName,birthdayDate){
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthdayDate = birthdayDate;
  }

}
