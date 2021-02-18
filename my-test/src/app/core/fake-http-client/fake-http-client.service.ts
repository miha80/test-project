import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Item } from 'src/app/shared/models/item';

@Injectable({
  providedIn: 'root',
})
export class FakeHttpClientService {

  private readonly itemsPerPage = 50;

  constructor() { }

  getItemsByPage(pageNum: number): Observable<Item[]> {
    let items: Item[] = [];
    if (pageNum < 10) {
      items = Array.from({length: this.itemsPerPage}, (_, n: number) => {
        const num: number = this.itemsPerPage * pageNum + n;
        return {
          id: num,
          title: `Название ${num}`,
          description: `Описание ${num}`,
        };
      });
    }
    return from(Promise.resolve(items));
  }
}
