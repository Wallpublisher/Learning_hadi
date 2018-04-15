const HTTP_SUCCESS = 200;
const HTTP_INTERNAL_SERVER_ERROR = 500;

module.exports = class JSONRetrieveAllEmployeesView{

    constructor(httpResponse){
      this.httpResponse = httpResponse;
    }

    sendFormattedViewModel(viewModel){
      if(viewModel.status === "success")
        this.httpResponse.statusCode = HTTP_SUCCESS;
      else this.httpResponse.statusCode = HTTP_INTERNAL_SERVER_ERROR;
      this.httpResponse.setHeader('Content-Type','application/json');
      this.httpResponse.end(JSON.stringify(viewModel));
    }

}
