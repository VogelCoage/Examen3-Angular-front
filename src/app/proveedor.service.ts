import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, of } from "rxjs";
import { Proveedor } from "./proveedor"
import { map, tap, catchError } from "rxjs/operators";
import { HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
export class ProveedorService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  proveedoresUrl = "http://localhost:8080/clientes";

    constructor(private http: HttpClient) {        
    }

    public getProveedores()
    {
         return this.http.get<Proveedor[]>(this.proveedoresUrl)
        .pipe(
          tap(_ => console.log('extrayendo catalogos')),
        catchError(this.handleError<Proveedor[]>('loadProveedor', []))
      );
    }
    
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {      
          // TODO: send the error to remote logging infrastructure
          console.error(error); // log to console instead      
          // TODO: better job of transforming error for user consumption
          console.log(`${operation} failed: ${error.message}`);      
          // Let the app keep running by returning an empty result.
          return of(result as T);
        };
      }

      /** POST: add a new proveedor to the server */
  agregaProveedor(proveedor: Proveedor): Observable<Proveedor> {
    return this.http.post<Proveedor>(this.proveedoresUrl, proveedor, this.httpOptions).pipe(
      tap((newProveedor: Proveedor) => console.log(`added proveedor w/ id=${newProveedor.id}`)),
      catchError(this.handleError<Proveedor>('addProveedor'))
    );
  }
}
