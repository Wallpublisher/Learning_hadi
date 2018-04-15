module.exports = class EmployeeRecordsToHttpRequestTranslator {

  constructor(view){
    this.view = view;
  }

  reportEmployees(employeesArray){
    var viewModel = {};
    viewModel.status = "success";
    viewModel.employees = employeesArray;
    this.view.sendFormattedViewModel(viewModel);
  }

  retrieveAllEmployeesFailed(exception){
    var viewModel = {};
    viewModel.status = "failure";
    viewModel.cause = exception.message;
    this.view.sendFormattedViewModel(viewModel);
  }

}
