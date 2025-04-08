# Work Manager API

A **NestJS**-based API for managing users, tasks, teams, and projects. This project is modular, scalable, and follows best practices for building server-side applications.

## Features

- **Users Management**: Create, update, and retrieve user information.
- **Tasks Management**: Manage tasks, subtasks, comments, and user assignments.
- **Teams Management**: Handle teams, their members, and associated projects.
- **Projects Management**: Manage projects, including teams, tasks, and users.
- **Authentication**: Placeholder for future authentication logic.

## Architecture

The project follows a modular architecture, with each module encapsulating its own functionality:

### Modules

- **UsersModule**: Handles user-related operations.
- **TasksModule**: Manages tasks and related entities.
- **TeamsModule**: Manages teams and their relationships with users and projects.
- **ProjectsModule**: Handles projects and their associated teams, tasks, and users.
- **AuthModule**: Placeholder for authentication logic.

### Controllers

Each module has its own controller to define API endpoints:

- **UsersController**: Endpoints for user CRUD operations.
- **TasksController**: Endpoints for task CRUD operations.
- **TeamsController**: Endpoints for team CRUD operations.
- **ProjectsController**: Endpoints for project CRUD operations.
- **AuthController**: Placeholder for authentication endpoints.

### Services

Each module has a service that contains the business logic:

- **UsersService**
- **TasksService**
- **TeamsService**
- **ProjectsService**
- **AuthService**

### DTOs

Data Transfer Objects (DTOs) are used for input validation:

- **CreateUserDto**: Validates user creation data.
- **UpdateUserDto**: Validates user update data.

### Validation

Global validation is enabled using `ValidationPipe` in `main.ts`. This ensures all incoming data is validated against the defined DTOs.

### Testing

Basic unit tests are included for controllers to ensure they are defined correctly.

## Setup

### Installation

```bash
$ npm install
```

### Running the Application

```bash
# Development
$ npm run start

# Watch mode
$ npm run start:dev

# Production
$ npm run start:prod
```

### Testing

```bash
# Unit tests
$ npm run test

# End-to-end tests
$ npm run test:e2e

# Test coverage
$ npm run test:cov
```

## Project Structure

```
src/
├── app.module.ts          # Root module
├── users/                 # Users module
├── tasks/                 # Tasks module
├── teams/                 # Teams module
├── projects/              # Projects module
├── auth/                  # Authentication module
└── main.ts                # Application entry point
```

## Future Improvements

- Implement authentication logic in the `AuthModule`.
- Add database integration for persistent data storage.
- Enhance test coverage with more comprehensive unit and integration tests.
- Add role-based access control (RBAC) for better security.

## License

This project is [MIT licensed](LICENSE).
