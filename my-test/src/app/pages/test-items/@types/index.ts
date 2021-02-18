import { Item } from "src/app/shared/models/item";

export interface IItemElem extends Item {
    isFavorite?: boolean;
}

export enum EFilterOptions {
    ALL = 'ALL',
    FAVORITES_ONLY = 'FAVORITES_ONLY',
}