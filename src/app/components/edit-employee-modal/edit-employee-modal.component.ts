import { Component, Input, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-edit-employee-modal',
  templateUrl: './edit-employee-modal.component.html',
  styleUrl: './edit-employee-modal.component.css',
})
export class EditEmployeeModalComponent {
  protected activeModal = inject(NgbActiveModal);

  protected id: number = -1;

  protected editEmployeeForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{10}$/),
    ]),
    jobTitle: new FormControl('', [Validators.required]),
  });

  public set employee(employee: Employee) {
    this.id = employee.id;
    this.editEmployeeForm.setValue({
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      jobTitle: employee.jobTitle,
    });
  }

  public get employee(): Employee {
    return {
      id: this.id,
      name: this.editEmployeeForm.value.name,
      email: this.editEmployeeForm.value.email,
      phone: this.editEmployeeForm.value.phone,
      jobTitle: this.editEmployeeForm.value.jobTitle,
    } as Employee;
  }

  public reset(): void {
    this.id = -1;
    this.editEmployeeForm.reset();
  }
}
