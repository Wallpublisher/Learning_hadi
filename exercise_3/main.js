//Hostname and port

const hostname = "192.168.1.19";
const port = 8080;

//Use Cases

const CreateNewEmployeeUseCase = require("./source/usecases/createnewemployee/CreateNewEmployeeUseCase.js");
const RetrieveAllEmployeesUseCase = require("./source/usecases/retrieveallemployees/RetrieveAllEmployeesUseCase.js");

//Router

const ApplicationRouter = require("./source/infrastructure/applicationrouter/ApplicationRouter.js");

//Database

const ASyncFileBasedEmployeeRecordDB = require("./source/infrastructure/database/ASyncFileBasedEmployeeRecordDB.js");

//IO

const RelativeToDirectoryFileReader = require("./source/infrastructure/io/RelativeToDirectoryFileReader.js");
const FileReadWriteAdapter = require("./source/infrastructure/io/FileReadWriteAdapter.js");
const RequestBodyASyncInputStream = require("./source/infrastructure/io/RequestBodyASyncInputStream.js");
const aSyncReadObjectFromInputStream = require("./source/infrastructure/io/aSyncReadObjectFromInputStream.js");

//Controllers

const CreateNewEmployeeController = require("./source/webdeliverymechanism/controllers/createnewemployee/CreateNewEmployeeController.js");

//Presenters

const CreateNewEmployeePresenter = require("./source/webdeliverymechanism/presenters/CreateNewEmployeePresenter.js");
const RetrieveAllEmployeesPresenter = require('./source/webdeliverymechanism/presenters/RetrieveAllEmployeesPresenter.js');

//Views

const JSONCreateNewEmployeeView = require("./source/webdeliverymechanism/views/JSONCreateNewEmployeeView.js");
const JSONRetrieveAllEmployeesView = require("./source/webdeliverymechanism/views/JSONRetrieveAllEmployeesView.js");

//Frameworks used by main.js

const mime = require("mime-types");
const http = require('http');

//Server startup

console.log("--Server Startup--");
setupApplicationRouter();
setUpDatabase();
startHttpServer(hostname,port,redirectToRouter);

function setupApplicationRouter(){
  console.log("Initializing service mappings...");
  applicationRouter = new ApplicationRouter(notFound404);
  applicationRouter.addPostHandler("/api/new",createNewEmployee);
  applicationRouter.addGetHandler("/api/view",handleEmployeeRetrieval);
  addStaticHostingOn("/");
  addStaticHostingOn("/show_employees");
  addStaticHostingOn("/add_employee");
  addStaticHostingOn("/js");
  console.log("Service mappings initialized.");
}

function addStaticHostingOn(directory){
  applicationRouter.addGetHandler(directory,handleIndexFile);
  applicationRouter.addGetHandlerForDirectory(directory+"/",handleStaticFiles);
}

function setUpDatabase(){
  console.log("Setting up database...");
  employeeRecordDatabase = new ASyncFileBasedEmployeeRecordDB(
                                    new FileReadWriteAdapter("JSON_Databases/database.json"));
  console.log("Database set up.");
}

function startHttpServer(hostname,port,onRequestArrival){
  console.log("Starting http server...");
  const httpServer = http.createServer(onRequestArrival);
  httpServer.listen(port,hostname,() => {
    console.log(`Server bound at ${hostname} on port ${port}`);
  });
}

function redirectToRouter(req,res){
  console.log(`New request for ${req.url}`);
  applicationRouter.route(req,res);
}

function notFound404(request,response){
  response.statusCode = 404;
  response.setHeader('Content-Type', 'text/plain');
  response.end("404 Not Found\n");
}

// File handler

const relativeToStaticResourcesFileReader = new RelativeToDirectoryFileReader("static_resources");

const FileHttpResponseWriter = require("./source/infrastructure/statichosting/FileHttpResponseWriter.js");

function handleIndexFile(httpRequest,httpResponse){
  relativeToStaticResourcesFileReader.readAll(httpRequest.url+"/index.html").then((data) => {
    new FileHttpResponseWriter(httpResponse,mime.lookup("html")).writeFile(data);
  }).fail(() => {notFound404(httpRequest,httpResponse);});
}

function handleStaticFiles(httpRequest,httpResponse){
  relativeToStaticResourcesFileReader.readAll(httpRequest.url).then((data) => {
    new FileHttpResponseWriter(httpResponse,mime.lookup(httpRequest.url)).writeFile(data);
  }).fail(() => {notFound404(httpRequest,httpResponse)});
}

function handleEmployeeRetrieval(request,response){
  var presenter = new RetrieveAllEmployeesPresenter(new JSONRetrieveAllEmployeesView(response));
  var retrieveAllEmployeesUseCase = new RetrieveAllEmployeesUseCase(employeeRecordDatabase,presenter);
  retrieveAllEmployeesUseCase.do();
}

function createNewEmployee(httpRequest,httpResponse){
  var createNewEmployeePresenter = new CreateNewEmployeePresenter(new JSONCreateNewEmployeeView(httpResponse));
  createNewEmployeeUseCase = new CreateNewEmployeeUseCase(employeeRecordDatabase,
                                                              createNewEmployeePresenter);
  var createNewEmployeeController = new CreateNewEmployeeController(createNewEmployeeUseCase);
  var inputStream = new RequestBodyASyncInputStream(httpRequest);
  aSyncReadObjectFromInputStream(inputStream)
  .then((object) => { createNewEmployeeController.handInToUseCase(object); })
  .fail((exception) => { createNewEmployeePresenter.operationFailedClientError(exception); });
}
