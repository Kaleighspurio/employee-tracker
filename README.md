# employee-tracker

![badge](https://img.shields.io/github/repo-size/Kaleighspurio/employee-tracker)

## Description
This application is a node.js CLI that allows the user to get, update, post, and delete certain information in a mySQL database of employees.  The user can perform various functions in the command line through the use of the inquirer npm package including:
* Viewing all information for all employees
* Viewing all employees by department
* Adding a new employee
* Removing an employee
* Updating an employee's role
* Adding a new department
* Adding a new role
* Viewing all departments
* Viewing all roles

Selecting each of these options will prompt the user for any additional information that is needed and then will update or change data in the database accordingly.

## Technologies
This is a Node Javascript application.
The following npm packages are also used:
* inquirer
* dotenv
* mySQL
* Console.table

## Installation
After pulling from the repository, you'll need to install the packages listed above by running `npm install` in your terminal.  You'll also need to copy the data from the schema.sql and seed.sql files and enter them into your MySQL Workbench.
After that, the application can be run with `node index.js`

## Demonstration
Click [here ](https://youtu.be/gy_eqePllCc) to see a video of the app in action!
