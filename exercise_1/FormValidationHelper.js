const EMPTY_STRING = "";

const FormValidationHelperPrototype = FormValidationHelper.prototype;

function FormValidationHelper(){
  this.requiredFields = [];
}

FormValidationHelperPrototype.addRequiredField = function (field) {
  this.requiredFields.push(field);
}

FormValidationHelperPrototype.unsatisifedFields = function () {
  var fields = [];
  for (i = 0; i < this.requiredFields.length; i++)
    if(isEmpty(this.requiredFields[i].value))
      fields.push(this.requiredFields[i]);
  return fields;
}

FormValidationHelperPrototype.isFormSatisfied = function () {
  for (i = 0; i < this.requiredFields.length; i++)
    if(isEmpty(this.requiredFields[i].value))
      return false;
  return true;
}

function isEmpty(string){
  return string.trim() === EMPTY_STRING;
}
