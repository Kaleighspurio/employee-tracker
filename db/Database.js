const connection = require("./connection");
const inquirer = require("inquirer");
// const array = [];

class Database {
  constructor() {
    this.connection = connection;
  }

  viewEmployees() {
    this.connection.query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.salary, department.department, role.title, employee.manager_id FROM employee LEFT JOIN role ON (employee.role_id=role.id) LEFT JOIN department ON (role.department_id=department.id);",
      (err, results) => {
        if (err) {
          throw err;
        }
        console.table(results);
      }
    );
  }

  createDepartment() {
    this.connection.query(
      // write the query here...
      "SELECT"
    );
  }

  createEmployee() {
    this.connection.query(
      "SELECT department.department FROM department; SELECT first_name, last_name FROM employee;",
      (err, result) => {
        const departmentArray = [];
        result[0].forEach((item) => {
          departmentArray.push(item.department);
        });
        console.log(result[1]);
        const employeeNames = [];
        result[1].forEach((item) => {
           const name = `${item.first_name} ${item.last_name}`;
           employeeNames.push(name)
        });
        console.log(employeeNames);
        inquirer.prompt([
            {
                type: "input",
                name: "firstName",
                message: "What is the employee's first name?"
            },
            {
                type: "input",
                name: "lastName",
                message: "What is the employee's last name?"
            },
            {
                type: "list",
                name: "department",
                message: "What department is the employee in?",
                choices: departmentArray
            },
            {
                type: "list",
                name: "manager",
                message: "Who is their manager?",
                choices: employeeNames
            }
        ]).then();
      }
    );

    // this.connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ()';
  }

  createRole() {
    this.connection
      .query
      // write the query here...
      ();
  }

  removeEmployee() {}

  // findEmployeesByManager(){
  //     this.connection.query('SELECT employee.id, employee.first_name, employee.last_name, role.salary, department.department, role.title, employee.manager_id FROM employee LEFT JOIN role ON (employee.role_id=role.id) LEFT JOIN department ON (role.department_id=department.id);', (err, results) => {
  //         if (err) {
  //             throw err;
  //         }
  //     console.table(results);
  //     inquirer.prompt({}).then();

  //     this.connection.query(
  //         // write the query here...
  //     );
  //     });

  // }

  findDepartment() {
    this.connection.query(
      "SELECT department FROM department",
      (err, result) => {
        if (err) {
          throw err;
        }
        const departmentArray = [];
        result.forEach((department) => {
          departmentArray.push(department.department);
        });
        inquirer
          .prompt({
            type: "list",
            name: "department",
            message: "Which department would you like to view?",
            choices: departmentArray,
          })
          .then((answer) => {
            console.log(answer.department);
            this.findEmployeeByDepartment(answer.department);
          });
      }
    );
  }

  findEmployeeByDepartment(department) {
    console.log(department);
    this.connection.query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.salary, department.department, role.title, employee.manager_id FROM employee LEFT JOIN role ON (employee.role_id=role.id) LEFT JOIN department ON (role.department_id=department.id) WHERE department.department=?;",
      [department],
      (err, results) => {
        if (err) {
          throw err;
        }
        console.table(results);
      }
    );
    // this.connection.query('SELECT * FROM department WHERE department=? RIGHT JOIN role (department.id=role.department_id) RIGHT JOIN employee (role.id=employee.role_id)', [department], (err, result) => {
    //     console.table(result)
    // });
    // this.connection.query('SELECT department FROM department', (err, result) => {
    //     if (err){
    //         throw err;
    //     }
    //     const departmentArray = [];
    //     result.forEach((department) => {
    //         departmentArray.push(department.department);
    //     })
    //     inquirer.prompt({
    //         type: "list",
    //         name: "department",
    //         message: "Which department would you like to view?",
    //         choices: departmentArray
    //     }).then();
    // });
  }

  updateEmployeeRole() {}

  updateEmployeeManager() {}

  quit() {
    this.connection.end();
  }
}

module.exports = Database;
