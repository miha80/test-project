import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Item } from 'src/app/shared/models/item';
import { SelectedItemPayload } from '../../@types';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemsListComponent implements OnInit {
 
  @Input() items: Item[];
  @Output() itemSelected: EventEmitter<SelectedItemPayload>;

  constructor() {
    this.itemSelected = new EventEmitter();
  }

  onItemSelected($event: SelectedItemPayload) {
    this.itemSelected.emit($event);
  }

  ngOnInit(): void {
  }

}
