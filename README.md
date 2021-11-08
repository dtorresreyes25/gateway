# Gateway management

## About Project

This is a simple web application for storing information about gateways and their associated devices.

#### Features:

- User Registration.
- Login.
- Profile.
- Add/Edit/remove gateways and devices.

## Stack

This is a Full-Stack project and was written by using the following technologies: 

 1. MongoDB
 2. Express
 3. Angular
 4. NodeJS
 5. JWT
 6. Docker

## Running the Project

Install latest Docker

#### Development mode:
  You can start the application in dev mode (database, api and frontend) using docker-compose:

  ```
    git clone https://github.com/dtorresreyes25/gateway.git
  
    cd gateway
  
    docker-compose -f 'docker-compose.dev.yml' up
  ```

  It will run frontend `http://localhost:4200` and api on `http://localhost:3000`.
    
#### Production mode:

  ```
    git clone https://github.com/dtorresreyes25/gateway.git
    
    cd gateway
    
    docker-compose -f 'docker-compose.yml' up
  ```

  It will run frontend and api on `http://localhost:3000`.

