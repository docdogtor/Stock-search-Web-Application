import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Company } from "./Company";
import { Price } from "./Price";
import { DailyData } from "./Daily-data";
import { NewsData } from "./news-data";
import { NewsInfo } from "./news-info";
import { ChartInfo } from "./chart-info";

@Injectable({
  providedIn: 'root'
})
export class DetailService {
  // preUrl = 'http://localhost:8000/';
  preUrl = 'https://stock-search-annex-1101.wn.r.appspot.com/';

  constructor(private http: HttpClient) { }

  getCompany(ticker): Observable<Company>{
    const _url = this.preUrl + 'detail/' + ticker;
    return this.http.get<Company>(_url);
  }

  getPrice(ticker): Observable<Price[]>{
    const url_2 = this.preUrl + 'price/' + ticker;
    return this.http.get<Price[]>(url_2);
  }

  getDaily(ticker): Observable<DailyData[]>{
    const url_3 = this.preUrl + 'daily/' + ticker;
    return this.http.get<DailyData[]>(url_3);
  }

  getNews(ticker): Observable<NewsInfo>{
    const url_4 = this.preUrl + 'news/' + ticker;
    return this.http.get<NewsInfo>(url_4);
  }

  getChart(ticker): Observable<ChartInfo[]>{
    const url_5 = this.preUrl + 'year/' + ticker;
    return this.http.get<ChartInfo[]>(url_5);
  }
}
