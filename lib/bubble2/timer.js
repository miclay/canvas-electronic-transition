window.Timer = (function(){
  var T = function(dom){
    this.dom = dom;
    this.time = [0,0,0];
    this.interv = [-1,-1,-1];
    this.init();
  };

  T.prototype = {
    init: function(){
      
    },
    render: function(){
      this.dom.innerText = this.getTimeStr();
    },
    start: function(){
      this.countS();
      this.countM();
      this.countH();
    },
    stop: function(){
      this.interv[0] = clearInterval(this.interv[0]);
      for(var i in this.interv){
        this.interv[i] = clearInterval(this.interv[i]);
      }
    },
    reset: function(){
      this.stop();
      this.time = [0,0,0];
      this.render();
    },
    countH: function(){
      var that = this;
      var timePos = 0;
      this.interv[timePos] = setInterval(function(){
        that.count(timePos);
      },450);
    },
    countM: function(){
      var that = this;
      var timePos = 1;
      this.interv[timePos] = setInterval(function(){
        that.count(timePos);
      },5);
    },
    countS: function(){
      var that = this;
      var timePos = 2;
      this.interv[timePos] = setInterval(function(){
        that.count(timePos);
      },1);
    },
    count: function(timePos){
      var t = this.time[timePos];
      t++;
      if(timePos == 0 && t > 24) { 
        this.stop();
        t = 24; 
        this.time = [t,0,0];
        if(typeof this.onStop == 'function'){
          this.onStop();
        }
      }else if(t>59) {
        t = 0; 
        this.time[timePos] = t;
      }else{
        this.time[timePos] = t;
      }
      this.render();
    },
    getTimeStr: function(){
      var time = this.time;
      var temp = [];
      for(var i in time){
        var t = '0' + time[i];
        temp.push(t.slice(-2));
      }
      return temp.join(':');
    }
  };

  return T;
})();