import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { filter, map, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-searchbox',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {

  contactForm: FormGroup;
  searchTerm = new Subject<string>();
  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  baseUrl = 'https://api.cdnjs.com/libraries';
  queryUrl = '?search=';
  @Output() searchResults: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder, private http: HttpClient
  ) {
    this.searchTerm.pipe(
      map((e: any) => e.target.value),
      debounceTime(1500),
      distinctUntilChanged(),
      filter( term => term.length > 0),
    ).subscribe( searchterm => {
      this.loading.emit(true);
      this._searchEntries(searchterm);
    }
    );
  }

  ngOnInit() {
    this.contactForm = this.fb.group({
      name: [null, Validators.required],
      message: [null, Validators.required]
    });
  }

  searchEntries(term): Observable<any> {
    return this.http.get(this.baseUrl + this.queryUrl + term).pipe(
      map(response => {
        this.searchResults.emit(response);
      })
    );
  }
  _searchEntries(term) {
    this.searchEntries(term).subscribe( response => {
      this.loading.emit(false);
    }, err => {
      this.loading.emit(false);
    });
  }

}
