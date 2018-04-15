const INITIAL_COLOR = "initial";

class FieldsControlHelper {

  constructor(){
    this.formFields = [];
  }

  addField(field){
    this.formFields.push(field);
  }

  resetFields() {
    this.unhighlight();
    this.clearFieldsForNewInput();
  }

  highlight(color){
    this.highlightFields(this.formFields,color);
  }

  unhighlight(){
    this.highlightFields(this.formFields,INITIAL_COLOR);
  }

  highlightFields(fields,color) {
    for (var i = 0; i < fields.length; i++)
        this.highlightField(fields[i],color);
  }

  highlightField(field,color) {
    field.style.backgroundColor = color;
  }

  clearFieldsForNewInput(){
    for (var i = 0; i < this.formFields.length; i++)
      this.formFields[i].value = EMPTY_STRING;
  }

}
