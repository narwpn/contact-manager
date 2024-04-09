import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  http = inject(HttpClient);

  employeesUrl = 'api/employees';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getEmployees(): Observable<Employee[]> {
    return this.http
      .get<Employee[]>(this.employeesUrl)
      .pipe(catchError(this.errorHandler<Employee[]>('getEmployees', [])));
  }

  getEmployee(id: number): Observable<Employee> {
    const url = `${this.employeesUrl}/${id}`;
    return this.http
      .get<Employee>(url)
      .pipe(catchError(this.errorHandler<Employee>('getEmployee')));
  }

  updateEmployee(employee: Employee): Observable<any> {
    return this.http
      .put(this.employeesUrl, employee, this.httpOptions)
      .pipe(catchError(this.errorHandler<any>('updateEmployee')));
  }

  addEmployee(employee: Omit<Employee, 'id'>): Observable<Employee> {
    return this.http
      .post<Employee>(this.employeesUrl, employee, this.httpOptions)
      .pipe(catchError(this.errorHandler<Employee>('addEmployee')));
  }

  deleteEmployee(id: number): Observable<Employee> {
    const url = `${this.employeesUrl}/${id}`;

    return this.http
      .delete<Employee>(url, this.httpOptions)
      .pipe(catchError(this.errorHandler<Employee>('deleteEmployee')));
  }

  errorHandler<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
