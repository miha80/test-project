import { Item } from "src/app/shared/models/item";

export enum EFilterOptions {
    ALL = 'ALL',
    FAVORITES_ONLY = 'FAVORITES_ONLY',
}

export type ItemFilter = (item: Item) => boolean

export type SelectedItemPayload = {
    id: number,
    isFavorite: boolean,
}