module.exports = isValidInputForAddingEmployee;

Object.prototype.entryCount = function () {
  return Object.keys(this).length;
};

function isValidInputForAddingEmployee(obj){
  if(!(obj.entryCount() === 3) ||
     !hasRequiredProperties(obj))
     return false;
  else return true;
}

function hasRequiredProperties(obj){
  return obj.hasOwnProperty("firstName") &&
         obj.hasOwnProperty("lastName") &&
         obj.hasOwnProperty("birthdayDate");
}
