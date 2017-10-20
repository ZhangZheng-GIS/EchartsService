import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

const data_url = './assets/FPQYYDFBZ.json';

@Injectable()
export class EchartsService {

  //TODO: 把tts放到外部，需要使用时再从外部传入
  tts;

  constructor() { }

  getTcdByDid(did) {
    let item = _.find(this.tts, (o) => o.did === did);
    return item.tcd;
  }
  getUnits(did) {
    let item = _.find(this.tts, (o) => o.did === did);
    return item.du;
  }

  resolveDataSet(data) {
    let dataSet = new Object();
    //1. tts 保存到本地变量
    this.tts = data.Data.tts;
    //2. 遍历tdc
    _.forEach(data.Data.tdc, (tdc: any) => {
      _.forEach(tdc, (item) => {
        let tdc = this.getTcdByDid(item.did);
        if (!_.has(dataSet, item.did)) {
          dataSet[item.did] = new Array();
        }
        dataSet[item.did].push(item.dv);
      });
    });
    console.log(dataSet);
    return dataSet;
  }

  initOption() {
    let option = {
      title: {
        text: '',
        subtext: '',
        left: 'center'
      },
      tooltip: {},
      legend: {
        data: [],
        left: '',
        top: '',
        right: '',
        bottom: '',
        width: '',
        height: ''
      },
      xAxis: {
        data: []
      },
      yAxis: [],
      series: [],
      color: ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3']
    };
    return option;
  }
  setLegend(option, yAxisArray, position, size) {
    _.forEach(yAxisArray, (yAxis) => {
      let tcd = this.getTcdByDid(yAxis);
      option.legend.data.push(tcd);
    });
    if (position !== []) {
      option.legend.left = position[0];
      option.legend.top = position[1];
      option.legend.right = position[2];
      option.legend.bottom = position[3];
    }
    if (size !== []) {
      option.legend.width = position[0];
      option.legend.height = position[1];
    }
    return option;
  }
  setXAxisData(data, option, xid) {

    option.xAxis.data = data[xid];
    // console.log(option);
    return option;
  }


  // setXAxisLabel() {

  // }
  setYAxis(data, option, yAxisArray) {
    _.forEach(yAxisArray, (yAxis) => {
      let item = {
        type: 'value',
        name: null
      };
      if (_.has(data, yAxis)) {
        let tcd = this.getTcdByDid(yAxis);

        item.name = tcd;

        let uni = this.getUnits(yAxis);
        if (uni !== '') {
          item.name += '(' + uni + ')';
        }

        option.yAxis.push(item);
      }
    });
    // console.log(option.yAxis);
    return option;
  }

  setSeries(data, option, series) {
    _.forEach(series, (serie) => {

      if (_.has(data, serie.did)) {
        let item: any = new Object();

        let tcd = this.getTcdByDid(serie.did);
        item.name = tcd;
        item.data = data[serie.did];
        item.type = serie.type;

        //TODO: legend 单独放到一个方法中，包括position等(DONE)

        option.series.push(item);
      }
    });
    return option;




  }

  setyAxisIndex(option, yAxisArray) {
    _.forEach(yAxisArray, (yAxis) => {
      let tcd = this.getTcdByDid(yAxis);
      let right = _.find(option.series, (item) => {
        let tcd = this.getTcdByDid(yAxis);
        return item.name === tcd;
      });
      right.yAxisIndex = 1;
    });

    return option;
  }

  //TODO: http://echarts.baidu.com/option.html#title(DONE)
  setTitle(option, text, subtext) {
    option.title.text = text;
    option.title.subtext = subtext;
  }

  //TODO: http://echarts.baidu.com/option.html#color(DONE)
  setColor(option, color) {
    option.color =_.concat(color, option.color);
  }


}
