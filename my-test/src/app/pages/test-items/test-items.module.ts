import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { MainComponent } from './components/main/main.component';
import { ItemComponent } from './components/item/item.component';
import { StoreModule } from '@ngrx/store';
import { testItemsReducer, TEST_ITEM_STORE_TOKEN } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { TestItemsEffects } from './store/effects';
import { ItemsListComponent } from './components/items-list/items-list.component';



@NgModule({
  declarations: [
    MainComponent,
    ItemComponent,
    ItemsListComponent,
  ],
  imports: [
    SharedModule,
    StoreModule.forFeature(TEST_ITEM_STORE_TOKEN, testItemsReducer),
    EffectsModule.forFeature([ TestItemsEffects ]),
  ],
  exports: [
    MainComponent
  ]
})
export class TestItemsModule { }
