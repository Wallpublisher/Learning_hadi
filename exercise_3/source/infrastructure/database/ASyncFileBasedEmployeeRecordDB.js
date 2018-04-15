const Promise = require("./../../../source/utils/promise/Promise.js");
const DATA_FORMAT_NOT_VALID = "Not Valid";

module.exports = class ASyncFileBasedEmployeeRecordDB {

  constructor(fileDriver){
    this.buffer = [];
    this.fileDriver = fileDriver;
  }

  writeEmployee(employeeRecord,handle){
    return new Promise((finish,fail) => {
        if(!this.wasDatabaseLoaded){
          this.readEmployees().then((employees) => {
            this.buffer = employees;
            this.wasDatabaseLoaded = true;
            this.buffer.push(employeeRecord);
            this.fileDriver.write(JSON.stringify(this.buffer))
            .then(() => {finish();}).fail((exception) => { console.log(exception); fail(exception); });
          }).fail((exception) => { console.log(exception); fail(exception); });
        }
        else {
         this.buffer.push(employeeRecord);
         this.fileDriver.write(JSON.stringify(this.buffer)).then(() => {finish();}).fail((exception) => { console.log(exception); fail(exception);});
       }
    });
  }

  readEmployees(handle){
    return new Promise((finish,fail) => {
      this.fileDriver.readAll().then((dataAsJSON) => {
      try {
        finish(JSON.parse(dataAsJSON.toString("utf-8")));
      }catch(jsonParsingError){fail(DATA_FORMAT_NOT_VALID);}
    }).fail((exception) => { console.log(exception); fail(exception); });
    });
  }

}
