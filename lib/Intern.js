const Employee = require("./Employee");

class Intern extends Employee{
    
    constructor(name, id, email, school)
    {
      
        
        super(id, email, name)
        
        this.school = school
    }

    getSchool()
    {
      return this.school
    } 

    getRole()
    {
      return "Intern"
    } 
}

module.exports = Intern;