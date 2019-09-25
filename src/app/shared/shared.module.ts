import { NgModule }                         from '@angular/core';
import { CommonModule }                     from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule }                     from "@angular/router";
import { BreadCrumbComponent }              from './components/bread-crumb/bread-crumb.component';
import { PageHeaderComponent }              from './components/page-header/page-header.component';
import { FormFieldErrorComponent }          from './components/form-field-error/form-field-error.component';

@NgModule({
  declarations: [BreadCrumbComponent, PageHeaderComponent, FormFieldErrorComponent],
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
    BreadCrumbComponent,
    PageHeaderComponent,
    FormFieldErrorComponent
  ]
})

export class SharedModule { }
