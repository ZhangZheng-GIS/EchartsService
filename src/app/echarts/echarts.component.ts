import { Component, OnInit } from '@angular/core';
import { EchartsService } from './echarts.service';
import { DataService } from './data.service';
@Component({
  selector: 'app-echarts',
  templateUrl: './echarts.component.html',
  styleUrls: ['./echarts.component.css']
})
export class EchartsComponent implements OnInit {
  option: any;

  constructor(
    private dataService: DataService,
    private echartsService: EchartsService
  ) {
    this.dataService.getData().subscribe({
      next: (data) => {

        //  1 解析原始数据
        let chartData = this.echartsService.resolveDataSet(data);

        let tts = this.echartsService.getMetaInfo(data);

        //  2 init option
        let option = this.echartsService.initOption();

        // 3 set option
        this.echartsService.setSeries(chartData, tts, option,
          [{ did: '占地面积', type: 'bar' },
          { did: '企业数量', type: 'line' }]);
        this.echartsService.setXAxisData(chartData, tts, option, '板块名称');
        this.echartsService.setYAxis(chartData, tts, option);
        this.echartsService.setyAxisIndex(option, ['企业数量']);
        this.echartsService.setTitle(option, { text: 'aaaaaaa', left: 'center' });
        this.echartsService.setLegend(option, { left: 'center', top: 20 });
        this.echartsService.setColor(option, ['#00ff4c', '#0011ff']);

        this.option = option;

      }
    });
  }

  ngOnInit() {}

}
