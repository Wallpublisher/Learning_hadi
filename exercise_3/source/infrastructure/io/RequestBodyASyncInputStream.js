const ChunkedPromise = require("./../../utils/promise/ChunkedPromise.js");

module.exports = class RequestBodyInputStream{

  constructor(httpRequest){
    this.request = httpRequest;
  }

  readAsAvailable(){
    return new ChunkedPromise((update,finish,fail) => {
      this.request.on("data",(data) => { update(data); });
      this.request.on("end",() => { finish(); });
      this.request.on("error",(exception) => { fail(exception); });
    });
  }

}
