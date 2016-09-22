define('particle', function(){
  var Particle = function(opts){
    opts = opts || {};
    this.options = {
      ctx: {},
      size: 1,
      x: 10,
      y: 10,
      rgb: [254, 200, 0]
    };
    for(var key in opts){
      this.options[key] = opts[key];
    }
    this.init();
  };
  Particle.prototype = {
    init: function(){
      var opts = this.options;
      var ctx = opts.ctx;
      ctx.shadowBlur = opts.size * 0.3;
      ctx.save();
    },
    draw: function(alpha){
      var opts = this.options;
      var ctx = opts.ctx;
      var rgb = opts.rgb;
      var alpha = 0.5;
      var color = 'rgba('+rgb[0]+','+rgb[1]+','+rgb[2]+','+alpha+')';
      ctx.shadowColor = color;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(opts.x, opts.y, opts.size/2, 0, 2*Math.PI);
      ctx.fill();
      ctx.closePath();
    },
    fadeOut: function(){
      //this.draw(0); return;
      // var opts = this.options;
      // var ctx = opts.ctx;
      // var r = opts.size/2;
      // var eraser = {
      //   x: opts.x-1*r,
      //   y: opts.y-1*r,
      //   width: opts.size,
      //   height: opts.size
      // };
      // if(this.isRectInPath(eraser)){return;}
      // ctx.clearRect(eraser.x, eraser.y, eraser.width, eraser.height);
    },
    clear: function(){
      var opts = this.options;
      var ctx = opts.ctx;
      var r = opts.size/2;
      var eraser = {
        x: opts.x-2.5*r,
        y: opts.y-2.5*r,
        width: opts.size*4,
        height: opts.size*4
      };
      ctx.clearRect(eraser.x, eraser.y, eraser.width, eraser.height);
    },
    isRectInPath: function(rect){
      var opts = this.options;
      var ctx = opts.ctx;
      for(var i=rect.x; i<=rect.x+rect.width; i++){
        for(var k=rect.y; k<=rect.y+rect.height; k++){
          if(ctx.isPointInPath(i, k)){
            return true;
          }
        }
      }
      return false;
    }
  };

  return Particle;
});