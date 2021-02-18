import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { MainComponent } from './components/main/main.component';
import { ItemComponent } from './components/item/item.component';



@NgModule({
  declarations: [
    MainComponent,
    ItemComponent,
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    MainComponent
  ]
})
export class TestItemsModule { }
