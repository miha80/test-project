import {createFeatureSelector, createSelector, props} from '@ngrx/store';
import { Item } from 'src/app/shared/models/item';
import { EFilterOptions, ItemFilter } from '../../@types';
import { IBaseState, TEST_ITEM_STORE_TOKEN } from '../reducers';

export const testItemsFeatureSelector = createFeatureSelector<IBaseState>(TEST_ITEM_STORE_TOKEN);

export const getLastPageLoadedSelector = createSelector(
  testItemsFeatureSelector, (state: IBaseState) => {
    return state.lastPageLoaded;
  });

const getMatchSearchQuery: (state: IBaseState) => ItemFilter = (state: IBaseState) => {
  const sq: string = state.searchQuery.toLocaleLowerCase().trim();
  return (item: Item) => {
    return item?.title.toLocaleLowerCase().includes('sq') || item.description.toLocaleLowerCase().includes(sq);
  }
}

const getAllFilters: (state: IBaseState) => ItemFilter[] = (state: IBaseState) => {
  let allFilters: ItemFilter[] = [];
  if (state.currentFilter === EFilterOptions.FAVORITES_ONLY) {
    allFilters = [
      (item: Item) => item?.isFavorite,
    ];
  }
  if (state.searchQuery) {
    allFilters = [
      ...allFilters,
      getMatchSearchQuery(state),
    ];
  }
  return allFilters
}

export const getItemsSelector = createSelector(
  testItemsFeatureSelector, (state: IBaseState) => {
    const allFilters: ItemFilter[] = getAllFilters(state);
    if (!allFilters?.length) {
      return state.items;
    }
    return state.items.filter((nextItem: Item) => {
      return allFilters.every((nextFilter: ItemFilter) => nextFilter(nextItem));
    })
  });