import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { FakeHttpClientService } from 'src/app/core/fake-http-client/fake-http-client.service';
import { addItems, changeItemSelection, getNextPage, setFavoriteIds, setPageLoaded } from '../actions';
import { catchError, map, mergeMap, startWith, switchMap, take, tap, withLatestFrom } from 'rxjs/operators';
import { IBaseState } from '../reducers';
import { Store } from '@ngrx/store';
import { getLastPageLoadedSelector } from '../selectors';
import { EMPTY } from 'rxjs';
import { StorageHelperService } from '../../services/storage-helper/storage-helper.service';

@Injectable()
export class TestItemsEffects {

  constructor(
    private actions$: Actions,
    private store: Store<IBaseState>,
    private fakeHttpClient: FakeHttpClientService,
    private storageHelper: StorageHelperService,
  ) {
  }

  initFavoriteIds$ = createEffect(() => this.actions$.pipe(
    startWith(),
    take(1),
    map(() => {
      let savedFavoriteIds: number[] = this.storageHelper.getSavedFavoriteIds();
      return setFavoriteIds({ ids: savedFavoriteIds });
    }),
    tap(() => this.store.dispatch(getNextPage())),
  ));

  getPage$ = createEffect(() => this.actions$.pipe(
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
  ));

  saveSelectionInLocalStorage$ = createEffect(() => this.actions$.pipe(
    ofType(changeItemSelection),
    tap((action) => {
      this.storageHelper.changeStoredItemSelection(action);
    })
  ), {dispatch: false});

}
