import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private apollo: Apollo) { }

  getEmployees(department?: string, position?: string): Observable<any> {
    return this.apollo.query({
      query: gql`
        query Employees($department: String, $position: String) {
          employees(department: $department, position: $position) {
            id
            firstName
            lastName
            department
            position
            profilePicture
            __typename
          }
        }
      `,
      variables: { department, position },
      fetchPolicy: 'network-only'
    }).pipe(map((result: any) => result.data.employees));
  }

  
  addEmployee(employee: { firstName: string, lastName: string, department: string, position: string, profilePicture?: string }): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation AddEmployee($firstName: String!, $lastName: String!, $department: String!, $position: String!, $profilePicture: String) {
          addEmployee(firstName: $firstName, lastName: $lastName, department: $department, position: $position, profilePicture: $profilePicture) {
            id
            firstName
            lastName
            department
            position
            profilePicture
          }
        }
      `,
      variables: employee
    }).pipe(map((result: any) => result.data.addEmployee));
  }

  updateEmployee(id: string, employee: any): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation UpdateEmployee(
          $id: ID!
          $firstName: String
          $lastName: String
          $department: String
          $position: String
          $profilePicture: String
        ) {
          updateEmployee(
            id: $id
            firstName: $firstName
            lastName: $lastName
            department: $department
            position: $position
            profilePicture: $profilePicture
          ) {
            id
            firstName
            lastName
            department
            position
            profilePicture
          }
        }
      `,
      variables: {
        id,
        ...employee
      }
    }).pipe(map((result: any) => result.data.updateEmployee));
  }
  

  deleteEmployee(id: string): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation DeleteEmployee($id: ID!) {
          deleteEmployee(id: $id) {
            success
            message
          }
        }
      `,
      variables: { id }
    }).pipe(map((result: any) => result.data.deleteEmployee));
  }
  
  

  getEmployeeById(id: string): Observable<any> {
    return this.apollo.query({
      query: gql`
        query Employee($id: ID!) {
          employee(id: $id) {
            id
            firstName
            lastName
            department
            position
            profilePicture
          }
        }
      `,
      variables: { id },
      fetchPolicy: 'network-only'
    }).pipe(map((res: any) => res.data.employee));
  }
}  
