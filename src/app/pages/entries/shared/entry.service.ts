import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, catchError, flatMap } from "rxjs/operators";

import { Entry } from "./entry.model";


@Injectable({
  providedIn: 'root'
})
export class EntryService {

  private apiPath: string = "api/entries";

  constructor(private http: HttpClient) { }

  getAll() : Observable<Entry[]> {
    return this.http.get(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataToCategories)
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
    return this.http.post(this.apiPath, entry).pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntry)     
    )
  }

  update(entry: Entry) : Observable<Entry> {
    const url = `${this.apiPath}/${entry.id}`;

    return this.http.put(url, entry).pipe(
      catchError(this.handleError),
      map(() => entry)     
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
  private jsonDataToCategories(jasonData: any[]): Entry[] {
    const  entries : Entry[] = [];
    jasonData.forEach(element => entries.push(element as Entry));
    return entries;
  }

  private jsonDataToEntry(jasonData: any): Entry {
    return jasonData as Entry;
  }

  private handleError(error: any): Observable<any> {
    console.log("Erro na Requisição => ", error);
    return throwError(error);
  }

}
