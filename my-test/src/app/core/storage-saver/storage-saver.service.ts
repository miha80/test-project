import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE } from './local-storage';

@Injectable({
  providedIn: 'root'
})
export class StorageSaverService {

  constructor(@Inject(LOCAL_STORAGE) private localStorage: Storage) { }

  getItems<T>(storageKey: string): T {
    let items: T;
    try {
      items = JSON.parse(this.localStorage.getItem(storageKey));
    } catch (e) {
      return null;
    }
    return items as T;
  }

  saveItems<T>(storageKey: string, items: T): T {
    try {
      this.localStorage.setItem(storageKey, JSON.stringify(items));
    } catch (e) {
      return null;
    }
    return items;
  }
}
