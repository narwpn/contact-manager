import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-add-employee-modal',
  templateUrl: './add-employee-modal.component.html',
  styleUrl: './add-employee-modal.component.css',
})
export class AddEmployeeModalComponent {
  activeModal = inject(NgbActiveModal);

  addEmployeeForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{10}$/),
    ]),
    jobTitle: new FormControl('', [Validators.required]),
  });

  get employee(): Omit<Employee, 'id'> {
    return this.addEmployeeForm.value as Omit<Employee, 'id'>;
  }

  reset(): void {
    this.addEmployeeForm.reset();
  }
}
