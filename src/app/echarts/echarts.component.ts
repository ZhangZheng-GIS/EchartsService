import { Component, OnInit } from '@angular/core';
import { EchartsService } from './echarts.service';
import { DataService } from './data.service';
@Component({
  selector: 'app-echarts',
  templateUrl: './echarts.component.html',
  styleUrls: ['./echarts.component.css']
})
export class EchartsComponent implements OnInit {
  _option: Object;
  // _data: Object;

  constructor(
    private _dataService: DataService,
    private _echartsService: EchartsService
  ) { }
  getData() {
    return this._dataService.getData().subscribe({
      next: (data) => {
        // this._data = data;

        // console.log(data);


        //  1 解析原始数据

        let resolved_data = this._echartsService.resolveDataSet(data);
        // console.log(resolved_data);

        //  2 init option
        let option = this._echartsService.initOption();

        // 3 set option
        // this._echartsService.setLegend(option, '板块名称-');
        this._echartsService.setXAxisData(resolved_data, option, '板块名称');
        this._echartsService.setYAxis(resolved_data, option, ['占地面积', '企业数量']);
        this._echartsService.setLegend(option, ['占地面积', '企业数量'], [], []);
        this._echartsService.setSeries(resolved_data, option,
          [{ did: '占地面积', type: 'bar' },
          { did: '企业数量', type: 'line' }]);
        this._echartsService.setyAxisIndex(option, ['企业数量']);
        this._echartsService.setTitle(option, '各街道企业占地面积及数量', '2017年');
        this._echartsService.setColor(option, ['#00ff4c', '#0011ff']);
        this._option = option;
        console.log(option);
        






        // let xAxisData: Array<any> = [];
        // let seriesData1: Array<any> = [];
        // let seriesData2: Array<any> = [];

        // let xAxisColumn = '板块名称';
        // let yAxisColumn1 = '占地面积';
        // let yAxisColumn2 = '企业数量';

        // _.forEach(data.Data.tdc, (item) => {

        //   let name = _.find(item, function (o) { return o.did === xAxisColumn; });
        //   xAxisData.push(name.dv);
        //   let area = _.find(item, function (o) { return o.did === yAxisColumn1; });
        //   seriesData1.push(area.dv);
        //   let number = _.find(item, function (o) { return o.did === yAxisColumn2; });
        //   seriesData2.push(number.dv);

        // })
        // this._option = {
        //   title: {
        //     text: 'ECharts 入门示例'
        //   },
        //   tooltip: {},
        //   legend: {
        //     data: [xAxisColumn]
        //   },
        //   xAxis: {
        //     // type: 'category',
        //     data: xAxisData,
        //     axisTick: {
        //       alignWithLabel: true,
        //       interval: 0,
        //     },
        //     axisLabel: {
        //       interval: 0,
        //       rotate: 60,
        //     }
        //     // data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        //   },
        //   yAxis: [{
        //     type: 'value',
        //     name: yAxisColumn1,
        //   },
        //   {
        //     type: 'value',
        //     name: yAxisColumn2,
        //   }],
        //   series: [{
        //     name: yAxisColumn1,
        //     type: 'bar',
        //     data: seriesData1
        //     // data: [5, 20, 36, 10, 10, 20]
        //   },
        //   {
        //     name: yAxisColumn2,
        //     type: 'bar',
        //     yAxisIndex: 1,
        //     data: seriesData2
        //   }]
        // };

      }
    });
  }

  ngOnInit() {
    this.getData();
  }

}
