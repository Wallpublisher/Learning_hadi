const HTTP_SUCCESS = 200;
const HTTP_BAD_REQUEST = 400;
const HTTP_INTERNAL_SERVER_ERROR = 500;

module.exports = class JSONCreateNewEmployeeView {

  constructor(httpResponse){
    this.httpResponse = httpResponse;
  }

  sendFormattedViewModel(viewModel){
    if(viewModel.status === "success")
      this.httpResponse.statusCode = HTTP_SUCCESS;
    if(viewModel.status === "failure")
      if(viewModel.cause === "format_invalid")
          this.httpResponse.statusCode = HTTP_BAD_REQUEST;
      else this.httpResponse.statusCode = HTTP_INTERNAL_SERVER_ERROR;
    this.httpResponse.setHeader('Content-Type','application/json');
    this.httpResponse.end(JSON.stringify(viewModel));
  }

}
