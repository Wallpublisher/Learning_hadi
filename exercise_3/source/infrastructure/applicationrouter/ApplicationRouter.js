module.exports = class ApplicationRouter {

  constructor(defaultHandler){
    this.getMap = new Map();
    this.postMap = new Map();
    this.getDirectoryMap = new Map();
    this.hostedDirs = [];
    this.defaultHandler = defaultHandler;
  }

  addGetHandler(path,handler){
    this.getMap.set(path,handler);
  }

  addPostHandler(path,handler){
    this.postMap.set(path,handler);
  }

  addGetHandlerForDirectory(directory,handler){
    if(!this.representsADirectory(directory))
      throw "Not a directory!";
    this.getDirectoryMap.set(directory,handler);
    this.hostedDirs.push(directory);
    this.hostedDirs.sort((firstDirectory,secondDirectory) => {
      if(this.isDirectorySubsetOf(firstDirectory,secondDirectory))
        return 1;
      else return -1;
    });
  }

  representsADirectory(directory){
    if(directory.indexOf("/") === 0 && directory.lastIndexOf("/") === directory.length-1)
        return true;
    else return false;
  }

  route(request,response){
    switch (request.method) {
      case "GET":
        this.___handleGetRequests(request,response);
        break;
      case "POST":
        this.___handlePostRequests(request,response);
        break;
      default: this.defaultHandler(request,response);
    }
  }

  belongsTo(url,directory){
    if(url.slice(0,url.lastIndexOf("/")+1).indexOf(directory) === 0)
      return true;
    else return false;
  }

  isDirectorySubsetOf(firstDirectory,secondDirectory){
    return (secondDirectory.indexOf(firstDirectory) === 0);
  }

  isWithinAScopeOfASubdirectory(url){
    return (url.slice(0,url.lastIndexOf("/")+1).indexOf(this.hostedDirs[0]) === 0);
  }

  belongsToAnyDirectory(url){
    for(var index in this.hostedDirs)
      if(url.slice(0,url.lastIndexOf("/")+1).indexOf(this.hostedDirs[index]) === 0)
        return true;
    return false;
  }

  getMatch(url){
    for(var index in this.hostedDirs)
      if(url.slice(0,url.lastIndexOf("/")+1).indexOf(this.hostedDirs[index]) === 0)
        return this.getDirectoryMap.get(this.hostedDirs[index]);
  }

  ___handleGetRequests(request,response){
    if(this.getMap.has(request.url))
      this.getMap.get(request.url)(request,response);
    else if(this.getDirectoryMap.has(request.url.slice(0,request.url.lastIndexOf("/")+1)))
      this.getDirectoryMap.get(request.url.slice(0,request.url.lastIndexOf("/")+1))(request,response);
    else if(this.belongsToAnyDirectory(request.url))
      this.getMatch(request.url)(request,response);
    else this.defaultHandler(request,response);
  }

  ___handlePostRequests(request,response){
    if(this.postMap.has(request.url))
      this.postMap.get(request.url)(request,response);
    else this.defaultHandler(request,response);
  }

}
