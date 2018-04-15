module.exports = class HitAndRunPromiseEvent{

  mustBeCalledWithArgument(argument){
      if(this.wasEventCallbackSet())
        this.callEventHandlerWithArgument(argument);
      else this.assertThatEventCallbackBeCalled(argument);
  }

  setCallback(callback){
    if(this.eventCallbackShouldBeCalled)
      callback(this.eventCallbackArgument);
    else this.setEventCallbackAndFlagThatThenCallbackIsSet(callback);
  }

  assertThatEventCallbackBeCalled(argument){
    this.eventCallbackArgument = argument;
    this.eventCallbackShouldBeCalled = true;
  }

  wasEventCallbackSet(){
    return this.eventCallbackSet;
  }

  callEventHandlerWithArgument(argument){
    this.eventCallback(argument);
  }

  setEventCallbackAndFlagThatThenCallbackIsSet(callback){
    this.eventCallback = callback;
    this.eventCallbackSet = true;
  }

}
