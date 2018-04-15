module.exports = class CreateNewEmployeePresenter {

  constructor(view){
    this.view = view;
  }

  operationSuccess(){
    var viewModel = {};
    viewModel.status = "success";
    this.view.sendFormattedViewModel(viewModel);
  }

  operationFailedServerError(exception){
    var viewModel = {};
    viewModel.status = "failure";
    viewModel.cause = "internal_server_error";
    this.view.sendFormattedViewModel(viewModel);
  }

  operationFailedClientError(exception){
    var viewModel = {};
    viewModel.status = "failure";
    viewModel.cause = "format_invalid";
    this.view.sendFormattedViewModel(viewModel);
  }

}
