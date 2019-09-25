import { NgModule }                         from '@angular/core';
import { CommonModule }                     from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule }                     from "@angular/router";
import { BreadCrumbComponent }              from './components/bread-crumb/bread-crumb.component';

@NgModule({
  declarations: [BreadCrumbComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    // Shared Modules
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    // Shared Components
    BreadCrumbComponent
  ]
})

export class SharedModule { }
