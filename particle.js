define('particle', function(){
  var Particle = function(opts){
    opts = opts || {};
    this.options = {
      ctx: {},
      size: 1,
      x: 10,
      y: 10,
      rgb: [255, 252, 0]
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
      var alpha = 1;
      var color = 'raga('+rgb[0]+','+rgb[1]+','+rgb[2]+','+alpha+')';
      ctx.shadowColor = color;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(opts.x, opts.y, opts.size/2, 0, 2*Math.PI);
      ctx.fill();
      ctx.closePath();
    },
    fadeOut: function(){
      var opts = this.options;
      var ctx = opts.ctx;
      var r = opts.size/2;
      ctx.clearRect(opts.x-1.5*r, opts.y-1.5*r, opts.size*2, opts.size*2);
      var rgb = opts.rgb;
      var alpha = 0.5;
      var color = 'raga('+rgb[0]+','+rgb[1]+','+rgb[2]+','+alpha+')';
      ctx.shadowColor = color;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(opts.x, opts.y, opts.size/2, 0, 2*Math.PI);
      ctx.fill();
      ctx.closePath();
    },
    clear: function(){
      var opts = this.options;
      var ctx = opts.ctx;
      var r = opts.size/2;
      ctx.clearRect(opts.x-1.5*r, opts.y-1.5*r, opts.size*2, opts.size*2);
      //ctx.globalAlpha = 0.5;
      // ctx.shadowColor = '#000';
      // ctx.strokeStyle = '#000';
      // ctx.beginPath();
      // ctx.arc(opts.x, opts.y, opts.size/2, 0, 2*Math.PI);
      // ctx.stroke();
      // ctx.closePath();
      //ctx.restore();
    },
    play: function(){
      var that = this;
      that.draw();
    }
  };

  return Particle;
});