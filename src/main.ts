import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom, inject } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/cache';
import { setContext } from '@apollo/client/link/context';
import { environment } from './environments/enviroment';
import { AuthInterceptor } from '../src/interceptors/auth.interceptor';
import { AppComponent } from './app/app.component';
import { LoginComponent } from './app/components/login/login.component';
import { SignupComponent } from './app/components/signup/signup.component';
import { EmployeeListComponent } from './app/components/employee-list/employee-list.component';
import { AddEmployeeComponent } from './app/components/add-employee/add-employee.component';
import { ViewEmployeeComponent } from './app/components/view-employee/view-employee.component';
import { EmployeeDetailComponent } from './app/components/employee-detail/employee-detail.component';

function createApollo() {
  const httpLink = inject(HttpLink);
  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : '',
      },
    };
  });
  

  return {
    link: authLink.concat(httpLink.create({ uri: environment.graphqlEndpoint })),
    cache: new InMemoryCache(),
  };
  
}


bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideApollo(createApollo),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    provideRouter([
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'employees', component: EmployeeListComponent },
      { path: 'employee/view/:id', component: ViewEmployeeComponent },
      { path: 'employee/add', component: AddEmployeeComponent },
      { path: 'employee/edit/:id', component: EmployeeDetailComponent },
    ])
  ]
}).catch(err => console.error(err));
