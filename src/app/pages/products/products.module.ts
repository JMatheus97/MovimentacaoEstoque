import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductNewComponent } from './product-new/product-new.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductEditComponent } from './product-edit/product-edit.component';



@NgModule({
  declarations: [
    ProductsListComponent,
    ProductNewComponent,
    ProductEditComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
  ]
})
export class ProductsModule { }
