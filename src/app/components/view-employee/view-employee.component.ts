import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employee.service';
import { environment } from '../../../environments/enviroment';

@Component({
  selector: 'app-view-employee',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss']
})
export class ViewEmployeeComponent implements OnInit {
  employee: any;
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private employeeService: EmployeeService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.employeeService.getEmployeeById(id).subscribe(
      res => {
        console.log('Employee data:', res);

        // Use the backend URL from environment
        const backendURL = environment.backendUrl || 'https://one01413667-comp3133-assignment2-backend.onrender.com';
        const modifiedEmployee = {
          ...res,
          profilePicture: res.profilePicture?.startsWith('http')
            ? res.profilePicture
            : `${backendURL}${res.profilePicture}`
        };

        this.employee = modifiedEmployee;
      },
      err => {
        console.error('Error loading employee:', err);
        this.errorMessage = 'Failed to load employee details';
      }
    );
  }
}