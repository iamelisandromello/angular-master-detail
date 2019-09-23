import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, catchError, flatMap } from "rxjs/operators";

import { CategoryService } from "../../categories/shared/category.service";
import { Entry } from "./entry.model";


@Injectable({
  providedIn: 'root'
})
export class EntryService {

  private apiPath: string = "api/entries";

  constructor(private http: HttpClient, private categoryService: CategoryService) { }

  getAll() : Observable<Entry[]> {
    return this.http.get(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntries)
    )
  }

  getById(id: number) : Observable<Entry> {
    const url = `${this.apiPath}/${id}`;

    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntry)
    )
  }

  cretae(entry: Entry) : Observable<Entry> {
    
    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap(category => {
        entry.category = category;
        return this.http.post(this.apiPath, entry).pipe(
          catchError(this.handleError),
          map(this.jsonDataToEntry)     
        )
      })
    )
  }

  update(entry: Entry) : Observable<Entry> {
    const url = `${this.apiPath}/${entry.id}`;

    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap(category => {
        entry.category = category;
        return this.http.put(url, entry).pipe(
          catchError(this.handleError),
          map(() => entry)     
        )
      })
    )
  }

  delete(id: number) : Observable<any> {
    const url = `${this.apiPath}/${id}`;

    return  this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)    
    )
  }

  //Privates Methods
  private jsonDataToEntries(jsonData: any[]): Entry[] {
    const entries: Entry[] = [];

    jsonData.forEach(element => {
      const entry = Object.assign(new Entry(), element);
      entries.push(entry);
    });

    return entries;
  }

  private jsonDataToEntry(jasonData: any): Entry {
    return Object.assign(new Entry(), jasonData);;
  }

  private handleError(error: any): Observable<any> {
    console.log("Erro na Requisição => ", error);
    return throwError(error);
  }

}
