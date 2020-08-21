const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      message: "What is your user GitHub username?",
      name: "username"
    },
    {
      type: "input",
      message: "What is your email?",
      name: "email"
    },
    {
      type: "input",
      message: "What is the title of your project?",
      name: "title"
    },
    {
      type: "input",
      message: "Please provide a description of your project.",
      name: "description"
    },
    {
      type: "input",
      message: "What packages need to be installed to run your project.",
      name: "installation"
    },
    {
      type: "input",
      message: "What technologies were used to create your project.",
      name: "technology"
    },
    {
      type: "input",
      message: "Please provide an example of how your project can be used.",
      name: "usage"
    },
    {
      type: "list",
      name: "license",
      message: "What kind of license would you like to have?",
      name: "license",
      choices: ["MIT", "APACHE 2.0", "GPL v3", "BSD 3", "None"]
    },
    {
      type: "input",
      message: "Including yourself, please list out all contributors",
      name: "contributer"
    },
    {
      type: "input",
      message: "What command is used to run a test",
      name: "tests",
    }
  ]);
}

function generateMD(answers) {

  const avatar = `https://github.com/${answers.username}.png?size=50`;
  const gitHub = `https://img.shields.io/badge/Github-${answers.username}-4cbbb9`;

  return `
  # ${answers.title} 
  
  ## Description
    ${answers.description}

  ## Table of Contents
  - [Installation](#installation)
  - [Usage](#usage)
  - [License](#license)
  - [Tests](#tests)
  - [Contributors](#contributors)
  - [Details](#details)

  ## Installation
  Packages required to run this program are: ${answers.installation}
  
  ## Usage
  Examples of how to use this program: ${answers.usage}

  ## License
  ${answers.license}

  ## Tests
  To test, run the following command: ${answers.tests}

  ## Contributors
  ${answers.contributer}

  ## Contact
  \n![Badge](${gitHub}) 
  \n![Profile Image](${avatar})
  \nhttps://github.com/${answers.username}
  \nIf you have any questions, contact the author directly at ${answers.email}.
 `;
}

promptUser()
  .then(function(answers) {
    const text = generateMD(answers);

    return writeFileAsync("README.md", text);
  })
  .then(function() {
    console.log("Successfully wrote to README.md");
  })
  .catch(function(err) {
    console.log(err);
  });
