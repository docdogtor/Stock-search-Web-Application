import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import { DailyData } from "../Daily-data";
import {DetailService} from "../detail.service";

@Component({
  selector: 'app-daily-chart',
  templateUrl: './daily-chart.component.html',
  styleUrls: ['./daily-chart.component.css']
})
export class DailyChartComponent implements OnInit {

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options;
  daily_info: DailyData[];
  @Input() public parentDown: boolean;
  @Input() public parentTicker: string;
  @Output() chartLoading = new EventEmitter()
  loading: boolean = true;

  constructor(private detailService: DetailService) { }

  ngOnInit(): void {

    this.detailService.getDaily(this.parentTicker).subscribe(data =>
    {this.daily_info = data;
      let i:number;
      let startI: number;
      let gmtTime: any;
      let pdtTime: any;
      let startTime: any;
      let localTime: any;
      let todayTime: any;
      let close_value = [];
      let color_up: string;

      if (this.parentDown) {
        color_up = "red";
      }
      else{
        color_up = "green";
      }
      startI = 0
      for (i=0;i<this.daily_info.length;i++){
        gmtTime = this.daily_info[i].date;
        pdtTime = new Date(gmtTime.toLocaleString());
        todayTime = new Date()
        localTime = Date.UTC(pdtTime.getFullYear(),pdtTime.getMonth(),pdtTime.getDate(),pdtTime.getHours(),pdtTime.getMinutes());
        startTime = Date.UTC(todayTime.getFullYear(),todayTime.getMonth(),todayTime.getDate(),6,30);
        if (localTime >= startTime){
          startI = i;
          // console.log(startTime)
          // console.log(localTime)
          // console.log(startI)
          break
        }
      }

      for (i=startI;i<this.daily_info.length;i++){
        gmtTime = this.daily_info[i].date;
        pdtTime = new Date(gmtTime.toLocaleString());
        localTime = Date.UTC(pdtTime.getFullYear(),pdtTime.getMonth(),pdtTime.getDate(),pdtTime.getHours(),pdtTime.getMinutes());
        startTime = Date.UTC(pdtTime.getFullYear(),pdtTime.getMonth(),pdtTime.getDate(),6,30);
        close_value.push([localTime,this.daily_info[i].close]);
      }

      this.chartOptions = {
        series: [{
          name: this.parentTicker.toUpperCase(),
          type: 'line',
          data: close_value,
          gapSize: 5,
          tooltip: {
            valueDecimals: 2
          },
          color: color_up,
          threshold: null
        }],
        rangeSelector: {
          enabled:false,
        }
      }
    this.loading = false; this.chartLoading.emit(this.loading);
    });

  }

}
