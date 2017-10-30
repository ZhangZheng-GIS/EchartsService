import { Injectable } from '@angular/core';
import { ChartService } from '../chart.service.interface';

@Injectable()
export class HchartsService implements ChartService {

  constructor() { }

  getTcdByDid(tts: object, did: any): any {
    let item = _.find(tts, (o) => o.did === did);
    return item.tcd;
  }
  getUnits(tts: object, tcd: any): any {
    let item = _.find(tts, (o) => o.tcd === tcd);
    return item.du;
  }
  toNumber(n: any): any {
    return _.toNumber(n);
  }
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

  getMetaInfo(data: any): any {
    return data.Data.tts;
  }

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

  setTitle(option: any, titleOptions: object): any {
    option.title = titleOptions;
  }

  setXAxisData(data: object, tts: object, option: any, xid: string): any {
    option.xAxis.categories = data[xid];
  }

  setYAxis(data: object, tts: object, option: any): any {
    _.forEach(option.series, (serie) => {
      let item: any = {
        title: {
          text: ''
        },
      };
      item.id = serie.id;
      item.title.text = serie.name;
      let uni: any = this.getUnits(tts, serie.name);
      if (uni !== '') {
        item.title.text += '(' + uni + ')';
      }
      option.yAxis.push(item);
    });
    return option;
  }

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

  setyAxisIndex(option: any, yAxisArray: object): any {
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

  setLegend(option: any, legendOptions: object): any {
    option.legend = legendOptions;
  }

  setColor(option: any, colors: Array<string>): any {

    option.colors = colors;
  }








}

