import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

const materialElems = [
  MatSelectModule,
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    materialElems,
  ],
  exports: [

  ]
})
export class MaterialModule { }
