import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  loading: boolean;
  searchResult: any;

  constructor() {
  }

  updateResult(results: any) {
    this.searchResult = results;
  }

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  ngOnInit() {
  }

}
