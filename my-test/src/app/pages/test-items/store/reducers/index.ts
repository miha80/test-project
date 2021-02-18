import {createReducer, on} from '@ngrx/store';
import produce from 'immer';
import { Item } from 'src/app/shared/models/item';
import { addItems, setPageLoaded, setSearchQuery } from '../actions';

export const TEST_ITEM_STORE_TOKEN = 'TEST_ITEM_STORE_TOKEN';

export interface IBaseState {
  searchQuery: string;
  lastPageLoaded: number;
  items:Item[];
  selectedItems: number[];
}

export const initialState: IBaseState = {
  searchQuery: '',
  lastPageLoaded: undefined,
  items: [],
  selectedItems: [],
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
          draftState.items = [
            ...draftState.items,
            ...action?.items,
          ];
          return draftState;
        }
      );
    }
  ),
);