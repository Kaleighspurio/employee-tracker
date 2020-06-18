const connection = require("./connection");
const inquirer = require("inquirer");

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
    inquirer.prompt(
        {
            type: "input",
            name: "newDepartment",
            message: "What is the new department?"
        }
    ).then((answer) => {
        this.connection.query('INSERT INTO department (department) VALUES (?)', [answer.newDepartment], (err) => {
            if (err) throw err;
            this.viewDepartments();
            console.log("Here is the updated department list");
        });
    });
  }

  createEmployee() {
    //   Make multiple queries at once so we can get a list of departments and a list of employees to fill into two of the inquirer questions and then can utilize this info when we INSERT INTO employee later.
    this.connection.query(
      `SELECT department.department, department.id FROM department;
      SELECT id, first_name, last_name, manager_id FROM employee;
      SELECT id, title, department_id from role;`,
      (err, results) => {
        const roleArray = [];
        // Using the results from the first query, push each department into the departmentArray
        results[2].forEach((item) => {
          roleArray.push(item.title);
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
              name: "role",
              message: "What is the employee's role?",
              choices: roleArray,
            },
            {
              type: "list",
              name: "manager",
              message: "Who is their manager?",
              choices: employeeNames,
            },
          ])
          .then((answers) => {
            //   take the name that the user selected in the manager questions and split it into two separate strings for first name and last name.
            const managerName = answers.manager.split(" ");
            let newManagerID;
            // Compare what the user answered in the prompt for the manager question with each employee in the database.  If the user selected "None" for manager, then the managerID is set to null.  Otherwise, the managerID becomes the employee id of whichever employee matches the first and last name that was selected.
            results[1].forEach((employee) => {
              if (answers.manager === "None") {
                newManagerID = null;
              } else if (
                employee.first_name === managerName[0] &&
                employee.last_name === managerName[1]
              ) {
                newManagerID = employee.id;
              }
            });
            let role;
            // Compare the users answer to the role question with the role titles from the database, then set the role id using the query made at the start of this function.
            results[2].forEach((item) => {
              if (answers.role === item.title) {
                role = item.id;
                // Add the new employee and pass in the first and last names that were provided by the user
                this.connection.query(
                  "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
                  [answers.firstName, answers.lastName, role, newManagerID],
                  (err) => {
                    if (err) throw err;
                    console.log(
                      `The new employee, ${answers.firstName} ${answers.lastName}, has been added as a/an ${item.title}`
                    );
                    this.viewEmployees();
                    console.log('Here is the updated Employee table');
                  }
                );
              }
            });
          });
      }
    );
  }

  createRole() {
    this.connection
      .query
      // write the query here...
      ();
  }

  removeEmployee() {
    //   connect to database to retrieve a list of employees
    this.connection.query(
      "SELECT first_name, last_name FROM employee",
      (err, result) => {
        const namesArray = [];
        //   Use a forEach to concat the first name to the last name for each employee
        result.forEach((name) => {
          const fullName = `${name.first_name} ${name.last_name}`;
          namesArray.push(fullName);
        });
        //   ask the user who they would like to remove
        inquirer
          .prompt({
            type: "list",
            name: "employee",
            message: "Which employee would you like to remove?",
            choices: namesArray,
          })
          .then((answer) => {
            // take the answer and split the string into two strings: one with the first name and one with the last name
            const splitNames = answer.employee.split(" ");
            // make a delete statement to the database to delete the employee whose firstname and last name matches the one the user selected.
            this.connection.query(
              "DELETE FROM employee WHERE first_name=? AND last_name=?",
              [splitNames[0], splitNames[1]],
              (err) => {
                if (err) throw err;
              }
            );
          });
      }
    );
  }

  // findEmployeesByManager(){
  //     this.connection.query('SELECT employee.id, employee.first_name, employee.last_name, role.salary, department.department, role.title, employee.manager_id FROM employee LEFT JOIN role ON (employee.role_id=role.id) LEFT JOIN department ON (role.department_id=department.id);', (err, results) => {
  //         if (err) {
  //             throw err;
  //         }
  //     console.table(results);
  //     inquirer.prompt({}).then();

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
  }

  updateEmployeeRole() {
    //   make queries to the role and employee tables so that the choices for the prompt questions can be provided
      this.connection.query(`SELECT * FROM role; SELECT * FROM employee;`, (err, results) => {
          console.log(results);
          const nameArray = ["Nevermind, I don't want to make an update"]
        //   for each employee in the employee table, string together the first and last names and push them to the nameArray
          results[1].forEach((employee) => {
            const name = `${employee.first_name} ${employee.last_name}`;
            nameArray.push(name);
          });
        //   for each role in the role table, push the title to the roleArray.
          const roleArray = [];
          results[0].forEach((role) => {
            roleArray.push(role.title);
          });
          
          inquirer.prompt([
              {
                  type: 'list',
                  name: "employee",
                  message: "Which employee would you like to update?",
                  choices: nameArray
              },
              {
                  type: "list",
                  name: "newRole",
                  message: "What is their new role?",
                  choices: roleArray
              }
          ]).then((answers) => {
              console.log(answers);
            //   match the role the user provided in the inquirer answer to the role in the database and set the id to the roleID variable to be passed into the UPDATE
              const matchingRole = results[0].find(element => element.title === answers.newRole);
              const roleID = matchingRole.id
            //   Split the employee name from the answer into 2 separate strings for first and last name
              const employeeName = answers.employee.split(" ");
            //   find where the prompt answer names match the names in the database and set the id to the new variable employeeID which will be passed into the UPDATE statement
              const matchingEmployeeObject = results[1].find(element => element.first_name === employeeName[0] && element.last_name === employeeName[1]);
              const employeeID = matchingEmployeeObject.id;
              this.connection.query('UPDATE employee SET role_id=? WHERE id=?', [roleID, employeeID], (err) => {
                  if (err) throw err;
              });
          });
      });
  }

  viewDepartments() {
    this.connection.query('SELECT * FROM department', (err, result) => {
        if (err) throw err;
        console.table(result);
    });
  }

  viewRoles() {
      this.connection.query('SELECT id, title, salary FROM role', (err, result) => {
          if (err) throw err;
          console.table(result);
      });
  }

  updateEmployeeManager() {}

  quit() {
    this.connection.end();
  }
}

module.exports = Database;
