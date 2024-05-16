# Task

A task tracker application built with NestJS.
 
## Table of Contents 

- [Installation](#installation) 
- [Usage](#usage) 
- [Testing](#testing) 
- [Contributing](#contributing) 
- [License](#license) 

## Installation 

Follow these steps to get started: 

1. **Clone the Repository**
   - Execute `git clone [repository-url]` to clone the repository to your local machine.

2. **Install Dependencies**
   - Run `yarn install` to install the required dependencies.

3. **Environment Setup**
   - Create a `.env` file in the root directory.
   - Provide necessary database values in the `.env` file. Refer to `.env-example` for guidance.
4. **Database Configuration**
   - Set up a local database or utilize a cloud service like [ElephantSQL](https://www.elephantsql.com/).

5. **Database Migration**
   - Execute `yarn migration:run` to run database migrations.
   - For new table (Entity) use this command `npm run migration:generate -- src/database/migrations/createTasksTable` to generate its new migration.

6. **Start the Application**
   - Use `yarn start:dev` to run the application in development mode.

## Usage

Once the application is running, you can utilize the following API endpoints to manage tasks:

### User Endpoints
- **User Signup:** `.Endpoint to register a new user.`
- **User Login:** `.Endpoint to authenticate a user.`

### Task Endpoints
- **Create Task:** `.Endpoint to add a new task.`
- **Get All Tasks:** `.Endpoint to retrieve all tasks.`
- **Get Task:** `.Endpoint to retrieve a specific task by ID.`
- **Update Task:** `.Endpoint to update a task.`
- **Delete Task:** `.Endpoint to delete a task.`

## Testing

To explore the available API endpoints and run tests, visit the Swagger UI at `http://localhost:<APP_PORT>/docs#/`. Replace `<APP_PORT>` with the port number specified in your `.env` file.







