define('light', function(){
  var Particle = require('particle');

  var Light = function(opts){
    this.options = {
      ctx: {},
      origin: [0, 0],
      angle: 0,
      distance: 50,
      speed: 10
    };
    for(var key in opts){
      this.options[key] = opts[key];
    }
    this.particles = [];
    this.init();
  };
  Light.prototype = {
    init: function(){
      var opts = this.options;
    },
    createParticle: function(params, disClear){
      params = params || {};
      var opts = this.options;
      var particle = new Particle({
        ctx: opts.ctx,
        x: params.x,
        y: params.y,
        size: params.size
      });
      this.particles.push(particle);
      particle.draw();
      if(disClear) {
        setTimeout(function(){
          particle.draw();
        },50)
        return;
      }
      requestAnimFrame(function(){
        particle.fadeOut();
        requestAnimFrame(function(){
          particle.clear();
        });
      });
    },
    play: function(){
      var that = this;
      var opts = this.options;
      var origin = opts.origin;
      var angle = opts.angle;
      var distance = opts.distance;
      var dis = 0;
      (function anim(){
        that.timer = requestAnimFrame(anim);
        var x = Math.cos(angle) * dis + origin[0];
        var y = Math.sin(angle) * dis + origin[1];
        dis += 4;
        if(dis >= distance){
          that.createParticle({
            x: x,
            y: y,
            size: 2
          }, true);
          cancelRequestAnimFrame(that.timer);
        }else{
          that.createParticle({
            x: x,
            y: y,
            size: 1
          });
        }
      })();
    }
  };

  return Light;
});