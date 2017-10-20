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
  getUnits(tcd) {
    let item = _.find(this.tts, (o) => o.tcd === tcd);
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
      title: {},
      tooltip: {},
      legend: {},
      xAxis: {
      },
      yAxis: [],
      series: [],
      color: ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3']
    };
    return option;
  }
  setLegend(option, legendOptions) {
    option.legend = legendOptions;
    option.legend.data = [];
    _.forEach(option.series, (serie) => {
      option.legend.data.push(serie.name);
    });
    return option;
  }

  setXAxisData(data, option, xid) {

    option.xAxis.data = data[xid];
    // console.log(option);
    return option;
  }


  setYAxis(data, option) {
    _.forEach(option.series, (serie) => {
      let item = {
        type: 'value',
        name: null
      };
      item.name = serie.name;
      let uni = this.getUnits(serie.name);
      if (uni !== '') {
        item.name += '(' + uni + ')';
      }

      option.yAxis.push(item);
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


  setTitle(option, titleOptions, text, subtext) {
    option.title = titleOptions;
    option.title.text = text;
    option.title.subtext = subtext;
  }


  setColor(option, color) {
    option.color = _.concat(color, option.color);
  }


}
