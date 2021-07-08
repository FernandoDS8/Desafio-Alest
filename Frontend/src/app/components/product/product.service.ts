import { map, catchError } from 'rxjs/operators';
import { Product } from './product.model';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = 'http://localhost:8080/api';

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string, isError: boolean = false): void{
    this.snackBar.open(msg,'x',{
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    });
  }

  create(product: Product): Observable<Product>
  {
    return this.http.post<Product>(this.baseUrl+'/livro',product).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

errorHandler(e:any): Observable<any>{
  // this.showMessage('Ocorreu um erro!', true);
  return EMPTY;
}

  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl+'/livros').pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  readById(id:string): Observable<Product>{
    const url = `${this.baseUrl}/livro/${id}`;
    return this.http.get<Product>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  update(product:Product,id:string): Observable<Product>{
    console.log(product);
    const url = `${this.baseUrl}/livro/${id}`;
    return this.http.put<Product>(url,product).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  delete(id:string): Observable<Product>{
    const url = `${this.baseUrl}/livro/${id}`;
    return this.http.delete<Product>(url).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }
}