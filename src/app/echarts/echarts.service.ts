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
        text: ''
      },
      tooltip: {},
      legend: {
        data: []
      },
      xAxis: {
        data: []
      },
      yAxis: [],
      series: []
    };
    return option;
  }
  // setLegend(option, xid) {
  //   option.legend.data.push(xid);
  //   return option;
  // }
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



    // _.forIn(data, (value, key) => {
    //   let item = {
    //     type: 'value',
    //     name: null
    //   };
    //   // console.log(key);
    //   console.log(_.has(yid, key));
    //   if (_.has(yid, key)) {
    //     item.name = key;
    //     option.yAxis.push(item);
    //   }
    // });

  }

  setSeries(data, option, series) {
    _.forEach(series, (serie) => {
      // let item = {
      //   name: null,
      //   type: 'bar',
      //   data: null,
      //   yAxisIndex: 0,
      // };
      if (_.has(data, serie.did)) {
        let item: any = new Object();

        let tcd = this.getTcdByDid(serie.did);
        item.name = tcd;
        item.data = data[serie.did];
        item.type = serie.type;

        //TODO: legend 单独放到一个方法中，包括position等
        option.legend.data.push(tcd);

        option.series.push(item);
      }
    });
    // console.log(option);
    return option;


    // _.forIn(data, (value, key) => {
    //   let item = {
    //     name: null,
    //     type: 'bar',
    //     data: null,
    //     yAxisIndex: 0
    //   };
    //   if (_.has(yid, key)) {
    //     item.name = key;
    //     item.data = value;
    //     option.legend.data.push(key); // 设置legend
    //     option.series.push(item);
    //   }
    // });

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

    // let right = _.find(option.series, (item) => {
    //   let tcd = this.getTcdByDid(yid);
    //   return item.name === tcd;
    // });
    // console.log(right);

    // right.yAxisIndex = 1;
    // return option;
  }

  //TODO: http://echarts.baidu.com/option.html#title
  setTitle(){

  }

  //TODO: http://echarts.baidu.com/option.html#color
  setColor(){

  }


}
