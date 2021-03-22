import {Component, OnInit} from '@angular/core';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DetailService} from "../detail.service";
import {Price} from "../Price";

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit{
  myStorage = window.localStorage;
  closeResult = '';
  t: string;
  info: object = {};
  arrow: boolean;
  priceColor: string;
  changePrice: number;
  check: boolean = false;
  public stockNum: any = 0;
  public sellNum: any = 0;
  price_infos: Price[];
  price_info: Price;
  listLoading: boolean;
  avgPrice: number;
  stamTime: any;
  timeAdd: any;
  currTime: any;
  closed: boolean;
  noChange: boolean;
  interval: any;

  constructor(private modalService: NgbModal, private detailService: DetailService) { }

  ngOnInit(): void {
    this.check = true;
    this.listLoading = true;
    this.noChange = false;
    this.currTime = new Date();

    for (const key of Object.keys(this.myStorage)) {
      const tempObject = {};
      const l = key.length;
      if (key.substr(l-2,l) == "-a"){
        const tempTicker = key.substr(0,l-2).toUpperCase();
        const key1 = tempTicker+"-a";
        const key2 = tempTicker+"-b";
        const key3 = tempTicker+"-c";
        const key4 = tempTicker+"-d";
        const key5 = tempTicker+"-e";
        const var1 = this.myStorage.getItem(key1);
        const var2 = parseFloat(this.myStorage.getItem(key2));
        const var3 = parseFloat(this.myStorage.getItem(key3));
        const var4 = parseFloat(this.myStorage.getItem(key4));
        const var5 = parseFloat(this.myStorage.getItem(key5));
        tempObject["name"] = var1;
        tempObject["lp"] = var2;
        tempObject["num"] = var4;
        tempObject["total"] = var5;
        this.detailService.getPrice(tempTicker).subscribe(data => {
          this.price_infos = data;
          this.price_info = this.price_infos[0];
          tempObject["cp"] = this.price_info.last;
          this.listLoading = false;
          this.stamTime = new Date(this.price_info.timestamp);
          this.timeAdd = new Date(this.stamTime.getTime() + 60000);

          if (this.currTime.getTime() > this.timeAdd.getTime()) {
            this.closed = true;
          }
          else {
            this.closed = false;
          }
        });
        this.info[tempTicker]=tempObject;
      }
    }
    console.log("initial!!!",this.info)
    if (Object.entries(this.info).length == 0) {
      this.check = false;
    }

  }

  update(): void {

    this.currTime = new Date();

    for (const key of Object.keys(this.myStorage)) {
        const l = key.length;
        if (key.substr(l-2,l) == "-a"){
          this.detailService.getPrice(key.substr(0,l-2).toUpperCase()).subscribe(data => {
            const tempTicker = key.substr(0,l-2).toUpperCase();
            this.price_infos = data;
            this.price_info = this.price_infos[0];
            this.info[tempTicker].cp = this.price_info.last;
            this.stamTime = new Date(this.price_info.timestamp);
            this.timeAdd = new Date(this.stamTime.getTime() + 60000);

            if (this.currTime.getTime() > this.timeAdd.getTime()) {
              this.closed = true;
            }
            else {
              this.closed = false;
            }
          });
        }
      }

    console.log("update!!!",this.info)
  }

  remove(ticker){
    let key1,key2,key3, key4, key5: string;
    key1 = ticker.toUpperCase()+"-a";
    key2 = ticker.toUpperCase()+"-b";
    key3 = ticker.toUpperCase()+"-c";
    key4 = ticker.toUpperCase()+"-d";
    key5 = ticker.toUpperCase()+"-e";

    delete this.info[ticker.toUpperCase()];
    this.myStorage.removeItem(key1);
    this.myStorage.removeItem(key2);
    this.myStorage.removeItem(key3);
    this.myStorage.removeItem(key4);
    this.myStorage.removeItem(key5);
    if (Object.entries(this.info).length != 0) {
      this.check = true;
    }
    else {
      this.check = false;
    }
  }

  change(value){
    this.noChange = false;
    this.avgPrice = value.total/value.num;
    this.changePrice = value.cp-this.avgPrice;
    if ((this.changePrice < 0.0000001 && this.changePrice > -0.0000001) || this.changePrice == NaN) {
      this.noChange = true;
      this.priceColor="text-align: right; color: black";
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

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'ticker'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  addNum(ticker){
    if (this.stockNum >= 0){
      const tempNum = +this.myStorage.getItem(ticker+"-d") + this.stockNum;
      this.myStorage.setItem(ticker+"-d",String(tempNum));
      this.info[ticker].num = tempNum;
      const tempTotal = +this.myStorage.getItem(ticker+"-e") + this.stockNum*parseFloat(this.info[ticker].cp);
      this.myStorage.setItem(ticker+"-e",String(tempTotal));
      this.info[ticker].total = tempTotal;
    }
  }

  minusNum(ticker){
    const tempNum = +this.myStorage.getItem(ticker+"-d") - this.sellNum;
    if (tempNum == 0) {
      this.remove(ticker);
    }
    else{
      this.myStorage.setItem(ticker+"-d",String(tempNum));
      this.info[ticker].num = tempNum;
      const tempTotal = +this.myStorage.getItem(ticker+"-e") - this.sellNum*parseFloat(this.info[ticker].cp);
      this.myStorage.setItem(ticker+"-e",String(tempTotal));
      this.info[ticker].total = tempTotal;
    }
  }

}
