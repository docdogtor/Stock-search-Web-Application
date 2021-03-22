import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html'
})

export class BuyComponent{
  closeResult = '';
  public stockNum: any = 0;
  totalPrice: number = 0.00;
  isDisabled: boolean = true;
  price: number;
  @Input() public parentTicker: string;
  @Input() public parentName: string;
  @Input() public currPrice: number;
  @Input() public prevPrice: number;
  @Input() public closed: boolean;
  @Output() bought = new EventEmitter()
  @Output() report = new EventEmitter()
  myStorage = window.localStorage;
  tempNum: number;
  tempTotal: number;
  buy: boolean = false;
  note: boolean = false;

  constructor(private modalService: NgbModal) {}

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

  total(){
    if (this.stockNum>=0){
      this.price = + this.currPrice
      this.totalPrice = this.price * this.stockNum;
    }
    return this.totalPrice;
  }

  addNum(){
    let tempTicker = this.parentTicker.toUpperCase()
    let key1 = tempTicker+"-a";
    let key2 = tempTicker+"-b";
    let key3 = tempTicker+"-c";
    let key4 = tempTicker+"-d";
    let key5 = tempTicker+"-e";
    this.buy = true;
    this.note = false;
    this.bought.emit(this.buy);
    this.report.emit(this.note);
    if (this.myStorage[key1] === undefined) {
      this.myStorage.setItem(key1,String(this.parentName));
      this.myStorage.setItem(key2,String(this.currPrice));
      this.myStorage.setItem(key3,String(this.prevPrice));
      this.myStorage.setItem(key4,String(this.stockNum));
      this.myStorage.setItem(key5,String(this.stockNum*this.currPrice))
    }
    else {
      this.tempNum = +this.myStorage.getItem(key4) + this.stockNum;
      this.tempTotal = +this.myStorage.getItem(key5) + this.stockNum*this.currPrice;
      this.myStorage.setItem(key4,String(this.tempNum));
      this.myStorage.setItem(key5,String(this.tempTotal))
    }
  }

}
