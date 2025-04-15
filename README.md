# Work Manager API

A **NestJS**-based API for managing users, tasks, teams, and projects. This project is modular, scalable, and follows best practices for building server-side applications.

## Features

- **Users Management**: Create, update, and retrieve user information.
- **Tasks Management**: Manage tasks, assign users, and retrieve tasks by project or user.
- **Teams Management**: Handle teams, their members, and associated projects.
- **Projects Management**: Manage projects, including teams, tasks, and users.
- **Authentication**: JWT-based authentication for secure access to endpoints.
- **Validation**: DTO-based validation for all incoming requests.
- **Global Error Handling**: Centralized exception handling using a custom exception filter.
- **Swagger Documentation**: Auto-generated API documentation for easy integration.

## Architecture

The project follows a modular architecture, with each module encapsulating its own functionality:

### Modules

- **UsersModule**: Handles user-related operations.
- **TasksModule**: Manages tasks and related entities.
- **TeamsModule**: Manages teams and their relationships with users and projects.
- **ProjectsModule**: Handles projects and their associated teams, tasks, and users.
- **AuthModule**: Manages authentication and authorization.

### Controllers

Each module has its own controller to define API endpoints:

- **UsersController**: Endpoints for user CRUD operations.
- **TasksController**: Endpoints for task CRUD operations and user-task assignments.
- **TeamsController**: Endpoints for team CRUD operations and user-team management.
- **ProjectsController**: Endpoints for project CRUD operations and team-project associations.
- **AuthController**: Endpoints for user authentication.

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
- **CreateTaskDto**: Validates task creation data.
- **UpdateTaskDto**: Validates task update data.
- **CreateProjectDto**: Validates project creation data.
- **UpdateProjectDto**: Validates project update data.

### Validation

Global validation is enabled using `ValidationPipe` in `main.ts`. This ensures all incoming data is validated against the defined DTOs.

### Testing

Basic unit tests are included for controllers and services to ensure they are defined correctly and work as expected.

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
├── auth/                  # Authentication module
├── users/                 # Users module
├── tasks/                 # Tasks module
├── teams/                 # Teams module
├── projects/              # Projects module
├── interceptors/          # Global response interceptor
├── filters/               # Global exception filter
└── main.ts                # Application entry point
```

## Endpoints

### Authentication

| Method | Endpoint | Description                         |
| ------ | -------- | ----------------------------------- |
| POST   | `/login` | User login with email and password. |

### Users

| Method | Endpoint      | Description                                      |
| ------ | ------------- | ------------------------------------------------ |
| GET    | `/me`         | Retrieve the current user's profile.             |
| GET    | `/users`      | Retrieve all users with pagination.              |
| GET    | `/users/:id`  | Retrieve a user by ID.                           |
| POST   | `/user`       | Create a new user.                               |
| PUT    | `/user`       | Update an existing user.                         |
| GET    | `/user/teams` | Retrieve teams associated with the current user. |

### Tasks

| Method | Endpoint                  | Description                                      |
| ------ | ------------------------- | ------------------------------------------------ |
| GET    | `/tasks`                  | Retrieve all tasks assigned to the current user. |
| GET    | `/tasks/:id`              | Retrieve a specific task by ID.                  |
| POST   | `/task`                   | Create a new task.                               |
| PUT    | `/task`                   | Update an existing task.                         |
| POST   | `/task/:id/users`         | Assign a user to a task.                         |
| DELETE | `/task/:id/users/:userId` | Remove a user from a task.                       |
| GET    | `/project/:id/tasks`      | Retrieve all tasks for a specific project.       |

### Teams

| Method | Endpoint                  | Description                            |
| ------ | ------------------------- | -------------------------------------- |
| GET    | `/teams`                  | Retrieve all teams.                    |
| GET    | `/teams/:id`              | Retrieve a specific team by ID.        |
| POST   | `/team`                   | Create a new team.                     |
| PUT    | `/team`                   | Update an existing team.               |
| GET    | `/team/:id/users`         | Retrieve all users in a specific team. |
| POST   | `/team/:id/users`         | Add a user to a team.                  |
| DELETE | `/team/:id/users/:userId` | Remove a user from a team.             |

### Projects

| Method | Endpoint                     | Description                                   |
| ------ | ---------------------------- | --------------------------------------------- |
| GET    | `/projects`                  | Retrieve all projects.                        |
| GET    | `/projects/:id`              | Retrieve a specific project by ID.            |
| POST   | `/project`                   | Create a new project.                         |
| PUT    | `/project`                   | Update an existing project.                   |
| GET    | `/project/:id/teams`         | Retrieve all teams associated with a project. |
| POST   | `/project/:id/teams`         | Add a team to a project.                      |
| DELETE | `/project/:id/teams/:teamId` | Remove a team from a project.                 |

## Future Improvements

- Implement role-based access control (RBAC) for better security.
- Add more comprehensive unit and integration tests.
- Enhance Swagger documentation with examples for all endpoints.
- Add support for file uploads (e.g., task attachments).
- Implement real-time notifications using WebSockets.

## License

This project is [MIT licensed](LICENSE).
