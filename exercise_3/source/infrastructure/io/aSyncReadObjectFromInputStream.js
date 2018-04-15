const Promise = require("./../../utils/promise/Promise.js");
const aSyncReadToCompletition = require("./aSyncReadInputStreamToEndOfStream.js");

function encodeArrayIntoString(array){
  var result = "";
  for(var i = 0; i < array.length; ++i){
   result += (String.fromCharCode(array[i]));
  }
  return result;
}

module.exports = function aSyncReadObjectFromInputStream(inputStream){
  return new Promise((finish,fail) => {
    aSyncReadToCompletition(inputStream).then((data) => {
      var stringEncodedFormOfData = encodeArrayIntoString(data);
      try {
        var obj = JSON.parse(stringEncodedFormOfData);
        finish(obj);
      }catch(exception){
        fail(exception);
      }
    }).fail((exception) => {
        console.log(exception);
    });
  });
}
