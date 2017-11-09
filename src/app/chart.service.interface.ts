// import { Observable } from 'rxjs/Observable';

export interface ChartService {

    initOption(): object;

    resolveDataSet(data: any): object;

    getMetaInfo(data: any): object;

    setSeries(chartData: object, tts: object, option: any, seriesOptions: Array<object>): void;

    setXAxisData(chartData: object, option: any, xAxis: string): void;

    setYAxis(tts: object, option: any): void;

    setyAxisIndex(option: any, yAxisIndex: Array<string>): void;

    setTitle(option: any, titleOptions: object): void;

    setLegend(option: any, legendOptions: object): void;

    setColor(option: any, colors: Array<string>): void;

}
