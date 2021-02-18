import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IItemElem } from '../../@types';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemsListComponent implements OnInit {
 
  @Input() items: IItemElem[];

  constructor() { }

  ngOnInit(): void {
  }

}
