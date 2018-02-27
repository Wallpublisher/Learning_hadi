const INITIAL_COLOR = "initial";

const FieldsControlHelperPrototype = FieldsControlHelper.prototype;

function FieldsControlHelper(){
  this.formFields = [];
}

FieldsControlHelperPrototype.addField = function(field){
  this.formFields.push(field);
}

FieldsControlHelperPrototype.resetFields = function () {
  this.unhighlight();
  this.clearFieldsForNewInput();
}

FieldsControlHelperPrototype.highlight = function(color){
  highlight(this.formFields,color);
}

FieldsControlHelperPrototype.unhighlight = function(){
  highlight(this.formFields,INITIAL_COLOR);
}

function highlight(fields,color) {
  for (i = 0; i < fields.length; i++)
      highlightField(fields[i],color);
}

function highlightField (field,color) {
    field.style.backgroundColor = color;
}

FieldsControlHelperPrototype.clearFieldsForNewInput = function(){
  for (i = 0; i < this.formFields.length; i++)
    this.formFields[i].value = EMPTY_STRING;
}
