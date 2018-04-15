const Promise = require("./../../utils/promise/Promise.js");
const FileReadWriteAdapter = require("./../../infrastructure/io/FileReadWriteAdapter.js");

module.exports = class RelativeToDirectoryFileReader {

  constructor(directory){
    this.directory = directory;
  }

  readAll(filePath){
    return new Promise((finish,fail) => {
      new FileReadWriteAdapter(this.directory+filePath).readAll().then((data) => {
        finish(data);
      }).fail((exception) => { fail(exception); });
    });
  }

}
