const INDEX = "last_index";
const SEPERATOR = "_";

function LocalDatabase(name){
  this.dbname = name;
  this.indexName = this.dbname + SEPERATOR + INDEX;
  this.read_index = 0;
  if(doesDatabaseExists.call(this))
       loadWriteOperations.call(this);
  else prepareWriteAsNewDatabase.call(this);
}

function doesDatabaseExists(){
  return sessionStorage.getItem(this.indexName) !== null;
}

function loadWriteOperations(databaseName){
  this.write_next_id = parseInt(sessionStorage.getItem(this.indexName)) + 1;
}

function prepareWriteAsNewDatabase(){
  this.write_next_id = 0;
}

LocalDatabase.prototype.reachedEnd = function(){
  var final_added_index = parseInt(sessionStorage.getItem(this.indexName)) + 1;
  return ! (this.read_index < final_added_index);
}

LocalDatabase.prototype.addItem = function(object){
  sessionStorage.setItem(requestNewWriteKey.call(this),serializeObject(object));
}

function serializeObject(object){
  return JSON.stringify(object);
}

function requestNewWriteKey(){
  var newKey = this.dbname + SEPERATOR+ this.write_next_id;
  sessionStorage.setItem(this.indexName,this.write_next_id);
  this.write_next_id++;
  return newKey;
}

LocalDatabase.prototype.nextObject = function(){
  return deserializeObject(sessionStorage.getItem(nextReadKey.call(this)));
}

function nextReadKey(){
  return this.dbname+SEPERATOR+this.read_index++;
}

function deserializeObject(textualData){
  return JSON.parse(textualData);
}
