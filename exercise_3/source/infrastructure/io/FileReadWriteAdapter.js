const fs = require('fs');
const Promise = require("./../../../source/utils/promise/Promise.js");

module.exports = class FileReadWriteAdapter{

  constructor(fileLocation){
    this.fileLocation = fileLocation;
  }

  write(str){
    return new Promise((finish,fail) => {
        fs.writeFile(this.fileLocation,str,(err) => {
          if(err)
            fail(err);
          else finish();
        });
    });
  }

  readAll(){
    return new Promise((finish,fail) => {
      fs.readFile(this.fileLocation,(err ,data) => {
        if(err)
          fail(err);
        else finish(data);
      });
    });
  }

}
