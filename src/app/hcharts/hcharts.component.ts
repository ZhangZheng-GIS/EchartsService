import { Component, OnInit } from '@angular/core';
import { HchartsService } from './hcharts.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-hcharts',
  templateUrl: './hcharts.component.html',
  styleUrls: ['./hcharts.component.css']
})
export class HchartsComponent implements OnInit {
  options: Object;
  constructor(
    private dataService: DataService,
    private hchartsService: HchartsService) {
    this.dataService.getData().subscribe({
      next: (data) => {
        let chartData = this.hchartsService.resolveDataSet(data);

        let tts = this.hchartsService.getMetaInfo(data);

        let option = this.hchartsService.initOption();

        this.hchartsService.setSeries(chartData, tts, option,
          [{ did: '占地面积', type: 'column' },
          { did: '企业数量', type: 'line' }]);

        this.hchartsService.setTitle(option, { text: 'aaaaaaa', align: 'center' });

        this.hchartsService.setXAxisData(chartData, tts, option, '板块名称');
        this.hchartsService.setYAxis(chartData, tts, option);
        this.hchartsService.setyAxisIndex(option, ['企业数量']);
        this.hchartsService.setLegend(option, { verticalAlign: 'top', y: 20 });
        this.hchartsService.setColor(option, ['#00ff4c', '#0011ff']);
        this.options = option;
        // console.log(this.options);

      }
    });

  }


  ngOnInit() {}

}
