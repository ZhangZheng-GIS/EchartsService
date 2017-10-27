import { Injectable } from '@angular/core';

@Injectable()
export class HchartsService {

  constructor() { }

  getTcdByDid(tts, did) {
    let item = _.find(tts, (o) => o.did === did);
    return item.tcd;
  }
  getUnits(tts, tcd) {
    let item = _.find(tts, (o) => o.tcd === tcd);
    return item.du;
  }
  toNumber(n) {
    return _.toNumber(n);
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
      xAxis: {},
      yAxis: [],
      series: []
    };
  }

  setTitle(option, titleOptions) {
    option.title = titleOptions;
  }

  setXAxisData(data, tts, option, xid) {
    option.xAxis.categories = data[xid];
  }

  setYAxis(data, tts, option) {
    _.forEach(option.series, (serie) => {
      let item = {
        id: '',
        title: {
          text: ''
        },
      };
      item.id = serie.id;
      item.title.text = serie.name;
      let uni = this.getUnits(tts, serie.name);
      if (uni !== '') {
        item.title.text += '(' + uni + ')';
      }
      option.yAxis.push(item);
    });
    return option;
  }

  setSeries(data, tts, option, series) {
    _.forEach(series, (serie) => {
      if (_.has(data, serie.did)) {
        let item: any = new Object();
        let numdata = _.map(data[serie.did], this.toNumber);
        item.id = serie.did;
        item.name = this.getTcdByDid(tts, serie.did);
        item.data = numdata;
        item.type = serie.type;
        option.series.push(item);
      }
    });
  }

  setyAxisIndex(option, yAxisArray) {
    let No = 1;
    _.forEach(yAxisArray, (yAxis) => {
      let rightSerie = _.find(option.series, (item) => {
        return item.id === yAxis;
      });
      let rightYaxis = _.find(option.yAxis, (item) => {
        return item.id === yAxis;
      });
      rightSerie.yAxis = No;
      No++;
      rightYaxis.opposite = true;
    });
  }

  setLegend(option, legendOptions) {
    option.legend = legendOptions;
  }

  setColor(option, colors: Array<string>) {

    option.colors = colors;
  }








}

