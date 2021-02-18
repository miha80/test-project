import {createFeatureSelector, createSelector, props} from '@ngrx/store';
import { IBaseState, TEST_ITEM_STORE_TOKEN } from '../reducers';

export const testItemsFeatureSelector = createFeatureSelector<IBaseState>(TEST_ITEM_STORE_TOKEN);

export const getLastPageLoadedSelector = createSelector(
  testItemsFeatureSelector, (state: IBaseState) => {
    console.log('state.lastPageLoaded', state.lastPageLoaded)
    return state.lastPageLoaded;
  });

  export const getItemsSelector = createSelector(
    testItemsFeatureSelector, (state: IBaseState) => state.items);