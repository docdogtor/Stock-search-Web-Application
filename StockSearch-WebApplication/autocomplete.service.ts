import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Candidate } from "./candidate";

@Injectable({
  providedIn: 'root'
})

export class AutocompleteService {
  // preUrl = 'http://localhost:8000/';
  preUrl = 'https://stock-search-annex-1101.wn.r.appspot.com/';

  constructor(private http: HttpClient) { }

  getCandidate(ticker): Observable<Candidate[]>{
    const _url = this.preUrl + 'autocomplete/' + ticker;
    return this.http.get<Candidate[]>(_url);
  }
}
