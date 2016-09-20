var ETrans = require('etrans');
var sys1 = new ETrans({
  domCanvas: document.getElementById('sys-1'),
  size: 500,
  color: '#fddd02',
  circles: [
    {size: 50, preNum: 5},
    {size: 115, preNum: 5},
    {size: 178, preNum: 5},
    {size: 243}
  ]
});
sys1.play();