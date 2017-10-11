import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

import { EchartsService } from './echarts/echarts.service';
import { DataService } from './echarts/data.service';

import { AppComponent } from './app.component';
import { EchartsComponent } from './echarts/echarts.component';
import { EchartsNg2Module } from 'echarts-ng2';
@NgModule({
  declarations: [
    AppComponent,
    EchartsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    EchartsNg2Module
    
  ],
  providers: [
    EchartsService,
    DataService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
