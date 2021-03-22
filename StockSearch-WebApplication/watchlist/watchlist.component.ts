import {Component, OnInit} from '@angular/core';
import { DetailService } from "../detail.service";
import {Price} from "../Price";
import {interval} from "rxjs";

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit{
  myStorage = window.localStorage;
  t: string;
  info: object = {};
  arrow: boolean;
  priceColor: string;
  changePrice: number;
  changePercent: number;
  check: boolean = false;
  price_infos: Price[];
  price_info: Price;
  listLoading: boolean;
  noChange: boolean;
  i: number;
  interval: any;

  constructor(private detailService: DetailService) { }

  ngOnInit(): void {

    this.check = true;
    this.listLoading = true;
    this.i = 0;

    for (const key of Object.keys(this.myStorage)) {
      const tempObject = {};
      const l = key.length;
      if (key.substr(l-2,l) == "-1"){
        const tempTicker = key.substr(0,l-2);
        const key1 = tempTicker+"-1";
        const var1 = this.myStorage.getItem(key1);
        tempObject["name"] = var1;
        this.detailService.getPrice(tempTicker).subscribe(data => {
          this.price_infos = data;
          this.price_info = this.price_infos[0];
          tempObject["lp"] = this.price_info.last;
          tempObject["pp"] = this.price_info.prevClose;
          this.listLoading = false;
        });
        this.info[tempTicker.toUpperCase()]=tempObject;
      }
    }
    if (Object.entries(this.info).length == 0) {
      this.check = false;
    }

  }

  update(): void {

    for (const key of Object.keys(this.myStorage)) {
        const l = key.length;
        if (key.substr(l-2,l) == "-1"){
          const tempTicker = key.substr(0,l-2);
          this.detailService.getPrice(tempTicker).subscribe(data => {
            this.price_infos = data;
            this.price_info = this.price_infos[0];
            this.info[tempTicker].lp = this.price_info.last;
            this.info[tempTicker].pp = this.price_info.prevClose;
            this.listLoading = false;
          });
        }
      }
  }

  remove(ticker){
    let key1,key2,key3: string;
    key1 = ticker.toUpperCase()+"-1";
    key2 = ticker.toUpperCase()+"-2";
    key3 = ticker.toUpperCase()+"-3";

    delete this.info[ticker];
    this.myStorage.removeItem(key1);
    this.myStorage.removeItem(key2);
    this.myStorage.removeItem(key3);
    if (Object.entries(this.info).length != 0) {
      this.check = true;
    }
    else {
      this.check = false;
    }
  }

  change(value){
    this.noChange = false;
    this.changePrice = value.lp-value.pp;
    this.changePercent = this.changePrice/value.pp*100;
    if ((this.changePrice < 0.0000001 && this.changePrice > -0.0000001) || this.changePrice == NaN) {
      this.noChange = true;
      this.priceColor = "text-align: right; color: red";
    }
    else {
      if (this.changePrice < 0){
        this.priceColor="text-align: right; color: red";
        this.arrow = true;
      }
      else {
        this.priceColor="text-align: right; color: green";
        this.arrow = false;
      }
    }

  }

}
