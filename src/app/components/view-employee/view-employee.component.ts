import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employee.service';

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
  
      
        const backendURL = 'http://localhost:5001'; 
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
