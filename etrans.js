define('etrans', function(win, doc){
  var Light = require('light');
  var maxLightLen = 50;

  var E = function(opts){
    opts = opts || {};
    this.options = {
      domCanvas: document.getElementsByTagName('canvas')[0],
      size: 300,
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
      return Math.random() * 360;
    },
    createLight: function(){
      var opts = this.options;
      var circles = opts.circles;
      var light = new Light({
        ctx: this.ctx,
        origin: this.origin,
        angle: this.getAngle(),
        distance: circles[this.getCircleLevel()].size,
        speed: 10
      });
      light.play();
      this.lights.push(light);
    },
    play: function(){
      var that = this;
      that.createLight();
      this.timer = setInterval(function(){
        that.createLight();
        if(that.lights.length >= maxLightLen){
          that.timer = clearInterval(that.timer);
        }
      },500);
    }
  };

  return E;
});