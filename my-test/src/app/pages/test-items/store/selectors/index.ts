import { createAction, props } from '@ngrx/store';

export const setSearchQuery = createAction(
  '[TEST ITEMS] Set Search Query',
  props<{ query: string }>()
);