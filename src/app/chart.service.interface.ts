// import { Observable } from 'rxjs/Observable';

export interface ChartService {

    initOption(): any;

    resolveDataSet(data: any): any;

    getMetaInfo(data: any): any;

    setSeries(chartData: object, tts: object, option: any, seriesOptions: Array<object>): any;

    setXAxisData(chartData: object, option: any, xAxis: string): any;

    setYAxis(tts: object, option: any): any;

    setyAxisIndex(option: any, yAxisIndex: Array<string>): any;

    setTitle(option: any, titleOptions: object): any;

    setLegend(option: any, legendOptions: object): any;

    setColor(option: any, colors: Array<string>): any;

}
