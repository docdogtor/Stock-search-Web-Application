import {Component, Input, OnInit} from '@angular/core';
import { DetailService } from "../detail.service";
import * as Highcharts from 'highcharts/highstock';
import { Options } from 'highcharts/highstock';
import IndicatorsCore from 'highcharts/indicators/indicators';
import vbp from 'highcharts/indicators/volume-by-price';
import {ChartInfo} from "../chart-info";

IndicatorsCore(Highcharts);
vbp(Highcharts);

@Component({
  selector: 'app-big-chart',
  templateUrl: './big-chart.component.html',
  styleUrls: ['./big-chart.component.css']
})
export class BigChartComponent implements OnInit {

  @Input() public parentData: ChartInfo[];
  @Input() public parentTicker: string;

  isHighcharts = typeof Highcharts === 'object';
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Options;
  chartType = 'StockChart';

  OHLC = [];
  Volume = [];

  constructor() { }

  ngOnInit(): void {
    for (let i = 0; i < this.parentData.length; i++) {
      const point = this.parentData[i];
      // console.log(point.date);
      // console.log(point.close);
      const time = new Date(point.date);
      // const t = new Date(time.getTime());  // + (offset * 60 * 1000)
      const year = time.getFullYear();
      const month = time.getMonth();
      const day = time.getDate();
      const hour = time.getHours();
      const min = time.getMinutes();
      const sec = time.getSeconds();
      const trueTime = Date.UTC(year, month, day, hour, min, sec);
      this.OHLC.push([trueTime, point.open, point.high, point.low, point.close]);
      this.Volume.push([trueTime, point.volume]);
    }

    this.chartOptions = {
      title: {
        text: this.parentTicker.toUpperCase() + ' Historical'
      },
      subtitle: {
        text: 'With SMA and Volume by Price technical indicators'
      },
      plotOptions: {
        column: {
          maxPointWidth: 15
        },
        candlestick: {
          maxPointWidth: 15
        },
        series: {
          dataGrouping: {
            units: [['week', [1]], ['month', [1, 2, 3, 4, 5, 6]]]
          }
        }
      },
      yAxis: [{
        startOnTick: false,
        endOnTick: false,
        labels: {
          align: 'right',
          x: -3
        },
        title: {
          text: 'OHLC'
        },
        height: '60%',
        lineWidth: 2,
        resize: {
          enabled: true
        }
      }, {
        labels: {
          align: 'right',
          x: -3
        },
        title: {
          text: 'Volume'
        },
        top: '65%',
        height: '35%',
        offset: 0,
        lineWidth: 2
      }],
      tooltip: {
        split: true
      },
      series: [{
        data: this.OHLC,
        type: 'candlestick',
        name: this.parentTicker,
        id: 'oneChart',
        zIndex : 2
      }, {
        type: 'column',
        name: 'Volume',
        id: 'volume',
        data: this.Volume,
        yAxis: 1
      }, {
        type: 'vbp',
        linkedTo: 'oneChart',
        params: {
          volumeSeriesID: 'volume'
        },
        dataLabels: {
          enabled: false
        },
        zoneLines: {
          enabled: false
        }
      }, {
        type: 'sma',
        linkedTo: 'oneChart',
        zIndex: 1,
        marker: {
          enabled: false
        }
      }]
    };
  }

}
