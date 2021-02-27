const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");

const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const validator = require("email-validator");
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
        name: "email",
        validate(value) {
            if (validator.validate(value)) {
             return true;
            }
            return 'That was not a valid email address! Please try again.';
        }
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
        name: "github",
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
                        
                        if(tempEmployees[i].role == "Manager")
                        {
                            const newEmp = new Manager(tempEmployees[i].name, tempEmployees[i].theID, tempEmployees[i].email, tempEmployees[i].officeNumber) 
                            employees.push(newEmp)                       
                        }
                        else if (tempEmployees[i].role == "Engineer")
                        {
                            const newEmp = new Engineer(tempEmployees[i].name, tempEmployees[i].theID, tempEmployees[i].email, tempEmployees[i].github) 
                            employees.push(newEmp)
                        }
                        else if (tempEmployees[i].role == "Intern")
                        {
                            const newEmp = new Intern(tempEmployees[i].name, tempEmployees[i].theID, tempEmployees[i].email, tempEmployees[i].school) 
                            employees.push(newEmp)
                        }


                    }
                    const newRender = render(employees);
                    writeHTML(outputPath, newRender)
                 
                }
            })
    })
}

init();

function writeHTML(fileName, data) {
    fs.writeFile(fileName, data, (err) => {
    err ? console.log(err) : console.log("The File was written successfully, your team is ready to view!");
    });
}
