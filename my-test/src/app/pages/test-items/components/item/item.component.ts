import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IItemElem } from '../../@types';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemComponent implements OnInit {

  @Input() itemData: IItemElem;

  constructor() { }

  ngOnInit(): void {
  }

}
