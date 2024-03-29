import { Injectable, Injector }  from '@angular/core';
import { BaseResourceService }   from "../../../shared/services/base-resource-service";
import { Observable }            from "rxjs";
import { flatMap, catchError, map }   from "rxjs/operators";

import { CategoryService }       from "../../categories/shared/category.service";
import { Entry }                 from "./entry.model";

import * as moment               from "moment";

@Injectable({
   providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry> {
   constructor(protected injector: Injector, private categoryService: CategoryService) {
      super("api/entries", injector, Entry.fromJson);
   }

   create(entry: Entry) : Observable<Entry> {
      return this.setCategoryAndSendtoServer(entry, super.create.bind(this));
   }

   update(entry: Entry) : Observable<Entry> {
      return this.setCategoryAndSendtoServer(entry, super.update.bind(this));
   }

   getMonthAndYear(month: number, year: number) : Observable<Entry[]> {      
      return this.getAll().pipe(
         map(entries => this.filterByMonthAndYear(entries, month, year)) 
      )
   }

   //Private Methods
   private filterByMonthAndYear(entries: Entry[], month: number, year: number) {
      return entries.filter(entry => {
         const entryDate = moment(entry.date, "DD/MM/YYYY");
         const monthMatches   = entryDate.month() + 1 == month;
         const yearMatches    = entryDate.year()      == year;

         if(monthMatches && yearMatches) return entry;

      })
   }

   private setCategoryAndSendtoServer(entry: Entry, sendFn: any): Observable<Entry> {
      return this.categoryService.getById(entry.categoryId).pipe(
         flatMap(category => {
            entry.category = category;
            return sendFn(entry);
         }),
         catchError(this.handleError)
      )
   }

}
