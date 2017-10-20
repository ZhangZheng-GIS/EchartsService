import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';


@Injectable()
export class EchartsService {

  constructor() { }

  getTcdByDid(tts, did) {
    let item = _.find(tts, (o) => o.did === did);
    return item.tcd;
  }
  getUnits(tts, tcd) {
    let item = _.find(tts, (o) => o.tcd === tcd);
    return item.du;
  }

  resolveDataSet(data) {
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

  getMetaInfo(data) {
    return data.Data.tts;
  }

  initOption() {
    return {
      title: {
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
  }

  setTitle(option, titleOptions) {
    option.title = titleOptions;
  }

  setXAxisData(data, tts, option, xid) {
    option.xAxis.data = data[xid];
  }

  setYAxis(data, tts, option) {
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

  setSeries(data, tts, option, series) {
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

  setyAxisIndex(option, yAxisArray) {
    _.forEach(yAxisArray, (yAxis) => {
      let right = _.find(option.series, (item) => {
        return item.id === yAxis;
      });
      right.yAxisIndex = 1;
    });
  }

  setColor(option, colors: Array<string>) {
    option.color = colors;
  }

  setLegend(option, legendOptions) {
    option.legend = legendOptions;

    option.legend.data = [];
    _.forEach(option.series, (serie) => {
      option.legend.data.push(serie.name);
    });
  }
}
