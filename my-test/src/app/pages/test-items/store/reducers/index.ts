import {createReducer, on} from '@ngrx/store';
import produce from 'immer';
import { Item } from 'src/app/shared/models/item';
import { EFilterOptions } from '../../@types';
import { addItems, changeItemSelection, setFavoriteIds, setItemFilter, setPageLoaded, setSearchQuery } from '../actions';

export const TEST_ITEM_STORE_TOKEN = 'TEST_ITEM_STORE_TOKEN';

export interface IBaseState {
  searchQuery: string;
  lastPageLoaded: number;
  items: Item[];
  selectedItems: number[];
  currentFilter: EFilterOptions;
  allFavoriteItemsIds: number[];
}

export const initialState: IBaseState = {
  searchQuery: '',
  lastPageLoaded: undefined,
  items: [],
  selectedItems: [],
  currentFilter: EFilterOptions.ALL,
  allFavoriteItemsIds: [],
};

export const testItemsReducer = createReducer(
  initialState,
  on(
    setSearchQuery,
    (state: IBaseState, action) => {
      return produce(
        state,
        (draftState: IBaseState) => {
          draftState.searchQuery = action?.query;
          return draftState;
        }
      );
    }
  ),
  on(
    setPageLoaded,
    (state: IBaseState, action) => {
      return produce(
        state,
        (draftState: IBaseState) => {
          draftState.lastPageLoaded = action?.pageNum;
          return draftState;
        }
      );
    }
  ),
  on(
    addItems,
    (state: IBaseState, action) => {
      return produce(
        state,
        (draftState: IBaseState) => {
          const newItems: Item[] = action.items.map((nextItem: Item) => {
            nextItem = {
              ...nextItem,
              isFavorite: draftState.allFavoriteItemsIds.includes(nextItem.id),
            };
            return nextItem;
          });
          draftState.items = [
            ...draftState.items,
            ...newItems,
          ];
          return draftState;
        }
      );
    }
  ),
  on(
    setItemFilter,
    (state: IBaseState, action) => {
      return produce(
        state,
        (draftState: IBaseState) => {
          draftState.currentFilter = action?.filter;
          return draftState;
        }
      );
    }
  ),
  on(
    changeItemSelection,
    (state: IBaseState, action) => {
      return produce(
        state,
        (draftState: IBaseState) => {
          if (action?.isFavorite) {
            draftState.allFavoriteItemsIds = [
              ...draftState.allFavoriteItemsIds,
              action?.id,
            ];
          } else {
            draftState.allFavoriteItemsIds = draftState.allFavoriteItemsIds.filter(nextId => {
              return nextId !== action?.id;
            });
          }
          const indexNeeded: number = draftState.items.findIndex(nextItem => nextItem.id === action?.id);
          draftState.items[indexNeeded].isFavorite = action?.isFavorite;
          return draftState;
        }
      );
    }
  ),
  on(
    setFavoriteIds,
    (state: IBaseState, action) => {
      return produce(
        state,
        (draftState: IBaseState) => {
          draftState.allFavoriteItemsIds = action?.ids;
          return draftState;
        }
      );
    }
  ),
);
