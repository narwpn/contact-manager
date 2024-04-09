import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private http = inject(HttpClient);

  private employeesUrl = 'api/employees';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  public getEmployees(): Observable<Employee[]> {
    return this.http
      .get<Employee[]>(this.employeesUrl)
      .pipe(catchError(this.errorHandler<Employee[]>('getEmployees', [])));
  }

  public getEmployee(id: number): Observable<Employee> {
    const url = `${this.employeesUrl}/${id}`;
    return this.http
      .get<Employee>(url)
      .pipe(catchError(this.errorHandler<Employee>('getEmployee')));
  }

  public updateEmployee(employee: Employee): Observable<any> {
    return this.http
      .put(this.employeesUrl, employee, this.httpOptions)
      .pipe(catchError(this.errorHandler<any>('updateEmployee')));
  }

  public addEmployee(employee: Omit<Employee, 'id'>): Observable<Employee> {
    return this.http
      .post<Employee>(this.employeesUrl, employee, this.httpOptions)
      .pipe(catchError(this.errorHandler<Employee>('addEmployee')));
  }

  public deleteEmployee(id: number): Observable<Employee> {
    const url = `${this.employeesUrl}/${id}`;

    return this.http
      .delete<Employee>(url, this.httpOptions)
      .pipe(catchError(this.errorHandler<Employee>('deleteEmployee')));
  }

  private errorHandler<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
