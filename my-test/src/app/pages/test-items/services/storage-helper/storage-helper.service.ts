import { Injectable } from '@angular/core';
import { StorageSaverService } from 'src/app/core/storage-saver/storage-saver.service';
import { Item } from 'src/app/shared/models/item';
import { SelectedItemPayload } from '../../@types';

@Injectable({
  providedIn: 'root'
})
export class StorageHelperService {

  private readonly testItemsKey = 'testItemsKey';

  constructor(
    private storageSaverService: StorageSaverService
  ) { }

  changeStoredItemSelection($event: SelectedItemPayload) {
    let favoriteIds: number[] = this.storageSaverService.getItems<number[]>(this.testItemsKey) || [];
    if ($event?.isFavorite) {
      favoriteIds = [
        ...favoriteIds,
        $event?.id,
      ];
    } else {
      favoriteIds = favoriteIds.filter((nextId: number) => nextId !== $event?.id);
    }
    this.storageSaverService.saveItems<number[]>(this.testItemsKey, favoriteIds);
  }

  getSavedFavoriteIds(): number[] {
    return this.storageSaverService.getItems<number[]>(this.testItemsKey) || [];
  }
}
