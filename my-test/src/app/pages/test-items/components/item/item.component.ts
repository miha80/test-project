import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Item } from 'src/app/shared/models/item';
import { SelectedItemPayload } from '../../@types';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemComponent implements OnInit, OnChanges {

  checkbox: FormControl;

  @Input() itemData: Item;
  @Output() selected: EventEmitter<SelectedItemPayload>;

  constructor() {
    this.selected = new EventEmitter();
    this.checkbox = new FormControl();
  }

  onSelectionChange() {
    this.selected.emit({
      id: this.itemData?.id,
      isFavorite: this.checkbox.value,
    });
  }

  ngOnChanges() {
    if (this.itemData?.isFavorite !== this.checkbox.value) {
      this.checkbox.setValue(this.itemData?.isFavorite);
    }
  }

  ngOnInit(): void {
  }

}
