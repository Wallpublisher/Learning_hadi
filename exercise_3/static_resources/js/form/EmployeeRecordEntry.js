const FIRST_NAME_CLASS = "first_name";
const LAST_NAME_CLASS = "last_name";
const BIRTHDAY_CLASS = "birthday_date";
const SUBMIT_BUTTON_CLASS = "submit_button";
const FIRST_ENCOUNTER = 0;

const RED_COLOR = "red";

class EmployeeRecordEntry {

  constructor(divisionId){
    this.employeeRecordDivision = document.getElementById(divisionId);
    this.fieldsControlHelper = new FieldsControlHelper();
    this.initValidator();
    this.initFields();
  }

  setOnSubmitHandler(handlingFunction){
    this.handler = handlingFunction;
  }

 initFields(){
   this.initFirstNameField();
   this.initLastNameField();
   this.initBirthdayField();
   this.initSubmitButton();
 }

 initValidator(){
   this.validationHelper = new FormValidationHelper();
 }

 initFirstNameField(){
   this.firstNameField = this.employeeRecordDivision.getElementsByClassName(FIRST_NAME_CLASS)[FIRST_ENCOUNTER];
   this.validationHelper.addRequiredField(this.firstNameField);
   this.fieldsControlHelper.addField(this.firstNameField);
  }

 initLastNameField(){
  this.lastNameField = this.employeeRecordDivision.getElementsByClassName(LAST_NAME_CLASS)[FIRST_ENCOUNTER];
  this.validationHelper.addRequiredField(this.lastNameField);
  this.fieldsControlHelper.addField(this.lastNameField);
 }

 initBirthdayField(){
  this.birthdayField = this.employeeRecordDivision.getElementsByClassName(BIRTHDAY_CLASS)[FIRST_ENCOUNTER];
  this.validationHelper.addRequiredField(this.birthdayField);
  this.fieldsControlHelper.addField(this.birthdayField);
 }

 initSubmitButton(){
  var button = this.employeeRecordDivision.getElementsByClassName(SUBMIT_BUTTON_CLASS)[FIRST_ENCOUNTER];
  var objectContext = this;
  button.onclick = function(){objectContext.onSubmitButtonClick()};
 }

 onSubmitButtonClick(){
  if(this.validationHelper.isFormSatisfied())
    this.handleDataAndResetFields();
  else this.markInvalidFieldsWithRed();
 }

 handleDataAndResetFields(){
  this.submitEntryDataToHandler();
  this.fieldsControlHelper.resetFields();
 }

 markInvalidFieldsWithRed(){
  this.fieldsControlHelper.unhighlight();
  this.fieldsControlHelper.highlightFields(this.validationHelper.unsatisifedFields(),RED_COLOR);
 }

 submitEntryDataToHandler(){
  var employeeRecord = new EmployeeRecord(this.firstNameField.value.trim(),
                                          this.lastNameField.value.trim(),
                                          this.birthdayField.value);
  this.handler(employeeRecord);
  }
}
