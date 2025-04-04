import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule
  ],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent {
  employees: any[] = [];
  departmentFilter: string = '';
  positionFilter: string = '';
  errorMessage: string = ''
  constructor(private employeeService: EmployeeService) {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees(this.departmentFilter, this.positionFilter).subscribe(
      data => this.employees = data,
      err => {
        console.error('Load failed:', err);
        this.errorMessage = 'Could not load employees.';
      }
    );
  }
  

  searchEmployees(): void {
    this.loadEmployees();
  }

  deleteEmployee(id: string): void {
    this.employeeService.deleteEmployee(id).subscribe(
      res => {
        console.log('Deleted:', res);
        this.loadEmployees();
      },
      err => {
        console.error('Delete failed:', err);
        this.errorMessage = 'Failed to delete employee.';
      }
    );
  }
  
}
