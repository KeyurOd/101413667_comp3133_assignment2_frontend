import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private apollo: Apollo) { }

  signup(name: string, email: string, password: string): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation Signup($name: String!, $email: String!, $password: String!) {
          signup(name: $name, email: $email, password: $password) {
            token
            user {
              id
              name
              email
            }
          }
        }
      `,
      variables: { name, email, password }
    }).pipe(map((result: any) => {
      const token = result.data.signup.token;
      this.saveToken(token); 
      return result.data.signup.user;
    }));
  }

  login(email: string, password: string): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation Login($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            token
            user {
              id
              name
              email
            }
          }
        }
      `,
      variables: { email, password }
    }).pipe(
      map((result: any) => {
        const token = result?.data?.login?.token;
        if (token) {
          localStorage.setItem('token', token);
        }
        return result?.data?.login; 
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
