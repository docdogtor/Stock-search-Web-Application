import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl} from '@angular/forms';
import {AutocompleteService} from "../autocomplete.service";
import {Candidate} from "../candidate";

export interface State {
  flag: string;
  name: string;
  population: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class SearchComponent implements OnInit {
  stockTicker: string;
  candidates: Candidate[];
  loading = false;
  timer: any;

  candidateCrtl = new FormControl();

  constructor(private autoCompleteService: AutocompleteService) {
  }
  ngOnInit(): void {
  }

  private getCandidates(): void {
    this.autoCompleteService.getCandidate(this.stockTicker)
      .subscribe(data => {this.candidates = data; this.loading = false;});
  }

  update(): void {
    if (this.timer){
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.loading = true;
        this.getCandidates();
      },300);
    }
    else{
      this.timer = setTimeout(() => {
        this.loading = true;
        this.getCandidates();
      },300);
    }
  }
}
