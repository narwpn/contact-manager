import { Component, OnInit, inject } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from '../../models/employee';
import { AddEmployeeModalComponent } from '../add-employee-modal/add-employee-modal.component';
import { EditEmployeeModalComponent } from '../edit-employee-modal/edit-employee-modal.component';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrl: './employee-table.component.css',
})
export class EmployeeTableComponent implements OnInit {
  private employeeService = inject(EmployeeService);
  private modalService = inject(NgbModal);

  protected employees: Employee[] = [];

  public ngOnInit(): void {
    this.getEmployees();
  }

  private getEmployees(): void {
    this.employeeService
      .getEmployees()
      .subscribe((employees) => (this.employees = employees));
  }

  private addEmployee(employee: Omit<Employee, 'id'>): void {
    this.employeeService
      .addEmployee(employee)
      .subscribe((employee) => this.employees.push(employee));
  }

  protected deleteEmployee(id: number): void {
    this.employeeService
      .deleteEmployee(id)
      .subscribe(
        () => (this.employees = this.employees.filter((e) => e.id !== id))
      );
  }

  private updateEmployee(employee: Employee): void {
    this.employeeService
      .updateEmployee(employee)
      .subscribe(
        () =>
          (this.employees = this.employees.map((e) =>
            e.id === employee.id ? employee : e
          ))
      );
  }

  protected openAddEmployeeModal(): void {
    const modalRef = this.modalService.open(AddEmployeeModalComponent);
    modalRef.closed.subscribe(() => {
      this.addEmployee(modalRef.componentInstance.employee);
      modalRef.componentInstance.reset();
    });
  }

  protected openEditEmployeeModal(employee: Employee): void {
    const modalRef = this.modalService.open(EditEmployeeModalComponent);
    modalRef.componentInstance.employee = employee;
    modalRef.closed.subscribe(() => {
      this.updateEmployee(modalRef.componentInstance.employee);
      modalRef.componentInstance.reset();
    });
  }
}
