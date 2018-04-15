module.exports = class ArrayComparer {

  constructor(oneToOneComparingFunction){
    this.comparingFunction = oneToOneComparingFunction;
  }

  areEqual(firstArray,secondArray){
    if(firstArray.length != secondArray.length)
      return false;
    for(var i = 0;i < firstArray.length;i++)
      if(!this.comparingFunction(firstArray[i],secondArray[i]))
        return false;
    return true;
  }

}
