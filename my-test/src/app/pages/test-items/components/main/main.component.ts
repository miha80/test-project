import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { EFilterOptions, SelectedItemPayload } from '../../@types';
import { debounceTime, startWith, takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { IBaseState } from '../../store/reducers';
import { changeItemSelection, setItemFilter, setSearchQuery } from '../../store/actions';
import { getItemsSelector } from '../../store/selectors';
import { Item } from 'src/app/shared/models/item';

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
  items$: Observable<Item[]>;

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
    this.store.dispatch(setItemFilter({
      filter: this.filter.value,
    }));
  }

  onItemSelected($event: SelectedItemPayload) {
    this.store.dispatch(changeItemSelection($event));
  }

  ngOnInit(): void {
    this.search.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      takeUntil(this.componentDestroyed),
    ).subscribe((query: string) => {
      this.store.dispatch(setSearchQuery({query}));
    })

    this.items$ = this.store.select(getItemsSelector);
  }

  ngOnDestroy() {
    this.componentDestroyed.next(true);
    this.componentDestroyed.complete();
  }

}
