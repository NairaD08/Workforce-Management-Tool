const db = require("./db");
const inquirer = require("inquirer");
(async () => {
  const client = await db.connect();
  async function main() {
    // this.query();

    const { action } = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
          "Add Department",
          "Add Role",
          "Add Employee",
          "View Department",
          "View Role",
          "View Employee",
          "View Employee Information",
          "Exit",
        ],
      },
    ]);
    console.log(action);
    switch (action) {
      case "View Department":
        viewDepartment();
        break;
      case "View Role":
        viewRole();
        break;
      case "View Employee":
        viewEmployee();
        break;
      case "Add Department":
        addDepartment();
        break;
      case "Add Role":
        addRole();
        break;
      case "Add Employee":
        addEmployee();
        break;
      case "View Employee Information":
        viewEmployeeInformation();
        break;
      case "Exit":
        process.exit();
    }
  }
  main(); // Call main again to continue the process
  function viewDepartment() {
    const query = "SELECT * from Department";
    client.query(query, (err, data) => {
      if (err) return console.log(err);
      console.table(data.rows);
      main();
    });
  }
  async function addDepartment() {
    const { name } = await inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "Enter the department name:",
      },
    ]);

    const query = "INSERT INTO department (name) VALUES ($1)";
    client.query(query, [name], (err) => {
      if (err) return console.log(err);
      console.log("Department has been added");
      main();
    });
  }
  function viewRole() {
    const query = "SELECT * from Role";
    client.query(query, (err, data) => {
      if (err) return console.log(err);
      console.table(data.rows);
      main();
    });
  }
  async function addRole() {
    const { title, salary, departmentId } = await inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: "Enter the role title:",
      },
      {
        type: "input",
        name: "salary",
        message: "Enter the salary for this role:",
      },
      {
        type: "input",
        name: "departmentId",
        message: "Enter the department ID for this role:",
      },
    ]);

    const query =
      "INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) ";
    client.query(query, [title, salary, departmentId], (err) => {
      if (err) return console.log(err);
      console.log("Role has been added");
      main();
    });
  }
  function viewEmployee() {
    const query = "SELECT * from Employee";
    client.query(query, (err, data) => {
      if (err) return console.log(err);
      console.table(data.rows);
      main();
    });
  }

  async function addEmployee() {
    const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
      {
        type: "input",
        name: "firstName",
        message: "Enter the employee's first name:",
      },
      {
        type: "input",
        name: "lastName",
        message: "Enter the employee's last name:",
      },
      {
        type: "input",
        name: "roleId",
        message: "Enter the role ID for this employee:",
      },
      {
        type: "input",
        name: "managerId",
        message:
          "Enter the manager ID for this employee (leave blank if none):",
        default: null,
      },
    ]);

    const query =
      "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) ";
    client.query(
      query,
      [firstName, lastName, roleId, managerId || null],
      (err) => {
        if (err) return console.log(err);
        console.log("Employee has been added");
        main();
      }
    );
  }
  function viewEmployeeInformation() {
    const query =
      "SELECT * from Employee left join Role ON Employee.role_id=Role.id left join Department ON role.department_id=department.id";
    client.query(query, (err, data) => {
      if (err) return console.log(err);
      console.table(data.rows);
      main();
    });
  }
})();
