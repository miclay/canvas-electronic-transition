define('etrans', function(win, doc){
  var Light = require('light');

  var E = function(opts){
    opts = opts || {};
    this.options = {
      domCanvas: document.getElementsByTagName('canvas')[0],
      size: 300,
      maxLightLen: 1000,
      circles: [
        {size: 50, preNum: 10},
        {size: 100, preNum: 10},
        {size: 150, preNum: 10},
        {size: 200}
      ]
    };
    for(var key in opts){
      this.options[key] = opts[key];
    }

    this.domCanvas = this.options.domCanvas;
    this.ctx = this.domCanvas.getContext('2d');
    this.origin = [this.options.size/2, this.options.size/2];
    this.lights = [];
    this.maxLevel = 0;

    this.init();
  };
  E.prototype = {
    init: function(){
      var opts = this.options;
      var ctx = this.ctx;
      this.domCanvas.width = opts.size;
      this.domCanvas.height = opts.size;
    },
    getCircleLevel: function(){
      var opts = this.options;
      var circles = opts.circles;
      var total = circles.length;
      var circle = circles[this.maxLevel];
      if(circle.num){
        circle.num++;
      }else{
        circle.num = 1;
      }
      if(circle.num > circle.preNum){
        this.maxLevel++;
        this.maxLevel = Math.min(this.maxLevel, circles.length - 1);
      }
      var level = Math.floor(Math.random() * (this.maxLevel+1));
      return level;
    },
    getAngle: function(){
      // this.angle = this.angle || 0;
      // this.angle += 6;
      // return this.angle;
      var blackList = [
        18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,
        55,56,57,58,59, 
        108,109,110,111,112,113,114,115,116,117, 
        195,196,197,198,199, 
        237,238,239,240,
        300,301,302,303,304,305
      ];
      var angle = Math.floor(Math.random() * 360);
      if(blackList.indexOf(angle) == -1){
        return angle;
      }else{
        return this.getAngle();
      }
    },
    createLight: function(){
      var opts = this.options;
      var circles = opts.circles;
      var level = this.getCircleLevel();
      var light = new Light({
        ctx: this.ctx,
        origin: this.origin,
        angle: this.getAngle(),
        distance: circles[level].size + Math.random()*20,
        speed: 10
      });
      light.play();
      this.lights.push(light);
    },
    play: function(){
      var that = this;
      var opts = this.options;
      that.createLight();
      (function anim(){
        that.timer = requestAnimFrame(anim);
        that.createLight();
        if(that.lights.length >= opts.maxLightLen){
          cancelRequestAnimFrame(that.timer);
        }
      })();
      
    }
  };

  return E;
});