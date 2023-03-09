import fs from "fs";
import inquirer from "inquirer";
import queryDB from "./queryDB.js";
import { v4 as uuidv4 } from "uuid";

export default async function addBook(library) {
  try {
    // CLI prompt for user input
    const answers = await inquirer.prompt([
      {
        name: "bookName",
        message: "Name of book:",
        type: "input",
      },
      {
        name: "author",
        message: "Author name:",
        type: "input",
      },
      {
        name: "numOfPages",
        message: "Number of pages:",
        type: "input",
      },
    ]);

    // store the answers in an object
    const book = {
      id: uuidv4(),
      bookName: answers.bookName,
      author: answers.author,
      numOfPages: answers.numOfPages,
    };

    // push the object to the array
    library.push(book);

    console.log(library);

    // if the file exists, call the createBook method
    if (fs.existsSync("library-db.json")) {
      createBook(library);
    } else {
      // if the file doesn't exist, create the file
      fs.appendFile("library-db.json", "[]", (err) => {
        if (err) {
          console.log("Failed to create library-db.json");
          return;
        }
        // call the createBook method
        createBook(library);
      });
    }
  } catch (err) {
    console.log("something went wrong", err);
  }
}

async function createBook(library) {
  // write the library data to the file
  await fs.writeFile("library-db.json", JSON.stringify(library), (err) => {
    if (err) {
      console.log("Error writing data to file", err);
    }
    console.log("Saved!");
  });
}

queryDB(addBook);
