const HitAndRunPromiseEvent = require("./../../utils/promise/promiseevent/HitAndRunPromiseEvent.js");

module.exports = class Promise{

  constructor(initCall){
    this.thenPromiseEvent = new HitAndRunPromiseEvent();
    this.failPromiseEvent = new HitAndRunPromiseEvent();
    initCall((finishArgument) => {
      this.thenPromiseEvent.mustBeCalledWithArgument(finishArgument);
    },(failArgument) => {
      this.failPromiseEvent.mustBeCalledWithArgument(failArgument);
    });
  }

  then(callback){
    if(typeof callback === "function")
      this.thenPromiseEvent.setCallback(callback);
    return this;
  }

  fail(callback){
    if(typeof callback === "function")
      this.failPromiseEvent.setCallback(callback);
    return this;
  }

}
