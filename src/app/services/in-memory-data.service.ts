import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  // override
  public createDb() {
    const employees: Employee[] = [
      {
        id: 1,
        name: 'Aden Woldesilassie',
        email: 'john@example.com',
        phone: '1234567890',
        jobTitle: 'Software Engineer',
      },
      {
        id: 2,
        name: 'William Johnson',
        email: 'jane@example.com',
        phone: '2345678901',
        jobTitle: 'Project Manager',
      },
      {
        id: 3,
        name: 'Trimity Akashoff',
        email: 'doe@example.com',
        phone: '3456789012',
        jobTitle: 'Software Engineer',
      },
      {
        id: 4,
        name: 'Jesus Christ',
        email: 'smith@example.com',
        phone: '4567890123',
        jobTitle: 'DevOps Engineer',
      },
    ];
    return { employees };
  }

  // override
  protected genId(employees: Employee[]): number {
    return employees.length > 0
      ? Math.max(...employees.map((employee) => employee.id)) + 1
      : 1;
  }
}
