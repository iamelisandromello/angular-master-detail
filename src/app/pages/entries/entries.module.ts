import { NgModule }               from '@angular/core';
import { CommonModule }           from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EntriesRoutingModule }   from './entries-routing.module';
import { EntryListComponent }     from "./entry-list/entry-list.component";
import { EntryFormComponent }     from "./enttry-form/entry-form.component";

import { CalendarModule } from "primeng/calendar";
import { IMaskModule } from "angular-imask";


@NgModule({
  declarations: [EntryListComponent, EntryFormComponent],
  imports: [
    CommonModule,
    EntriesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    IMaskModule
  ]
})

export class EntriesModule { }
