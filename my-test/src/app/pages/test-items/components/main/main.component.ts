import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { EFilterOptions } from '../../@types';
import { debounceTime, startWith, takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { IBaseState } from '../../store/reducers';
import { setSearchQuery } from '../../store/selectors';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  testForm: FormGroup;
  search: FormControl;
  filter: FormControl;
  allFilterOptions = EFilterOptions;
  private componentDestroyed: Subject<boolean>;

  constructor(
    private builder: FormBuilder,
    private store: Store<IBaseState>,
  ) {
    this.search = new FormControl();
    this.filter = new FormControl(this.allFilterOptions.ALL);
    this.testForm = this.builder.group({
      search: this.search,
      filter: this.filter,
    });
    this.componentDestroyed = new Subject();
  }

  onFilterChange() {
  }

  ngOnInit(): void {
    this.search.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      takeUntil(this.componentDestroyed),
    ).subscribe((query: string) => {
      this.store.dispatch(setSearchQuery({query}));
    })

  }

  ngOnDestroy() {
    this.componentDestroyed.next(true);
    this.componentDestroyed.complete();
  }

}
