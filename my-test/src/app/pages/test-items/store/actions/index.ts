import { createAction, props } from '@ngrx/store';
import { Item } from 'src/app/shared/models/item';

export const setSearchQuery = createAction(
  '[TEST ITEMS] Set Search Query',
  props<{ query: string }>()
);

export const getNextPage = createAction(
  '[TEST ITEMS] Get Next Page',
);

export const addItems = createAction(
  '[TEST ITEMS] Add Items',
  props<{ items: Item[] }>()
);

export const setPageLoaded = createAction(
  '[TEST ITEMS] Set Page Loaded',
  props<{ pageNum: number }>()
);