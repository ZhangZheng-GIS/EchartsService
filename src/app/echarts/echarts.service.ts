import { Injectable } from '@angular/core';

import { ChartService } from '../chart.service.interface';


@Injectable()
export class EchartsService implements ChartService {

  constructor() { }

  getTcdByDid(tts: object, did: any): any {
    let item = _.find(tts, (o) => o.did === did);
    return item.tcd;
  }
  getUnits(tts: object, tcd: any): any {
    let item = _.find(tts, (o) => o.tcd === tcd);
    return item.du;
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
      xAxis: {
        // data: []
      },
      yAxis: [],
      series: []
    };
  }

  setTitle(option: any, titleOptions: object): any {
    option.title = titleOptions;
  }

  setXAxisData(data: object, tts: object, option: any, xid: string): any {
    option.xAxis.data = data[xid];
  }

  setYAxis(data: object, tts: object, option: any): any {
    _.forEach(option.series, (serie) => {
      let item = {
        type: 'value',
        name: null
      };
      item.name = serie.name;
      let uni = this.getUnits(tts, serie.name);
      if (uni !== '') {
        item.name += '(' + uni + ')';
      }
      option.yAxis.push(item);
    });
    return option;
  }

  setSeries(data: object, tts: object, option: any, series: Array<object>): any {
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

  setyAxisIndex(option: any, yAxisArray: object): any {
    _.forEach(yAxisArray, (yAxis) => {
      let right = _.find(option.series, (item) => {
        return item.id === yAxis;
      });
      right.yAxisIndex = 1;
    });
  }

  setColor(option: any, colors: Array<string>): any {
    option.color = colors;
  }

  setLegend(option: any, legendOptions: object): any {
    option.legend = legendOptions;

    option.legend.data = [];
    _.forEach(option.series, (serie) => {
      option.legend.data.push(serie.name);
    });
  }
}
