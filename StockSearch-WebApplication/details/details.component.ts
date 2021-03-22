import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Company } from "../Company";
import { Price } from "../Price";
import { DetailService } from "../detail.service";
import { ChartInfo } from "../chart-info";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy {

  ticker = this.route.snapshot.paramMap.get("ticker")

  public company_info: Company;
  public price_infos: Price[];

  counter: number;
  name: string;
  price_info: Price;
  lastPrice: number;
  prevClose: number;
  change: number;
  changePercent: number;
  priceColor: string;
  currTime: any;
  year: number;
  month: number;
  day: number;
  hou: number
  min: number;
  sec: number;
  prevTime: any;
  timeAdd: any;
  stamTime: any;
  loading = false;
  chartLoading: boolean;
  newsLoading: boolean;
  arrow: boolean;
  isClose: boolean;
  isReported: boolean;
  isClicked: boolean;
  closeReport1: boolean;
  closeReport2: boolean;
  closeReport3: boolean;
  check: boolean;
  buyReport: boolean;
  myStorage = window.localStorage;
  chartData: ChartInfo[];
  noChange: boolean;
  isSummary: boolean;
  interval: any;

  constructor(private route: ActivatedRoute, private detailService: DetailService) { }

  ngOnInit(): void {
    this.isReported = false;
    this.closeReport1 = false;
    this.closeReport2 = false;
    this.check = true;
    this.buyReport = false;
    this.closeReport3 = false;
    this.noChange = false;
    this.isSummary = true;

    if (this.myStorage[this.ticker.toUpperCase()+"-1"] != undefined) {
      this.isClicked = false;
    }
    else {
      this.isClicked = true;
    }

    this.counter = 0;
    this.detailService.getCompany(this.ticker).subscribe(data =>
    {this.company_info = data; this.counter = this.counter+1;
      if (this.company_info.ticker == undefined) {
        this.check = false;
      }
      else {
        this.name = this.company_info.name;
      }
    });

    this.currTime = new Date();
    /// call your function here
    this.detailService.getPrice(this.ticker).subscribe(data => {
      this.price_infos = data;
      this.price_info = this.price_infos[0];
      this.lastPrice = this.price_info.last;
      this.prevClose = this.price_info.prevClose;
      this.change = this.lastPrice - this.prevClose;
      this.changePercent = this.change / this.prevClose*100;
      if (this.change == 0) {
        this.noChange = true;
        this.priceColor = "text-align: right; color: black";
      }
      else {
        if (this.change < 0) {
          this.priceColor = "text-align: right; color: red";
          this.arrow = true;
        } else {
          this.priceColor = "text-align: right; color: green";
          this.arrow = false;
        }
      }
      {
        this.stamTime = new Date(this.price_info.timestamp);
        // console.log(this.stamTime)
        this.timeAdd = new Date(this.stamTime.getTime() + 60000);
      }
      if (this.currTime.getTime() > this.timeAdd.getTime()) {
        this.isClose = true;
      }
      else {
        this.isClose = false;
      }

      this.counter = this.counter + 1;
    });

    this.detailService.getChart(this.ticker).subscribe(data => {this.chartData = data; this.counter = this.counter+1});

    this.interval = setInterval(()=>
    {
      this.currTime = new Date();
      /// call your function here
      this.detailService.getPrice(this.ticker).subscribe(data => {
        this.price_infos = data;
        this.price_info = this.price_infos[0];
        this.lastPrice = this.price_info.last;
        this.prevClose = this.price_info.prevClose;
        this.change = this.lastPrice - this.prevClose;
        this.changePercent = this.change / this.prevClose*100;
        if (this.change == 0) {
          this.noChange = true;
          this.priceColor = "text-align: right; color: black";
        }
        else {
          if (this.change < 0) {
            this.priceColor = "text-align: right; color: red";
            this.arrow = true;
          } else {
            this.priceColor = "text-align: right; color: green";
            this.arrow = false;
          }
        }
        {
          this.stamTime = new Date(this.price_info.timestamp);
          // console.log(this.stamTime)
          this.timeAdd = new Date(this.stamTime.getTime() + 60000);
        }
        if (this.currTime.getTime() > this.timeAdd.getTime()) {
          this.isClose = true;
        }
        else {
          this.isClose = false;
        }
      });
      this.detailService.getChart(this.ticker).subscribe(data => {this.chartData = data; this.counter = this.counter+1});
    }, 15000);

    if (!this.chartLoading) {
      this.counter = this.counter+1;
    }

    if (!this.newsLoading) {
      this.counter = this.counter+1;
    }

  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  onClick() {
    this.closeReport1 = false;
    this.closeReport2 = false;
    this.isClicked = !this.isClicked;
    this.isReported = true;

    if (this.isClicked == false){
      this.myStorage.setItem(this.ticker.toUpperCase()+"-1", this.name);
      this.myStorage.setItem(this.ticker.toUpperCase()+"-2", String(this.lastPrice));
      this.myStorage.setItem(this.ticker.toUpperCase()+"-3",String(this.prevClose));
    }
    else {
      this.myStorage.removeItem(this.ticker.toUpperCase()+"-1");
      this.myStorage.removeItem(this.ticker.toUpperCase()+"-2");
      this.myStorage.removeItem(this.ticker.toUpperCase()+"-3")
    }

  }

  forceClose1() {
    this.closeReport1 = true;
  }

  forceClose3() {
    this.closeReport3 = true
  }

  forceClose2() {
    this.closeReport2 = true;
  }

  tabClick(tab) {
    const tabNum = tab.index
    if (tabNum == 0){
      this.isSummary = true;
    }
    else{
      this.isSummary = false;
    }
  }

}
