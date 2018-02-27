const FIRST_NAME_CLASS = "first_name";
const LAST_NAME_CLASS = "last_name";
const BIRTHDAY_CLASS = "birthday_date";
const SUBMIT_BUTTON_CLASS = "submit_button";
const FIRST_ENCOUNTER = 0;

const RED_COLOR = "red";

const EmployeeRecordEntryPrototype = EmployeeRecordEntry.prototype;

function EmployeeRecordEntry(divisionId){
  this.employeeRecordDivision = document.getElementById(divisionId);
  this.fieldsControlHelper = new FieldsControlHelper();
  initValidator.call(this);
  initFields.call(this);
}

EmployeeRecordEntryPrototype.setOnSubmitHandler = function(handlingFunction){
  this.handler = handlingFunction;
}

function initFields(){
  initFirstNameField.call(this);
  initLastNameField.call(this);
  initBirthdayField.call(this);
  initSubmitButton.call(this);
}

function initValidator(){
  this.validationHelper = new FormValidationHelper();
}

function initFirstNameField(){
  this.firstNameField = this.employeeRecordDivision.getElementsByClassName(FIRST_NAME_CLASS)[FIRST_ENCOUNTER];
  this.validationHelper.addRequiredField(this.firstNameField);
  this.fieldsControlHelper.addField(this.firstNameField);
}

function initLastNameField(){
  this.lastNameField = this.employeeRecordDivision.getElementsByClassName(LAST_NAME_CLASS)[FIRST_ENCOUNTER];
  this.validationHelper.addRequiredField(this.lastNameField);
  this.fieldsControlHelper.addField(this.lastNameField);
}

function initBirthdayField(){
  this.birthdayField = this.employeeRecordDivision.getElementsByClassName(BIRTHDAY_CLASS)[FIRST_ENCOUNTER];
  this.validationHelper.addRequiredField(this.birthdayField);
  this.fieldsControlHelper.addField(this.birthdayField);
}

function initSubmitButton(){
  var button = this.employeeRecordDivision.getElementsByClassName(SUBMIT_BUTTON_CLASS)[FIRST_ENCOUNTER];
  var objectContext = this;
  button.onclick = function(){onSubmitButtonClick.call(objectContext)};
}

function onSubmitButtonClick(){
  if(this.validationHelper.isFormSatisfied())
    handleDataAndResetFields.call(this);
  else markInvalidFieldsWithRed.call(this);
}

function handleDataAndResetFields(){
    submitEntryDataToHandler.call(this);
    this.fieldsControlHelper.resetFields();
}

function markInvalidFieldsWithRed(){
  this.fieldsControlHelper.unhighlight();
  highlight(this.validationHelper.unsatisifedFields(),RED_COLOR);
}

function submitEntryDataToHandler(){
  var employeeRecord = new EmployeeRecord(this.firstNameField.value.trim(),
                                          this.lastNameField.value.trim(),
                                          new Date(this.birthdayField.value).toDateString());
  this.handler(employeeRecord);
}
