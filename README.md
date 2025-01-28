```markdown
# User Management System - Angular 14

This project is a simple user management system built using **Angular 14** and **Angular Material**. It includes functionalities such as displaying users, adding, editing, deleting users, pagination, role management, and more. The application uses **local storage** for data persistence.

## Features

- **User List**: Displays a list of users with their name, email, and role.
- **Add User**: Add a new user to the system with fields for name, email, and role.
- **Edit User**: Edit existing user details.
- **Delete User**: Delete users from the list with a confirmation dialog.
- **Role Management**: Assign roles (Admin/User) to users.
- **Search**: Search users by name or email.
- **Pagination**: Display users in pages, 10 users per page.
- **Responsive Design**: Fully responsive on both desktop and mobile devices.

## Prerequisites

Before you begin, ensure that you have the following installed on your machine:

1. **Node.js**: The current LTS version of Node.js can be downloaded from [here](https://nodejs.org/).
2. **Angular CLI**: Install Angular CLI globally by running the following command:

   ```bash
   npm install -g @angular/cli
   ```

3. **Git**: Make sure Git is installed to clone the repository.

## Getting Started

Follow these steps to get the project running on your local machine.

### 1. Clone the Repository

First, clone the repository to your local machine using Git:

```bash
git clone https://github.com/your-username/user-management-angular.git
```

### 2. Install Dependencies

Navigate to the project directory:

```bash
cd user-management-angular
```

Then, install the required dependencies:

```bash
npm install
```

This will install all the necessary packages, including Angular Material and other dependencies.

### 3. Serve the Application

To run the application in development mode, use the following command:

```bash
ng serve
```

This will start the development server. The application will be accessible in your browser at:

```
http://localhost:4200
```

### 4. Build the Application

To build the project for production, use the following command:

```bash
ng build --prod
```

This will generate a `dist/` folder with optimized files that can be deployed to a web server. The build will be in production mode, which includes optimizations such as minification and tree-shaking.

### 5. Run Unit Tests

To run unit tests with Karma, use:

```bash
ng test
```

This will run the tests in the background and show the results in the terminal.

### 6. Run End-to-End Tests

To run end-to-end tests with Protractor, use:

```bash
ng e2e
```

This will execute the e2e tests.

## Project Structure

Here's an overview of the main files and folders in the project:

```
src/
  app/
    models/
      user.model.ts              # User data model
    services/
      user.service.ts            # Service for managing users (CRUD operations)
    components/
      user-list/
        user-list.component.ts   # User list component
        user-list.component.html # Template for the user list
        user-list.component.css  # Styles for the user list
      add-user-dialog/
        add-user-dialog.component.ts   # Add/Edit user dialog component
        add-user-dialog.component.html  # Template for the add/edit dialog
        add-user-dialog.component.css   # Styles for the add/edit dialog
    app.module.ts                # Main module (importing Angular Material modules, etc.)
    app.component.ts             # Root component
    app.component.html           # Root component template
    app.component.css            # Root component styles
  assets/
    # Any static assets (images, fonts, etc.)
  environments/
    environment.ts               # Environment settings (for development)
    environment.prod.ts          # Environment settings (for production)
  index.html                     # Main HTML file
  styles.css                     # Global styles
  angular.json                   # Angular CLI configuration
  package.json                   # NPM package configuration
  tsconfig.json                  # TypeScript configuration
```

## Angular Material

This project uses Angular Material for UI components. The following modules are imported in the `app.module.ts` file:

- **MatDialogModule**: For opening dialogs.
- **MatTableModule**: For displaying the user table.
- **MatPaginatorModule**: For pagination.
- **MatSortModule**: For sorting the table.
- **MatFormFieldModule**: For form fields.
- **MatInputModule**: For input fields.
- **MatButtonModule**: For buttons.
- **MatSelectModule**: For select dropdown.

## Local Storage

The application uses **local storage** to persist user data. It retrieves the list of users from `localStorage` and allows adding, editing, and deleting users directly in the local storage.

### User Service

The `UserService` provides methods for managing the users:

- **getUsers()**: Fetches the list of users from local storage.
- **addUser(user: User)**: Adds a new user to local storage.
- **updateUser(user: User)**: Updates an existing user.
- **deleteUser(email: string)**: Deletes a user by email.

## Contributing

Feel free to fork the repository and submit pull requests for improvements, bug fixes, or new features. When contributing, please ensure that your code follows the style guidelines and includes appropriate tests.

### Code Style

- Follow Angular’s style guide: https://angular.io/guide/styleguide.
- Use **ESLint** for linting.
- Use **Prettier** for code formatting.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

### Troubleshooting

If you run into issues while building or serving the project, here are some things to check:

1. **Node.js version**: Ensure you're using a supported version of Node.js (LTS recommended).
2. **Angular version mismatch**: Ensure all packages are compatible with Angular 14. You can check the version in `package.json`.
3. **Dependencies**: Make sure all dependencies are installed by running `npm install`.

Let me know if you need help with anything else!
