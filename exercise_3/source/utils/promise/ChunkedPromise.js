const Promise = require("./Promise.js");
const QueuedPromiseEvent = require("./../../utils/promise/promiseevent/QueuedPromiseEvent.js");

module.exports = class ChunkedPromise extends Promise{

  constructor(initialStartup){
    var finishCallGivenByPromise,failCallGivenByPromise;
    super((finish,fail) => { finishCallGivenByPromise = finish; failCallGivenByPromise = fail; });
    this.queuedPromiseEvent = new QueuedPromiseEvent();
    initialStartup((argument) => {
      this.queuedPromiseEvent.mustBeCalledWithArgument(argument);
    },(argument) => {
      finishCallGivenByPromise(argument);
    },(argument) => {
      failCallGivenByPromise(argument);
    });
  }

  update(callback){
    if(typeof callback === "function")
      this.queuedPromiseEvent.setCallback(callback);
    return this;
  }

}
