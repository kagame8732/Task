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
- **User Signup:** `POST /user/signup :Create a new user`
- **User Login:** `POST /user/login :login with existing user`

### Task Endpoints
- **Create a task:** `POST /tasks/create :Create a new task`
- **Get All tasks:** `GET /tasks/get-all :Retrieve all tasks`
- **Get a single task:** `GET /tasks/get-one/{task-id} :Retrieve a single task`
- **Update a task:** `PUT /tasks/update/{task-id} :Update a single task`
- **Delete task:** `DELETE /tasks/delete/{task-id} :Delete a single task`

## Testing

To explore the available API endpoints and run tests, visit the Swagger UI at `http://localhost:<PORT>/docs#/`. Replace `<PORT>` with the port number specified in your `.env` file.







