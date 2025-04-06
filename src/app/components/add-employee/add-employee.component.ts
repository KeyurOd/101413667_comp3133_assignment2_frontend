import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { FileUploadService } from '../../services/file-upload.service';


@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent {
  employeeForm: FormGroup;
  selectedFile: File | null = null;
  imagePreviewUrl: string | null = null; 
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private fileUploadService: FileUploadService,
    private router: Router
  ) {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      department: ['', Validators.required],
      position: ['', Validators.required]
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];

  
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviewUrl = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      if (this.selectedFile) {
        this.fileUploadService.uploadFile(this.selectedFile).subscribe({
          next: (res) => {
            const filePath = res.filePath;
            this.createEmployee(filePath);
          },
          error: () => {
            this.errorMessage = 'File upload failed.';
          }
        });
      } else {
        this.createEmployee();
      }
    } else {
      this.errorMessage = 'Please fill out all required fields.';
    }
  }

  createEmployee(profilePicture: string = ''): void {
    const employeeData = { ...this.employeeForm.value, profilePicture };
    this.employeeService.addEmployee(employeeData).subscribe({
      next: () => this.router.navigate(['/employees']),
      error: () => (this.errorMessage = 'Failed to add employee.')
    });
  }
}