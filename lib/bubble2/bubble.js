window.Bubble = (function(){
  var Bubble = function(params){
    params = params || {};
    this.option = {
      polar: {
        radius: '90%'
      },
      animationDurationUpdate: 13000,
      angleAxis: {
        type: 'category',
        data: [],
        boundaryGap: false,
        splitLine: {
          show: false,
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false
        }
      },
      radiusAxis: {
        type: 'category',
        data: [],
        axisLine: {
          show: false
        },
        axisLabel: {
          show:false,
        },
        splitLine: {
          show: false
        },
        splitArea:{
          show: false,
        },
        axisTick: {
          show: false
        }
      },
      series: [{
        type: 'scatter',
        coordinateSystem: 'polar',
        symbolSize: function (val) {
          return val[2] * (params.symbolSizeRate || 0.5);
        },
        itemStyle: {
          normal: {
            color: params.color || 'rgba(254, 200, 0, 0.4)'
          }
        },
        data: params.data || [],
        animationDelay: params.animationDelay || function (idx) {
          return  idx * (params.animDelayRate || 2) ;
        }
      }],
      animationDuration: params.animationDuration || 1000,
      animationThreshold: 999999,
    };
    this.params = params;

    this.init();
  };
  Bubble.prototype = {
    init: function(){
      
    },
    play: function(){
      var params = this.params;
      var dom = document.getElementById(params.domContainerId)
      echarts.init(dom).setOption(this.option, true);
    }
  };
  return Bubble;
})();