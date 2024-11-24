
# Task manager API

API for managing tasks for RUD operations and adding comments through an authenticated user.

## Pre-requisite

- .env File - below is and example to keep environment file under root folder
```
    PORT=3000
    USER_PASS=password
    SERVER_TOKEN=thisisservertoken
```
- Installing packages and Running server - run the command in root folder

```
    npm install
    npm run start
```
- For testing the API - postman collection and environment files has been exported in folder **postman**. 

- Import v2.1 both the files in postman application and set the environment to the imported collection and run the following tests:

    1. Using the login route to generate accesstoken
    2. You can run CRUD operation until token expires.
    3. To regenerate token user ```/api/login``` route
    4. To logout use ```/api/logout``` path

## Screenshots

![image](https://github.com/user-attachments/assets/57bc983e-381c-4983-8ddd-fb1e651a6beb)

![image](https://github.com/user-attachments/assets/d43e2979-9d66-4863-bfb2-997994377991)

