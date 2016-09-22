window.Timer = (function(){
  var T = function(dom){
    this.dom = dom;
    this.time = [0,0,0];
    this.interv = [-1,-1,-1];
    this.init();
  };

  T.prototype = {
    init: function(){
      this.start();
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
    countH: function(){
      var that = this;
      var timePos = 0;
      this.interv[timePos] = setInterval(function(){
        that.count(timePos);
      },1000);
    },
    countM: function(){
      var that = this;
      var timePos = 1;
      this.interv[timePos] = setInterval(function(){
        that.count(timePos);
      },200);
    },
    countS: function(){
      var that = this;
      var timePos = 2;
      this.interv[timePos] = setInterval(function(){
        that.count(timePos);
      },10);
    },
    count: function(timePos){
      var t = this.time[timePos];
      t++;
      if(t>59) { t = 0; }
      this.time[timePos] = t;
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