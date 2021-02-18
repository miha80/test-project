import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Item } from 'src/app/shared/models/item';
import { SelectedItemPayload } from '../../@types';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemComponent implements OnInit {

  @Input() itemData: Item;
  @Output() selected: EventEmitter<SelectedItemPayload>;

  constructor() {
    this.selected = new EventEmitter();
  }

  onSelectionChange($event: Event) {
    const isChecked: boolean = ($event.target as HTMLInputElement).checked;
    this.selected.emit({
      id: this.itemData?.id,
      isFavorite: isChecked,
    });
  }

  ngOnInit(): void {
  }

}
