const Promise = require("./../../../source/utils/promise/Promise.js");

module.exports = function aSyncReadInputStreamToCompletition(aSyncStream){
  return new Promise((finish,fail) => {
    var recievedData = [];
    aSyncStream.readAsAvailable()
    .update((data) => {
      for(var item of data)
        recievedData.push(item);
    })
    .then(() => {
      finish(recievedData);
    })
    .fail((exception) => {
      fail(exception);
    });
  });
}
