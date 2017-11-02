import { Injectable } from '@angular/core';
import { ChartService } from '../chart.service.interface';

@Injectable()
/**
 * HchartsService类封装highcharts服务提供基础配置接口
 */
export class HchartsService implements ChartService {

  constructor() { }

  getTcdByDid(tts: object, did: any): any {
    let item = _.find(tts, (o) => o.did === did);
    return item.tcd;
  }
  getUnits(tts: object, did: any): any {
    let item = _.find(tts, (o) => o.did === did);
    return item.du;
  }
  toNumber(n: any): any {
    return _.toNumber(n);
  }
  /**
   * 输入原始数据并返回解析数据
   *
   * @param {any}data 原始数据
   *
   * @return {object} 解析数据
   */
  resolveDataSet(data: any): any {
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
  getMetaInfo(data: any): any {
    return data.Data.tts;
  }
  /**
   * 初始化配置项option
   *
   * @return {object} 初始配置项
   */
  initOption(): any {
    return {
      title: {
      },
      tooltip: {},
      legend: {
        data: []
      },
      xAxis: {},
      yAxis: [],
      series: []
    };
  }
  /**
   * 设置标题title
   * @param {any}option 配置项
   * @param {object}titleOptions 标题配置对象
   */
  setTitle(option: any, titleOptions: object): any {
    option.title = titleOptions;
  }
  /**
   * 配置X轴
   *
   * @param {object}data 解析数据
   * @param {any}option 配置项
   * @param {string}xid X轴显示的数据项
   */
  setXAxisData(data: object, option: any, xid: string): any {
    option.xAxis.categories = data[xid];
  }
  /**
   * 配置Y轴
   * 
   * @param {object}tts 元数据
   * @param {any}option 配置项
   */
  setYAxis(tts: object, option: any): any {
    _.forEach(option.series, (serie: any) => {
      let item: any = {
        title: {
          text: ''
        },
      };
      item.id = serie.id;
      item.title.text = serie.name;
      let uni: any = this.getUnits(tts, serie.id);
      if (uni !== '') {
        item.title.text += '(' + uni + ')';
      }
      option.yAxis.push(item);
    });
    return option;
  }
  /**
   * 配置数据列
   *
   * @param {object}data 解析数据
   * @param {object}tts 元数据
   * @param {any}option 配置项
   * @param {Array<object>}series 数据列
   */
  setSeries(data: object, tts: object, option: any, series: Array<object>): any {
    _.forEach(series, (serie: any) => {
      if (_.has(data, serie.did)) {
        let item: any = new Object();
        // TODO：highcharts中data数组需为number型
        let numdata = _.map(data[serie.did], this.toNumber);
        item.id = serie.did;
        item.name = this.getTcdByDid(tts, serie.did);
        item.data = numdata;
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
  setyAxisIndex(option: any, yAxisArray: Array<string>): any {
    let No = 1;
    _.forEach(yAxisArray, (yAxis: any) => {
      let rightSerie = _.find(option.series, (item: any) => {
        return item.id === yAxis;
      });
      let rightYaxis = _.find(option.yAxis, (item: any) => {
        return item.id === yAxis;
      });
      rightSerie.yAxis = No;
      No++;
      rightYaxis.opposite = true;
    });
  }
  /**
   * 配置图例
   * 
   * @param {any}option 配置项
   * @param {object}legendOptions 图例配置对象
   */
  setLegend(option: any, legendOptions: object): any {
    option.legend = legendOptions;
  }
  /**
   * 
   * @param {any}option 配置项
   * @param {Array<string>}colors 颜色数组
   */
  setColor(option: any, colors: Array<string>): any {
    option.colors = colors;
  }








}

