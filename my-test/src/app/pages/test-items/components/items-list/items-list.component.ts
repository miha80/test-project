import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef,
        EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { Item } from 'src/app/shared/models/item';
import { SelectedItemPayload } from '../../@types';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemsListComponent implements AfterViewInit, OnDestroy {

  private intersectObserver: IntersectionObserver;
  @ViewChild('itemContainer') private itemContainer: ElementRef<HTMLDivElement>;
  @ViewChild('intersectionAnchor', { static: false }) intersectionAnchor: ElementRef;

  @Input() items: Item[];
  @Output() itemSelected: EventEmitter<SelectedItemPayload>;
  @Output() needItems: EventEmitter<boolean>;

  constructor(
    private host: ElementRef,
  ) {
    this.itemSelected = new EventEmitter();
    this.needItems = new EventEmitter();
  }

  onItemSelected($event: SelectedItemPayload) {
    this.itemSelected.emit($event);
  }

  setIntersectionObserverForScrolling() {
    if (this.intersectionAnchor?.nativeElement && !this.intersectObserver) {
      this.intersectObserver = new IntersectionObserver(
        ([entry]) => entry.isIntersecting && this.needItems.emit(true),
        {
          root: this.host.nativeElement,
        }
      );
      this.intersectObserver.observe(this.intersectionAnchor.nativeElement);
    }

  }

  ngAfterViewInit(): void {
    this.setIntersectionObserverForScrolling();
  }

  ngOnDestroy() {
    this.intersectObserver.disconnect();
  }
}
