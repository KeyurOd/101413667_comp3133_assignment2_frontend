import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { EmployeeService } from '../../services/employee.service';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {
  employeeForm!: FormGroup;
  selectedFile: File | null = null;
  errorMessage: string = '';
  employeeId!: string;
  previewImage: string = '';

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private fileUploadService: FileUploadService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.paramMap.get('id')!;
    console.log('Employee ID:', this.employeeId);

    this.employeeService.getEmployeeById(this.employeeId).subscribe(
      employee => {
        console.log('Employee data:', employee);

        this.employeeForm = this.fb.group({
          firstName: [employee.firstName, Validators.required],
          lastName: [employee.lastName, Validators.required],
          department: [employee.department, Validators.required],
          position: [employee.position, Validators.required],
          profilePicture: [employee.profilePicture]
        });

        const backendURL = 'http://localhost:5001';
        this.previewImage = employee.profilePicture?.startsWith('http')
        ? employee.profilePicture
        : `${backendURL}${employee.profilePicture}`;

      },
      err => {
        console.error('Error loading employee:', err);
        this.errorMessage = 'Employee not found';
      }
    );
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.previewImage = URL.createObjectURL(file);
    }
  }
  

  onUpdate(): void {
    if (this.employeeForm.valid) {
      if (this.selectedFile) {
        this.fileUploadService.uploadFile(this.selectedFile).subscribe(
          res => {
            const filePath = res.filePath;
            this.updateEmployee(filePath);
          },
          err => {
            this.errorMessage = 'File upload failed.';
          }
        );
      } else {
        this.updateEmployee();
      }
    }
  }

  updateEmployee(profilePicture: string = ''): void {
    const formData = this.employeeForm.value;

    if (!profilePicture) {
      profilePicture = formData.profilePicture;
    }

    const updatedData = {
      ...formData,
      profilePicture
    };

    this.employeeService.updateEmployee(this.employeeId, updatedData).subscribe(
      res => this.router.navigate(['/employees']),
      err => this.errorMessage = 'Update failed.'
    );
  }
}
