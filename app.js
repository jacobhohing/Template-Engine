const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");

const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { inherits } = require("util");

employees = [];
tempEmployees = [];

const questions = [
    {
        type: "list",
        message: "What is your role?",
        choices: ["Manager", "Engineer", "Intern"],
        name: "role"
    },
    {          
        type: "input",
        message: "What is your name?",
        name: "name",
    },
    {          
        type: "input",
        message: "What is your unique ID?",
        name: "theID",
    },
    {
        type: "input",
        message: "What is your email?",
        name: "email"
    },   
    {
        type: "input",
        message: "What is your Office Number?",
        name: "officeNumber",
        when : (answers) => {
            if (answers.role === "Manager") {
                return true;
            }
        }
    },
    {
        type: "input",
        message: "What is your Github account?",
        name: "githun",
        when : (answers) => {
            if (answers.role === "Engineer") {
                return true;
            }
        }
    },
    {
        type: "input",
        message: "What school do you attend?",
        name: "school",
        when : (answers) => {
            if (answers.role === "Intern") {
                return true;
            }
        }
    }
]

const additional = {
    type: "list",
    message: "Would you like to add additional employees?",
    choices: ["Yes", "No"],
    name: "add" 
}

function init()
{
    inquirer.prompt(questions).then((response) => {
        tempEmployees.push(response)
            inquirer.prompt(additional).then((continueQ) => {
                if (continueQ.add == "Yes")
                {
                    init();
                }
                else
                {
                    for(i = 0; i < tempEmployees.length; i++){
                        
                        if(tempEmployees[i].role = "Manager")
                        {
                            const newEmp = new Manager(tempEmployees[i].name, tempEmployees[i].theID, tempEmployees[i].email, tempEmployees[i].officeNumber) 
                            employees.push(newEmp)                       
                        }
                        else if (tempEmployees[i].role = "Engineer")
                        {
                            const newEmp = new Engineer(tempEmployees[i].name, tempEmployees[i].theID, tempEmployees[i].email, tempEmployees[i].github) 
                            employees.push(newEmp)
                        }
                        else if (tempEmployees[i].role = "Intern")
                        {
                            const newEmp = new Manager(tempEmployees[i].name, tempEmployees[i].theID, tempEmployees[i].email, tempEmployees[i].school) 
                            employees.push(newEmp)
                        }

                       
                        
                        

                    }

                    const newRender = render(employees);
                    console.log(newRender)
                 
                }
            })
    })
}

init();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
