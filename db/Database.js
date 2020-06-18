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
    //   Make multiple queries at once so we can get a list of departments and a list of employees to fill into two of the inquirer questions.
    this.connection.query(
      "SELECT department.department, department.id FROM department; SELECT id, first_name, last_name, manager_id FROM employee;",
      (err, results) => {
        const departmentArray = [];
        // Using the results from the first query, push each department into the departmentArray
        results[0].forEach((item) => {
          departmentArray.push(item.department);
        });
        const employeeNames = ["None"];
        // Using the results from the second query, push each employee name (first and last) into the employeeNames array
        results[1].forEach((item) => {
          const name = `${item.first_name} ${item.last_name}`;
          employeeNames.push(name);
        });
        inquirer
          .prompt([
            {
              type: "input",
              name: "firstName",
              message: "What is the employee's first name?",
            },
            {
              type: "input",
              name: "lastName",
              message: "What is the employee's last name?",
            },
            {
              type: "list",
              name: "department",
              message: "What department is the employee in?",
              choices: departmentArray,
            },
            {
              type: "list",
              name: "manager",
              message: "Who is their manager?",
              choices: employeeNames,
            },
          ])
          .then((answers) => {
            // console.log(results[1], 'this should show the manager id...');
            const managerName = answers.manager.split(" ");
            // console.log(managerName, "this should be the manager name?");
            let newManagerID;
            results[1].forEach((employee) => {
                if (answers.manager === "None") {
                    newManagerID = null;
                } else if (employee.first_name === managerName[0] && employee.last_name === managerName[1]) {
                    newManagerID = employee.id
                }
            });
            console.log(`We have a match! ${newManagerID}`)
            results[0].forEach((object) => {
                if (answers.department === object.department) {
                    const department = answers.department;
                    this.connection.query('SELECT id FROM department WHERE department=?;', [department], (err, result) => {
                        if (err) throw err;
                        console.log(result);
                        const department = result[0].id
                        console.log(department);
                        this.connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [answers.firstName, answers.lastName, department, newManagerID])
                    });
                }
            });
            //   this.connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ? ,?)', [answers.firstName, answers.lastName, ])
          });
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

  removeEmployee() {
    //   connect to database to retrieve a list of employees
      this.connection.query('SELECT first_name, last_name FROM employee', (err, result) => {
          const namesArray = [];
        //   Use a forEach to concat the first name to the last name for each employee
          result.forEach((name) => {
              const fullName = `${name.first_name} ${name.last_name}`;
              namesArray.push(fullName);
          });
        //   ask the user who they would like to remove
          inquirer.prompt(
            {
                type: "list",
                name: "employee",
                message: "Which employee would you like to remove?",
                choices: namesArray
            }
            ).then((answer) => {
                // take the answer and split the string into two strings: one with the first name and one with the last name
               const splitNames = answer.employee.split(" ");
                // make a delete statement to the database to delete the employee whose firstname and last name matches the one the user selected.
                this.connection.query('DELETE FROM employee WHERE first_name=? AND last_name=?', [splitNames[0], splitNames[1]], (err) => {
                    if (err) throw err;
                });
            });
      })
  }

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
