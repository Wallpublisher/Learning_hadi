module.exports = class FileHttpResponseWriter {

  constructor(httpResponse,mimeType){
    this.httpResponse = httpResponse;
    this.mimeType = mimeType;
  }

  writeFile(data){
    this.httpResponse.statusCode = 200;
    this.httpResponse.setHeader('Content-Type',this.mimeType);
    this.httpResponse.end(data);
  }

}
