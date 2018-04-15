function retrieveEmployeeRecords(){
  return new Promise((finish, fail) => {
    var asyncHttpRequest = new ASyncHttpRequest("GET",document.location.origin+"/api/view");
    asyncHttpRequest.submit()
    .then((response) => {
      if(response.headers.statusCode === HTTP_SUCCESS) {
        try{
          var array = JSON.parse(response.body);
          finish(array.employees);
        }catch(error){
          fail(error);
        }
      }else fail(new Error("Failed to retrieve employees!"));
    }).fail((exception) => {
      fail(exception);
    });
  });
}
