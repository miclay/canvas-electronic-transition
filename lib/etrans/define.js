(function(win, doc){
  var modules = {};

  window.define = function(name, body){
    body = body || function(){};
    if(!modules[name]){
      modules[name] = body(win, doc);
    }else{
      throw new Error('[' + name + '] is already exists!');
    }
  };

  window.require = function(name){
    return modules[name];
  };

  window.requestAnimFrame = (function(){
    return window.requestAnimationFrame  ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame    ||
      window.oRequestAnimationFrame      ||
      window.msRequestAnimationFrame     ||
      function(callback){
        window.setTimeout(callback, 1000/60);
      };
  })();

  window.cancelRequestAnimFrame = ( function() {
    return window.cancelAnimationFrame          ||
      window.webkitCancelRequestAnimationFrame  ||
      window.mozCancelRequestAnimationFrame     ||
      window.oCancelRequestAnimationFrame       ||
      window.msCancelRequestAnimationFrame      ||
      clearTimeout
  })();

})(window, document);
