# Employee Management Frontend

This is the frontend of an Employee Management System built with Angular, using Angular Material for UI components. It provides features like employee CRUD operations, login/signup authentication, and profile picture uploads.

## Prerequisites
- Node.js (v16.x or later)
- npm (v8.x or later)
- Angular CLI (install globally: `npm install -g @angular/cli`)

## Setup Instructions
1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd employee-management-frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   - Create a file named `environment.ts` in `src/environments/` with:
     ```typescript
     export const environment = {
       production: false,
       apiUrl: 'http://localhost:5001/api' // Adjust to your backend URL
     };
     ```
   - For production, update `environment.prod.ts` accordingly.

4. **Run the Application**
   ```bash
   ng serve
   ```
   - Open your browser at `http://localhost:4200`.


## Features
- **Login/Signup**: User authentication with email and password.
- **Employee Management**:
  - Add employees with profile pictures.
  - View, edit, and delete employee details.
  - Search employees by department and position.
- **Responsive UI**: Styled with Angular Material and custom SCSS using `%` and `rem`.

## Usage
1. **Login**: Navigate to `/login`, enter credentials, and access the employee list.
2. **Signup**: Go to `/signup` to create a new account.
3. **Employee List**: View at `/employees`, use search filters, and perform CRUD actions.
4. **Add Employee**: Click "Add Employee" to create a new record.
5. **View/Edit**: Use action buttons in the table to view or edit employee details.

## Dependencies
- `@angular/core`, `@angular/forms`, `@angular/router`
- `@angular/material` (for UI components)
- Custom SCSS for styling

## Notes
- Ensure the backend API is running at the configured `apiUrl`.
- Profile pictures are fetched from the backend URL (e.g., `http://localhost:5001`).
