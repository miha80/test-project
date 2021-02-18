import { createAction, props } from '@ngrx/store';
import { Item } from 'src/app/shared/models/item';
import { EFilterOptions, SelectedItemPayload } from '../../@types';

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

export const setItemFilter = createAction(
  '[TEST ITEMS] Set Item Filter',
  props<{ filter: EFilterOptions }>()
);

export const changeItemSelection = createAction(
  '[TEST ITEMS] Change Item Selection',
  props<SelectedItemPayload>()
);

export const setFavoriteIds = createAction(
  '[TEST ITEMS] Set Favorite Ids',
  props<{ ids: number[] }>()
);