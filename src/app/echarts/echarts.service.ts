import { Injectable } from '@angular/core';

import { ChartService } from '../chart.service.interface';


@Injectable()
/**
 * EchartsService类封装echarts服务提供基础配置接口
 */
export class EchartsService implements ChartService {

  constructor() { }

  getTcdByDid(tts: object, did: any): object {
    let item = _.find(tts, (o) => o.did === did);
    return item.tcd;
  }
  getUnits(tts: object, did: any): any {
    let item = _.find(tts, (o) => o.did === did);
    return item.du;
  }
  /**
         * 输入原始数据并返回解析数据
         *
         * @param {any}data 原始数据
         *
         * @return {object} 解析数据
         */
  resolveDataSet(data: any): object {
    let dataSet = new Object();

    _.forEach(data.Data.tdc, (tdc: any) => {
      _.forEach(tdc, (item: any) => {
        if (!_.has(dataSet, item.did)) {
          dataSet[item.did] = new Array();
        }
        dataSet[item.did].push(item.dv);
      });
    });
    return dataSet;
  }
  /**
         * 从原始数据中获取元数据
         *
         * @param {any}data 原始数据
         *
         * @return {object} 元数据
         */
  getMetaInfo(data: any): object {
    return data.Data.tts;
  }
  /**
         * 初始化配置项option
         *
         * @return {object} 初始配置项
         */
  initOption(): object {
    return {
      title: {
      },
      tooltip: {},
      legend: {
        data: []
      },
      xAxis: {
        // data: []
      },
      yAxis: [],
      series: []
    };
  }
  /**
         * 设置标题title
         * @param {any}option 配置项
         * @param {object}titleOptions 标题配置对象
         */
  setTitle(option: any, titleOptions: object): void {
    option.title = titleOptions;
  }
  /**
        * 配置X轴
        *
        * @param {object}data 解析数据
        * @param {any}option 配置项
        * @param {string}xid X轴显示的数据项
        */
  setXAxisData(data: object, option: any, xid: string): void {
    option.xAxis.data = data[xid];
  }
  /**
    * 配置Y轴
    * 
    * @param {object}tts 元数据
    * @param {any}option 配置项
    */
  setYAxis(tts: object, option: any): void {
    _.forEach(option.series, (serie) => {
      let item = {
        type: 'value',
        name: null
      };
      item.name = serie.name;
      let uni = this.getUnits(tts, serie.id);
      if (uni !== '') {
        item.name += '(' + uni + ')';
      }
      option.yAxis.push(item);
    });
  }
  /**
         * 配置数据列
         *
         * @param {object}data 解析数据
         * @param {object}tts 元数据
         * @param {any}option 配置项
         * @param {Array<object>}series 数据列
         */
  setSeries(data: object, tts: object, option: any, series: Array<object>): void {
    _.forEach(series, (serie) => {
      if (_.has(data, serie.did)) {
        let item: any = new Object();

        item.id = serie.did;
        item.name = this.getTcdByDid(tts, serie.did);
        item.data = data[serie.did];
        item.type = serie.type;

        option.series.push(item);
      }
    });
  }
  /**
         * 配置Y轴在右侧的数据项
         * 
         * @param {any}option 配置项
         * @param {Array<string>}yAxisArray Y轴在右侧数据名称数组
         */
  setyAxisIndex(option: any, yAxisArray: Array<string>): void {
    _.forEach(yAxisArray, (yAxis) => {
      let right = _.find(option.series, (item) => {
        return item.id === yAxis;
      });
      right.yAxisIndex = 1;
    });
  }

  /**
         * 配置图例
         * 
         * @param {any}option 配置项
         * @param {object}legendOptions 图例配置对象
         */
  setLegend(option: any, legendOptions: object): void {
    option.legend = legendOptions;

    option.legend.data = [];
    _.forEach(option.series, (serie) => {
      option.legend.data.push(serie.name);
    });
  }
  /**
     * 
     * @param {any}option 配置项
     * @param {Array<string>}colors 颜色数组
     */
  setColor(option: any, colors: Array<string>): void {
    option.color = colors;
  }


}
