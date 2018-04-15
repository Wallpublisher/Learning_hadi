module.exports = class EmployeeRecord {

  constructor(firstName,lastName,birthdayDate){
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthdayDate = birthdayDate;
  }

  static compare(firstEmployee,secondEmployee){
    if(firstEmployee.firstName === secondEmployee.firstName &&
       firstEmployee.lastName === secondEmployee.lastName &&
        firstEmployee.birthdayDate === secondEmployee.birthdayDate)
        return true;
    else return false;
  }

}
