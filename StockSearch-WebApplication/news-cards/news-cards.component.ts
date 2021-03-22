import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { DetailService } from "../detail.service";
import { NewsData } from "../news-data";
import { NewsInfo } from "../news-info";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-news-cards',
  templateUrl: './news-cards.component.html',
  styleUrls: ['./news-cards.component.css']
})
export class NewsCardsComponent implements OnInit {

  @Input() public parentTicker: string;
  @Output() newsLoading = new EventEmitter()
  news: NewsInfo;
  newArticle: NewsData[];
  image: string;
  title: string;
  closeResult = '';
  loading: boolean;

  constructor(private detailService: DetailService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loading = true;
    this.detailService.getNews(this.parentTicker).subscribe(data =>
    {this.news= data;this.newArticle = this.news.articles;
     this.loading = false; this.newsLoading.emit(this.loading)
    });
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

}
