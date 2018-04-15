class ASyncHttpRequest {

  constructor(method,url){
    this.method = method;
    this.url = url;
    this.xmlHTTPRequest = new XMLHttpRequest();
  }

  submit(submitData = ""){
    return new Promise((finish,fail) => {
      var context = this;
      context.xmlHTTPRequest.onreadystatechange = function(){
        if(context.xmlHTTPRequest.readyState === DONE)
          if(context.xmlHTTPRequest.status !== 0)
          finish({headers : context.createHttpResponseHeaders(),
                  body : context.xmlHTTPRequest.response});
          else fail(new Error("Failed to communicate with server!"));
      }
      this.xmlHTTPRequest.open(this.method, this.url, true);
      this.xmlHTTPRequest.send(submitData);
    });
  }

  createHttpResponseHeaders(){
    var responseHeaders = this.xmlHTTPRequest.getAllResponseHeaders();
    var array = responseHeaders.split("\r\n");
    var headers = {statusCode : this.xmlHTTPRequest.status};
    for(var i = 0; i < array.length ;i++){
      var vals = array[i].trim().split(":");
      if(array[i].trim() !== "")
        for(var j = 0;j < 1;j++)
          headers[vals[0]] = vals[1];
    }
    return headers;
  }

}
