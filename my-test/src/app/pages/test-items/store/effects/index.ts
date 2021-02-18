import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { FakeHttpClientService } from 'src/app/core/fake-http-client/fake-http-client.service';
import { addItems, getNextPage, setPageLoaded } from '../actions';
import { catchError, mergeMap, startWith, switchMap, withLatestFrom } from 'rxjs/operators';
import { IBaseState } from '../reducers';
import { Store } from '@ngrx/store';
import { getLastPageLoadedSelector } from '../selectors';
import { EMPTY } from 'rxjs';

@Injectable()
export class TestItemsEffects {

  constructor(
    private actions$: Actions,
    private store: Store<IBaseState>,
    private fakeHttpClient: FakeHttpClientService,
  ) {
  }

  getPage$ = createEffect(() => this.actions$.pipe(
    startWith(getNextPage()),
    ofType(getNextPage),
    withLatestFrom(this.store.select(getLastPageLoadedSelector)),
    mergeMap(([_, lastPageNum]) => {
      const pageNum: number = Number.isInteger(lastPageNum) ? lastPageNum : -1;
      return this.fakeHttpClient.getItemsByPage(pageNum + 1).pipe(
        switchMap(items => {
          return [
            addItems({ items }),
            setPageLoaded({ pageNum: pageNum + 1 })
          ]
        }),
        catchError(e => {
          console.log(e);
          return EMPTY;
        })
      );
    })
  )
  
);

}
