module.exports = class QueuedPromiseEvent {

  constructor(){
    this.argumentsQueue = [];
  }

  mustBeCalledWithArgument(argument){
    if(this.wasEventCallbackSet())
      this.callEventHandlerWithArgument(argument);
    else this.assertThatEventCallbackBeCalled(argument);
  }

  assertThatEventCallbackBeCalled(argument){
    this.argumentsQueue.push(argument);
    this.eventCallbackShouldBeCalled = true;
  }

  wasEventCallbackSet(){
    return this.eventCallbackSet;
  }

  callEventHandlerWithArgument(argument){
    this.eventCallback(argument);
  }

  setCallback(callback){
    if(this.eventCallbackShouldBeCalled)
      while(!(this.argumentsQueue.length === 0))
        callback(this.argumentsQueue.shift());
    else this.setEventCallbackAndFlagThatThenCallbackIsSet(callback);
  }

  setEventCallbackAndFlagThatThenCallbackIsSet(callback){
    this.eventCallback = callback;
    this.eventCallbackSet = true;
  }

}
