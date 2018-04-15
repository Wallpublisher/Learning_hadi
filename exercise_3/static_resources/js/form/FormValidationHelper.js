const EMPTY_STRING = "";

class FormValidationHelper {

  constructor(){
    this.requiredFields = [];
  }

  addRequiredField(field) {
    this.requiredFields.push(field);
  }

  unsatisifedFields() {
    var fields = [];
    for (var i = 0; i < this.requiredFields.length; i++)
      if(this.isEmpty(this.requiredFields[i].value))
        fields.push(this.requiredFields[i]);
      return fields;
  }

  isFormSatisfied() {
    for (var i = 0; i < this.requiredFields.length; i++)
      if(this.isEmpty(this.requiredFields[i].value))
        return false;
      return true;
    }

  isEmpty(string){
      return string.trim() === EMPTY_STRING;
  }

}
