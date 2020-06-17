USE employees_db;

INSERT INTO deparment (name)
VALUES ("Human Resources"), ("Accounting"), ("Sales"), ("Marketing"), ("Research"), ("Management"), ("Engineering");

INSERT INTO role (title, salary, department_id)
VALUES ("Team Manager" , 100000, 6), ("Hiring Director", 80000, 1),("HR representative", 75000, 1) , ("Accountant", 80000, 2), ("Sales Lead", 100000, 3), ("Salesperson", 80000, 3), ("Marketing Director", 110000, 4), ("Marketing Consultant", 90000, 4), ("Research Lead", 100000, 5), ("Researcher", 80000, 5), ("Lead Engineer", 120000, 6), ("Engineer", 100000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kaleigh", "Spurio", 12, null), ("Karen", "Astell", 10, null), ("Sponge", "Bob", 1, null), ("Patrick", "Star", 2, null);