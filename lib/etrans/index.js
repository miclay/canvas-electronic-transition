var ETrans = require('etrans');
var circles = [
  {size: 45, preNum: 20},
  {size: 110, preNum: 15},
  {size: 174, preNum: 10},
  {size: 240}
];
var sysList = [];
for(var i=0; i<circles.length; i++){
  var sys = new ETrans({
    domCanvas: document.getElementById('sys-' + (i + 1)),
    size: 540,
    maxLightLen: 900 + 50 * (circles.length - i),
    circles: [circles[i]]
  });
  sysList.push(sys);
}

sysList[0].play();
setTimeout(function(){
  sysList[1].play();
}, 1000);
setTimeout(function(){
  sysList[2].play();
}, 1000);
setTimeout(function(){
  sysList[3].play();
}, 1000);
setTimeout(function(){
  sysList[4].play();
}, 1000);