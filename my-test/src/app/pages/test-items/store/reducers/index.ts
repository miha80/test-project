import {createReducer, on} from '@ngrx/store';
import { setSearchQuery } from '../selectors';
import produce from 'immer';

export const TEST_ITEM_STORE_TOKEN = 'TEST_ITEM_STORE_TOKEN';

export interface IBaseState {
  searchQuery: string;
}

export const initialState: IBaseState = {
  searchQuery: '',
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

);