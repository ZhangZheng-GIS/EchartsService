import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { EchartsService } from './echarts/echarts.service';
import { DataService } from './data.service';
import { HchartsService } from './hcharts/hcharts.service';

import { AppComponent } from './app.component';
import { EchartsComponent } from './echarts/echarts.component';
import { EchartsNg2Module } from 'echarts-ng2';
import { HchartsComponent } from './hcharts/hcharts.component';
import { Ng2HighchartsModule } from 'ng2-highcharts';

@NgModule({
  declarations: [
    AppComponent,
    EchartsComponent,
    HchartsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    EchartsNg2Module,
    Ng2HighchartsModule
  ],
  providers: [
    EchartsService,
    DataService,
    HchartsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
